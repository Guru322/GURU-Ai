"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("@hapi/boom");
const events_1 = __importDefault(require("events"));
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const socket_1 = require("./socket");
const makeAuthSocket = (config) => {
    const { logger, version, browser, connectTimeoutMs, printQRInTerminal, auth: initialAuthInfo } = config;
    const ev = new events_1.default();
    const authInfo = initialAuthInfo || (0, Utils_1.newLegacyAuthCreds)();
    const state = {
        legacy: {
            phoneConnected: false,
        },
        connection: 'connecting',
    };
    const socket = (0, socket_1.makeSocket)(config);
    const { ws } = socket;
    let curveKeys;
    let initTimeout;
    ws.on('phone-connection', ({ value: phoneConnected }) => {
        updateState({ legacy: { ...state.legacy, phoneConnected } });
    });
    // add close listener
    ws.on('ws-close', (error) => {
        logger.info({ error }, 'closed connection to WhatsApp');
        initTimeout && clearTimeout(initTimeout);
        // if no reconnects occur
        // send close event
        updateState({
            connection: 'close',
            qr: undefined,
            lastDisconnect: {
                error,
                date: new Date()
            }
        });
    });
    /** Can you login to WA without scanning the QR */
    const canLogin = () => !!(authInfo === null || authInfo === void 0 ? void 0 : authInfo.encKey) && !!(authInfo === null || authInfo === void 0 ? void 0 : authInfo.macKey);
    const updateState = (update) => {
        Object.assign(state, update);
        ev.emit('connection.update', update);
    };
    /**
     * Logs you out from WA
     * If connected, invalidates the credentials with the server
     */
    const logout = async () => {
        if (state.connection === 'open') {
            await socket.sendNode({
                json: ['admin', 'Conn', 'disconnect'],
                tag: 'goodbye'
            });
        }
        // will call state update to close connection
        socket === null || socket === void 0 ? void 0 : socket.end(new boom_1.Boom('Logged Out', { statusCode: Types_1.DisconnectReason.loggedOut }));
    };
    const updateEncKeys = () => {
        // update the keys so we can decrypt traffic
        socket.updateKeys({ encKey: authInfo.encKey, macKey: authInfo.macKey });
    };
    const generateKeysForAuth = async (ref, ttl) => {
        curveKeys = Utils_1.Curve.generateKeyPair();
        const publicKey = Buffer.from(curveKeys.public).toString('base64');
        const qrLoop = ttl => {
            const qr = [ref, publicKey, authInfo.clientID].join(',');
            updateState({ qr });
            initTimeout = setTimeout(async () => {
                var _a;
                if (state.connection !== 'connecting') {
                    return;
                }
                logger.debug('regenerating QR');
                try {
                    // request new QR
                    const { ref: newRef, ttl: newTTL } = await socket.query({
                        json: ['admin', 'Conn', 'reref'],
                        expect200: true,
                        longTag: true,
                        requiresPhoneConnection: false
                    });
                    ttl = newTTL;
                    ref = newRef;
                }
                catch (error) {
                    logger.error({ error }, 'error in QR gen');
                    if (((_a = error.output) === null || _a === void 0 ? void 0 : _a.statusCode) === 429) { // too many QR requests
                        socket.end(error);
                        return;
                    }
                }
                qrLoop(ttl);
            }, ttl || 20000); // default is 20s, on the off-chance ttl is not present
        };
        qrLoop(ttl);
    };
    const onOpen = async () => {
        var _a, _b;
        const canDoLogin = canLogin();
        const initQuery = (async () => {
            const { ref, ttl } = await socket.query({
                json: ['admin', 'init', version, browser, authInfo.clientID, true],
                expect200: true,
                longTag: true,
                requiresPhoneConnection: false
            });
            if (!canDoLogin) {
                generateKeysForAuth(ref, ttl);
            }
        })();
        let loginTag;
        if (canDoLogin) {
            updateEncKeys();
            // if we have the info to restore a closed session
            const json = [
                'admin',
                'login',
                authInfo.clientToken,
                authInfo.serverToken,
                authInfo.clientID,
                'takeover'
            ];
            loginTag = socket.generateMessageTag(true);
            // send login every 10s
            const sendLoginReq = () => {
                if (state.connection === 'open') {
                    logger.warn('Received login timeout req when state=open, ignoring...');
                    return;
                }
                logger.info('sending login request');
                socket.sendNode({
                    json,
                    tag: loginTag
                });
                initTimeout = setTimeout(sendLoginReq, 10000);
            };
            sendLoginReq();
        }
        await initQuery;
        // wait for response with tag "s1"
        let response = await Promise.race([
            socket.waitForMessage('s1', false, undefined).promise,
            ...(loginTag ? [socket.waitForMessage(loginTag, false, connectTimeoutMs).promise] : [])
        ]);
        initTimeout && clearTimeout(initTimeout);
        initTimeout = undefined;
        if (response.status && response.status !== 200) {
            throw new boom_1.Boom('Unexpected error in login', { data: response, statusCode: response.status });
        }
        // if its a challenge request (we get it when logging in)
        if ((_a = response[1]) === null || _a === void 0 ? void 0 : _a.challenge) {
            const json = (0, Utils_1.computeChallengeResponse)(response[1].challenge, authInfo);
            logger.info('resolving login challenge');
            await socket.query({ json, expect200: true, timeoutMs: connectTimeoutMs });
            response = await socket.waitForMessage('s2', true).promise;
        }
        if (!response || !response[1]) {
            throw new boom_1.Boom('Received unexpected login response', { data: response });
        }
        if (response[1].type === 'upgrade_md_prod') {
            throw new boom_1.Boom('Require multi-device edition', { statusCode: Types_1.DisconnectReason.multideviceMismatch });
        }
        // validate the new connection
        const { user, auth } = (0, Utils_1.validateNewConnection)(response[1], authInfo, curveKeys); // validate the connection
        const isNewLogin = user.id !== ((_b = state.legacy.user) === null || _b === void 0 ? void 0 : _b.id);
        Object.assign(authInfo, auth);
        updateEncKeys();
        logger.info({ user }, 'logged in');
        ev.emit('creds.update', auth);
        updateState({
            connection: 'open',
            legacy: {
                phoneConnected: true,
                user,
            },
            isNewLogin,
            qr: undefined
        });
    };
    ws.once('open', async () => {
        try {
            await onOpen();
        }
        catch (error) {
            socket.end(error);
        }
    });
    if (printQRInTerminal) {
        (0, Utils_1.printQRIfNecessaryListener)(ev, logger);
    }
    process.nextTick(() => {
        ev.emit('connection.update', {
            ...state
        });
    });
    return {
        ...socket,
        state,
        authInfo,
        ev,
        canLogin,
        logout,
        /** Waits for the connection to WA to reach a state */
        waitForConnectionUpdate: (0, Utils_1.bindWaitForConnectionUpdate)(ev)
    };
};
exports.default = makeAuthSocket;
