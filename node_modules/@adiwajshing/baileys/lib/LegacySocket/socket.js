"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSocket = void 0;
const boom_1 = require("@hapi/boom");
const http_1 = require("http");
const util_1 = require("util");
const ws_1 = __importDefault(require("ws"));
const Defaults_1 = require("../Defaults");
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const WABinary_1 = require("../WABinary");
/**
 * Connects to WA servers and performs:
 * - simple queries (no retry mechanism, wait for connection establishment)
 * - listen to messages and emit events
 * - query phone connection
 */
const makeSocket = ({ waWebSocketUrl, connectTimeoutMs, phoneResponseTimeMs, logger, agent, keepAliveIntervalMs, expectResponseTimeout, }) => {
    // for generating tags
    const referenceDateSeconds = (0, Utils_1.unixTimestampSeconds)(new Date());
    const ws = new ws_1.default(waWebSocketUrl, undefined, {
        origin: Defaults_1.DEFAULT_ORIGIN,
        timeout: connectTimeoutMs,
        agent,
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Host': 'web.whatsapp.com',
            'Pragma': 'no-cache',
            'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
        }
    });
    ws.setMaxListeners(0);
    let lastDateRecv;
    let epoch = 0;
    let authInfo;
    let keepAliveReq;
    let phoneCheckInterval;
    let phoneCheckListeners = 0;
    const phoneConnectionChanged = (value) => {
        ws.emit('phone-connection', { value });
    };
    const sendPromise = (0, util_1.promisify)(ws.send);
    /** generate message tag and increment epoch */
    const generateMessageTag = (longTag = false) => {
        const tag = `${longTag ? referenceDateSeconds : (referenceDateSeconds % 1000)}.--${epoch}`;
        epoch += 1; // increment message count, it makes the 'epoch' field when sending binary messages
        return tag;
    };
    const sendRawMessage = (data) => {
        if (ws.readyState !== ws.OPEN) {
            throw new boom_1.Boom('Connection Closed', { statusCode: Types_1.DisconnectReason.connectionClosed });
        }
        return sendPromise.call(ws, data);
    };
    /**
     * Send a message to the WA servers
     * @returns the tag attached in the message
     * */
    const sendNode = async ({ json, binaryTag, tag, longTag }) => {
        tag = tag || generateMessageTag(longTag);
        let data;
        if (logger.level === 'trace') {
            logger.trace({ tag, fromMe: true, json, binaryTag }, 'communication');
        }
        if (binaryTag) {
            if (Array.isArray(json)) {
                throw new boom_1.Boom('Expected BinaryNode with binary code', { statusCode: 400 });
            }
            if (!authInfo) {
                throw new boom_1.Boom('No encryption/mac keys to encrypt node with', { statusCode: 400 });
            }
            const binary = (0, WABinary_1.encodeBinaryNodeLegacy)(json); // encode the JSON to the WhatsApp binary format
            const buff = (0, Utils_1.aesEncrypt)(binary, authInfo.encKey); // encrypt it using AES and our encKey
            const sign = (0, Utils_1.hmacSign)(buff, authInfo.macKey); // sign the message using HMAC and our macKey
            data = Buffer.concat([
                Buffer.from(tag + ','),
                Buffer.from(binaryTag),
                sign,
                buff, // the actual encrypted buffer
            ]);
        }
        else {
            data = `${tag},${JSON.stringify(json)}`;
        }
        await sendRawMessage(data);
        return tag;
    };
    const end = (error) => {
        logger.info({ error }, 'connection closed');
        ws.removeAllListeners('close');
        ws.removeAllListeners('error');
        ws.removeAllListeners('open');
        ws.removeAllListeners('message');
        phoneCheckListeners = 0;
        clearInterval(keepAliveReq);
        clearPhoneCheckInterval();
        if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING) {
            try {
                ws.close();
            }
            catch (_a) { }
        }
        ws.emit('ws-close', error);
        ws.removeAllListeners('ws-close');
    };
    const onMessageRecieved = (message) => {
        var _a, _b, _c;
        if (message[0] === '!' || message[0] === '!'.charCodeAt(0)) {
            // when the first character in the message is an '!', the server is sending a pong frame
            const timestamp = message.slice(1, message.length).toString();
            lastDateRecv = new Date(parseInt(timestamp));
            ws.emit('received-pong');
        }
        else {
            let messageTag;
            let json;
            try {
                const dec = (0, Utils_1.decodeWAMessage)(message, authInfo);
                messageTag = dec[0];
                json = dec[1];
                if (!json) {
                    return;
                }
            }
            catch (error) {
                end(error);
                return;
            }
            //if (this.shouldLogMessages) this.messageLog.push ({ tag: messageTag, json: JSON.stringify(json), fromMe: false })
            if (logger.level === 'trace') {
                logger.trace({ tag: messageTag, fromMe: false, json }, 'communication');
            }
            let anyTriggered = false;
            /* Check if this is a response to a message we sent */
            anyTriggered = ws.emit(`${Defaults_1.DEF_TAG_PREFIX}${messageTag}`, json);
            /* Check if this is a response to a message we are expecting */
            const l0 = json.tag || json[0] || '';
            const l1 = (json === null || json === void 0 ? void 0 : json.attrs) || (json === null || json === void 0 ? void 0 : json[1]) || {};
            const l2 = ((_b = (_a = json === null || json === void 0 ? void 0 : json.content) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.tag) || ((_c = json[2]) === null || _c === void 0 ? void 0 : _c[0]) || '';
            Object.keys(l1).forEach(key => {
                anyTriggered = ws.emit(`${Defaults_1.DEF_CALLBACK_PREFIX}${l0},${key}:${l1[key]},${l2}`, json) || anyTriggered;
                anyTriggered = ws.emit(`${Defaults_1.DEF_CALLBACK_PREFIX}${l0},${key}:${l1[key]}`, json) || anyTriggered;
                anyTriggered = ws.emit(`${Defaults_1.DEF_CALLBACK_PREFIX}${l0},${key}`, json) || anyTriggered;
            });
            anyTriggered = ws.emit(`${Defaults_1.DEF_CALLBACK_PREFIX}${l0},,${l2}`, json) || anyTriggered;
            anyTriggered = ws.emit(`${Defaults_1.DEF_CALLBACK_PREFIX}${l0}`, json) || anyTriggered;
            if (!anyTriggered && logger.level === 'debug') {
                logger.debug({ unhandled: true, tag: messageTag, fromMe: false, json }, 'communication recv');
            }
        }
    };
    /** Exits a query if the phone connection is active and no response is still found */
    const exitQueryIfResponseNotExpected = (tag, cancel) => {
        let timeout;
        const listener = ([, connected]) => {
            if (connected) {
                timeout = setTimeout(() => {
                    logger.info({ tag }, 'cancelling wait for message as a response is no longer expected from the phone');
                    cancel(new boom_1.Boom('Not expecting a response', { statusCode: 422 }));
                }, expectResponseTimeout);
                ws.off(Defaults_1.PHONE_CONNECTION_CB, listener);
            }
        };
        ws.on(Defaults_1.PHONE_CONNECTION_CB, listener);
        return () => {
            ws.off(Defaults_1.PHONE_CONNECTION_CB, listener);
            timeout && clearTimeout(timeout);
        };
    };
    /** interval is started when a query takes too long to respond */
    const startPhoneCheckInterval = () => {
        phoneCheckListeners += 1;
        if (!phoneCheckInterval) {
            // if its been a long time and we haven't heard back from WA, send a ping
            phoneCheckInterval = setInterval(() => {
                if (phoneCheckListeners <= 0) {
                    logger.warn('phone check called without listeners');
                    return;
                }
                logger.info('checking phone connection...');
                sendAdminTest();
                phoneConnectionChanged(false);
            }, phoneResponseTimeMs);
        }
    };
    const clearPhoneCheckInterval = () => {
        phoneCheckListeners -= 1;
        if (phoneCheckListeners <= 0) {
            clearInterval(phoneCheckInterval);
            phoneCheckInterval = undefined;
            phoneCheckListeners = 0;
        }
    };
    /** checks for phone connection */
    const sendAdminTest = () => sendNode({ json: ['admin', 'test'] });
    /**
     * Wait for a message with a certain tag to be received
     * @param tag the message tag to await
     * @param json query that was sent
     * @param timeoutMs timeout after which the promise will reject
     */
    const waitForMessage = (tag, requiresPhoneConnection, timeoutMs) => {
        if (ws.readyState !== ws.OPEN) {
            throw new boom_1.Boom('Connection not open', { statusCode: Types_1.DisconnectReason.connectionClosed });
        }
        let cancelToken = () => { };
        return {
            promise: (async () => {
                let onRecv;
                let onErr;
                let cancelPhoneChecker;
                try {
                    const result = await (0, Utils_1.promiseTimeout)(timeoutMs, (resolve, reject) => {
                        onRecv = resolve;
                        onErr = err => {
                            reject(err || new boom_1.Boom('Intentional Close', { statusCode: Types_1.DisconnectReason.connectionClosed }));
                        };
                        cancelToken = () => onErr(new boom_1.Boom('Cancelled', { statusCode: 500 }));
                        if (requiresPhoneConnection) {
                            startPhoneCheckInterval();
                            cancelPhoneChecker = exitQueryIfResponseNotExpected(tag, onErr);
                        }
                        ws.on(`TAG:${tag}`, onRecv);
                        ws.on('ws-close', onErr); // if the socket closes, you'll never receive the message
                    });
                    return result;
                }
                finally {
                    requiresPhoneConnection && clearPhoneCheckInterval();
                    cancelPhoneChecker && cancelPhoneChecker();
                    ws.off(`TAG:${tag}`, onRecv);
                    ws.off('ws-close', onErr); // if the socket closes, you'll never receive the message
                }
            })(),
            cancelToken: () => {
                cancelToken();
            }
        };
    };
    /**
     * Query something from the WhatsApp servers
     * @param json the query itself
     * @param binaryTags the tags to attach if the query is supposed to be sent encoded in binary
     * @param timeoutMs timeout after which the query will be failed (set to null to disable a timeout)
     * @param tag the tag to attach to the message
     */
    const query = async ({ json, timeoutMs, expect200, tag, longTag, binaryTag, requiresPhoneConnection }) => {
        tag = tag || generateMessageTag(longTag);
        const { promise, cancelToken } = waitForMessage(tag, !!requiresPhoneConnection, timeoutMs);
        try {
            await sendNode({ json, tag, binaryTag });
        }
        catch (error) {
            cancelToken();
            // swallow error
            await promise.catch(() => { });
            // throw back the error
            throw error;
        }
        const response = await promise;
        const responseStatusCode = +(response.status ? response.status : 200); // default status
        // read here: http://getstatuscode.com/599
        if (responseStatusCode === 599) { // the connection has gone bad
            end(new boom_1.Boom('WA server overloaded', { statusCode: 599, data: { query: json, response } }));
        }
        if (expect200 && Math.floor(responseStatusCode / 100) !== 2) {
            const message = http_1.STATUS_CODES[responseStatusCode] || 'unknown';
            throw new boom_1.Boom(`Unexpected status in '${Array.isArray(json) ? json[0] : ((json === null || json === void 0 ? void 0 : json.tag) || 'query')}': ${message}(${responseStatusCode})`, { data: { query: json, response }, statusCode: response.status });
        }
        return response;
    };
    const startKeepAliveRequest = () => (keepAliveReq = setInterval(() => {
        if (!lastDateRecv) {
            lastDateRecv = new Date();
        }
        const diff = Date.now() - lastDateRecv.getTime();
        /*
            check if it's been a suspicious amount of time since the server responded with our last seen
            it could be that the network is down
        */
        if (diff > keepAliveIntervalMs + 5000) {
            end(new boom_1.Boom('Connection was lost', { statusCode: Types_1.DisconnectReason.connectionLost }));
        }
        else if (ws.readyState === ws.OPEN) {
            sendRawMessage('?,,'); // if its all good, send a keep alive request
        }
        else {
            logger.warn('keep alive called when WS not open');
        }
    }, keepAliveIntervalMs));
    const waitForSocketOpen = async () => {
        if (ws.readyState === ws.OPEN) {
            return;
        }
        if (ws.readyState === ws.CLOSED || ws.readyState === ws.CLOSING) {
            throw new boom_1.Boom('Connection Already Closed', { statusCode: Types_1.DisconnectReason.connectionClosed });
        }
        let onOpen;
        let onClose;
        await new Promise((resolve, reject) => {
            onOpen = () => resolve(undefined);
            onClose = reject;
            ws.on('open', onOpen);
            ws.on('close', onClose);
            ws.on('error', onClose);
        })
            .finally(() => {
            ws.off('open', onOpen);
            ws.off('close', onClose);
            ws.off('error', onClose);
        });
    };
    ws.on('message', onMessageRecieved);
    ws.on('open', () => {
        startKeepAliveRequest();
        logger.info('Opened WS connection to WhatsApp Web');
    });
    ws.on('error', end);
    ws.on('close', () => end(new boom_1.Boom('Connection Terminated', { statusCode: Types_1.DisconnectReason.connectionLost })));
    ws.on(Defaults_1.PHONE_CONNECTION_CB, json => {
        if (!json[1]) {
            end(new boom_1.Boom('Connection terminated by phone', { statusCode: Types_1.DisconnectReason.connectionLost }));
            logger.info('Connection terminated by phone, closing...');
        }
        else {
            phoneConnectionChanged(true);
        }
    });
    ws.on('CB:Cmd,type:disconnect', json => {
        const { kind } = json[1];
        let reason;
        switch (kind) {
            case 'replaced':
                reason = Types_1.DisconnectReason.connectionReplaced;
                break;
            default:
                reason = Types_1.DisconnectReason.connectionLost;
                break;
        }
        end(new boom_1.Boom(`Connection terminated by server: "${kind || 'unknown'}"`, { statusCode: reason }));
    });
    return {
        type: 'legacy',
        ws,
        sendAdminTest,
        updateKeys: (info) => authInfo = info,
        waitForSocketOpen,
        sendNode,
        generateMessageTag,
        waitForMessage,
        query,
        /** Generic function for action, set queries */
        setQuery: async (nodes, binaryTag = [Types_1.WAMetric.group, Types_1.WAFlag.ignore], tag) => {
            const json = {
                tag: 'action',
                attrs: { epoch: epoch.toString(), type: 'set' },
                content: nodes
            };
            return query({
                json,
                binaryTag,
                tag,
                expect200: true,
                requiresPhoneConnection: true
            });
        },
        currentEpoch: () => epoch,
        end
    };
};
exports.makeSocket = makeSocket;
