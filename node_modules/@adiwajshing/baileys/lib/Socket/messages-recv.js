"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMessagesRecvSocket = void 0;
const WAProto_1 = require("../../WAProto");
const Defaults_1 = require("../Defaults");
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const make_mutex_1 = require("../Utils/make-mutex");
const process_message_1 = require("../Utils/process-message");
const WABinary_1 = require("../WABinary");
const groups_1 = require("./groups");
const messages_send_1 = require("./messages-send");
const makeMessagesRecvSocket = (config) => {
    const { logger, retryRequestDelayMs, getMessage } = config;
    const sock = (0, messages_send_1.makeMessagesSocket)(config);
    const { ev, authState, ws, processingMutex, upsertMessage, resyncAppState, onUnexpectedError, assertSessions, sendNode, relayMessage, sendReceipt, uploadPreKeys, } = sock;
    /** this mutex ensures that each retryRequest will wait for the previous one to finish */
    const retryMutex = (0, make_mutex_1.makeMutex)();
    const msgRetryMap = config.msgRetryCounterMap || {};
    const callOfferData = {};
    let sendActiveReceipts = false;
    const sendMessageAck = async ({ tag, attrs }) => {
        const stanza = {
            tag: 'ack',
            attrs: {
                id: attrs.id,
                to: attrs.from,
                class: tag,
            }
        };
        if (!!attrs.participant) {
            stanza.attrs.participant = attrs.participant;
        }
        if (!!attrs.recipient) {
            stanza.attrs.recipient = attrs.recipient;
        }
        if (tag !== 'message' && attrs.type) {
            stanza.attrs.type = attrs.type;
        }
        logger.debug({ recv: { tag, attrs }, sent: stanza.attrs }, 'sent ack');
        await sendNode(stanza);
    };
    const sendRetryRequest = async (node, forceIncludeKeys = false) => {
        const msgId = node.attrs.id;
        let retryCount = msgRetryMap[msgId] || 0;
        if (retryCount >= 5) {
            logger.debug({ retryCount, msgId }, 'reached retry limit, clearing');
            delete msgRetryMap[msgId];
            return;
        }
        retryCount += 1;
        msgRetryMap[msgId] = retryCount;
        const { account, signedPreKey, signedIdentityKey: identityKey } = authState.creds;
        const deviceIdentity = (0, Utils_1.encodeSignedDeviceIdentity)(account, true);
        await authState.keys.transaction(async () => {
            const receipt = {
                tag: 'receipt',
                attrs: {
                    id: msgId,
                    type: 'retry',
                    to: node.attrs.from
                },
                content: [
                    {
                        tag: 'retry',
                        attrs: {
                            count: retryCount.toString(),
                            id: node.attrs.id,
                            t: node.attrs.t,
                            v: '1'
                        }
                    },
                    {
                        tag: 'registration',
                        attrs: {},
                        content: (0, Utils_1.encodeBigEndian)(authState.creds.registrationId)
                    }
                ]
            };
            if (node.attrs.recipient) {
                receipt.attrs.recipient = node.attrs.recipient;
            }
            if (node.attrs.participant) {
                receipt.attrs.participant = node.attrs.participant;
            }
            if (retryCount > 1 || forceIncludeKeys) {
                const { update, preKeys } = await (0, Utils_1.getNextPreKeys)(authState, 1);
                const [keyId] = Object.keys(preKeys);
                const key = preKeys[+keyId];
                const content = receipt.content;
                content.push({
                    tag: 'keys',
                    attrs: {},
                    content: [
                        { tag: 'type', attrs: {}, content: Buffer.from(Defaults_1.KEY_BUNDLE_TYPE) },
                        { tag: 'identity', attrs: {}, content: identityKey.public },
                        (0, Utils_1.xmppPreKey)(key, +keyId),
                        (0, Utils_1.xmppSignedPreKey)(signedPreKey),
                        { tag: 'device-identity', attrs: {}, content: deviceIdentity }
                    ]
                });
                ev.emit('creds.update', update);
            }
            await sendNode(receipt);
            logger.info({ msgAttrs: node.attrs, retryCount }, 'sent retry receipt');
        });
    };
    const handleEncryptNotification = async (node) => {
        const from = node.attrs.from;
        if (from === WABinary_1.S_WHATSAPP_NET) {
            const countChild = (0, WABinary_1.getBinaryNodeChild)(node, 'count');
            const count = +countChild.attrs.value;
            const shouldUploadMorePreKeys = count < Defaults_1.MIN_PREKEY_COUNT;
            logger.debug({ count, shouldUploadMorePreKeys }, 'recv pre-key count');
            if (shouldUploadMorePreKeys) {
                await uploadPreKeys();
            }
        }
        else {
            const identityNode = (0, WABinary_1.getBinaryNodeChild)(node, 'identity');
            if (identityNode) {
                logger.info({ jid: from }, 'identity changed');
                // not handling right now
                // signal will override new identity anyway
            }
            else {
                logger.info({ node }, 'unknown encrypt notification');
            }
        }
    };
    const processNotification = async (node) => {
        const result = {};
        const [child] = (0, WABinary_1.getAllBinaryNodeChildren)(node);
        const nodeType = node.attrs.type;
        if (nodeType === 'w:gp2') {
            switch (child === null || child === void 0 ? void 0 : child.tag) {
                case 'create':
                    const metadata = (0, groups_1.extractGroupMetadata)(child);
                    result.messageStubType = Types_1.WAMessageStubType.GROUP_CREATE;
                    result.messageStubParameters = [metadata.subject];
                    result.key = { participant: metadata.owner };
                    ev.emit('chats.upsert', [{
                            id: metadata.id,
                            name: metadata.subject,
                            conversationTimestamp: metadata.creation,
                        }]);
                    ev.emit('groups.upsert', [metadata]);
                    break;
                case 'ephemeral':
                case 'not_ephemeral':
                    result.message = {
                        protocolMessage: {
                            type: WAProto_1.proto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING,
                            ephemeralExpiration: +(child.attrs.expiration || 0)
                        }
                    };
                    break;
                case 'promote':
                case 'demote':
                case 'remove':
                case 'add':
                case 'leave':
                    const stubType = `GROUP_PARTICIPANT_${child.tag.toUpperCase()}`;
                    result.messageStubType = Types_1.WAMessageStubType[stubType];
                    const participants = (0, WABinary_1.getBinaryNodeChildren)(child, 'participant').map(p => p.attrs.jid);
                    if (participants.length === 1 &&
                        // if recv. "remove" message and sender removed themselves
                        // mark as left
                        (0, WABinary_1.areJidsSameUser)(participants[0], node.attrs.participant) &&
                        child.tag === 'remove') {
                        result.messageStubType = Types_1.WAMessageStubType.GROUP_PARTICIPANT_LEAVE;
                    }
                    result.messageStubParameters = participants;
                    break;
                case 'subject':
                    result.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_SUBJECT;
                    result.messageStubParameters = [child.attrs.subject];
                    break;
                case 'announcement':
                case 'not_announcement':
                    result.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_ANNOUNCE;
                    result.messageStubParameters = [(child.tag === 'announcement') ? 'on' : 'off'];
                    break;
                case 'locked':
                case 'unlocked':
                    result.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_RESTRICT;
                    result.messageStubParameters = [(child.tag === 'locked') ? 'on' : 'off'];
                    break;
            }
        }
        else if (nodeType === 'mediaretry') {
            const event = (0, Utils_1.decodeMediaRetryNode)(node);
            ev.emit('messages.media-update', [event]);
        }
        else if (nodeType === 'encrypt') {
            await handleEncryptNotification(node);
        }
        else if (nodeType === 'devices') {
            const devices = (0, WABinary_1.getBinaryNodeChildren)(child, 'device');
            if ((0, WABinary_1.areJidsSameUser)(child.attrs.jid, authState.creds.me.id)) {
                const deviceJids = devices.map(d => d.attrs.jid);
                logger.info({ deviceJids }, 'got my own devices');
            }
        }
        else if (nodeType === 'server_sync') {
            const update = (0, WABinary_1.getBinaryNodeChild)(node, 'collection');
            if (update) {
                const name = update.attrs.name;
                await resyncAppState([name], undefined);
            }
        }
        if (Object.keys(result).length) {
            return result;
        }
    };
    const willSendMessageAgain = (id, participant) => {
        const key = `${id}:${participant}`;
        const retryCount = msgRetryMap[key] || 0;
        return retryCount < 5;
    };
    const updateSendMessageAgainCount = (id, participant) => {
        const key = `${id}:${participant}`;
        msgRetryMap[key] = (msgRetryMap[key] || 0) + 1;
    };
    const sendMessagesAgain = async (key, ids, retryNode) => {
        var _a;
        const msgs = await Promise.all(ids.map(id => getMessage({ ...key, id })));
        const remoteJid = key.remoteJid;
        const participant = key.participant || remoteJid;
        // if it's the primary jid sending the request
        // just re-send the message to everyone
        // prevents the first message decryption failure
        const sendToAll = !((_a = (0, WABinary_1.jidDecode)(participant)) === null || _a === void 0 ? void 0 : _a.device);
        await assertSessions([participant], true);
        if ((0, WABinary_1.isJidGroup)(remoteJid)) {
            await authState.keys.set({ 'sender-key-memory': { [remoteJid]: null } });
        }
        logger.debug({ participant, sendToAll }, 'forced new session for retry recp');
        for (let i = 0; i < msgs.length; i++) {
            const msg = msgs[i];
            if (msg) {
                updateSendMessageAgainCount(ids[i], participant);
                const msgRelayOpts = { messageId: ids[i] };
                if (sendToAll) {
                    msgRelayOpts.useUserDevicesCache = false;
                }
                else {
                    msgRelayOpts.participant = {
                        jid: participant,
                        count: +retryNode.attrs.count
                    };
                }
                await relayMessage(key.remoteJid, msg, msgRelayOpts);
            }
            else {
                logger.debug({ jid: key.remoteJid, id: ids[i] }, 'recv retry request, but message not available');
            }
        }
    };
    const handleReceipt = async (node) => {
        var _a;
        const { attrs, content } = node;
        const isNodeFromMe = (0, WABinary_1.areJidsSameUser)(attrs.participant || attrs.from, (_a = authState.creds.me) === null || _a === void 0 ? void 0 : _a.id);
        const remoteJid = !isNodeFromMe || (0, WABinary_1.isJidGroup)(attrs.from) ? attrs.from : attrs.recipient;
        const fromMe = !attrs.recipient || (attrs.type === 'retry' && isNodeFromMe);
        const ids = [attrs.id];
        if (Array.isArray(content)) {
            const items = (0, WABinary_1.getBinaryNodeChildren)(content[0], 'item');
            ids.push(...items.map(i => i.attrs.id));
        }
        const key = {
            remoteJid,
            id: '',
            fromMe,
            participant: attrs.participant
        };
        await Promise.all([
            processingMutex.mutex(async () => {
                const status = (0, Utils_1.getStatusFromReceiptType)(attrs.type);
                if (typeof status !== 'undefined' &&
                    (
                    // basically, we only want to know when a message from us has been delivered to/read by the other person
                    // or another device of ours has read some messages
                    status > WAProto_1.proto.WebMessageInfo.Status.DELIVERY_ACK ||
                        !isNodeFromMe)) {
                    if ((0, WABinary_1.isJidGroup)(remoteJid)) {
                        if (attrs.participant) {
                            const updateKey = status === WAProto_1.proto.WebMessageInfo.Status.DELIVERY_ACK ? 'receiptTimestamp' : 'readTimestamp';
                            ev.emit('message-receipt.update', ids.map(id => ({
                                key: { ...key, id },
                                receipt: {
                                    userJid: (0, WABinary_1.jidNormalizedUser)(attrs.participant),
                                    [updateKey]: +attrs.t
                                }
                            })));
                        }
                    }
                    else {
                        ev.emit('messages.update', ids.map(id => ({
                            key: { ...key, id },
                            update: { status }
                        })));
                    }
                }
                if (attrs.type === 'retry') {
                    // correctly set who is asking for the retry
                    key.participant = key.participant || attrs.from;
                    const retryNode = (0, WABinary_1.getBinaryNodeChild)(node, 'retry');
                    if (willSendMessageAgain(ids[0], key.participant)) {
                        if (key.fromMe) {
                            try {
                                logger.debug({ attrs, key }, 'recv retry request');
                                await sendMessagesAgain(key, ids, retryNode);
                            }
                            catch (error) {
                                logger.error({ key, ids, trace: error.stack }, 'error in sending message again');
                            }
                        }
                        else {
                            logger.info({ attrs, key }, 'recv retry for not fromMe message');
                        }
                    }
                    else {
                        logger.info({ attrs, key }, 'will not send message again, as sent too many times');
                    }
                }
            }),
            sendMessageAck(node)
        ]);
    };
    const handleNotification = async (node) => {
        const remoteJid = node.attrs.from;
        await Promise.all([
            processingMutex.mutex(async () => {
                const msg = await processNotification(node);
                if (msg) {
                    const fromMe = (0, WABinary_1.areJidsSameUser)(node.attrs.participant || remoteJid, authState.creds.me.id);
                    msg.key = {
                        remoteJid,
                        fromMe,
                        participant: node.attrs.participant,
                        id: node.attrs.id,
                        ...(msg.key || {})
                    };
                    msg.participant = node.attrs.participant;
                    msg.messageTimestamp = +node.attrs.t;
                    const fullMsg = WAProto_1.proto.WebMessageInfo.fromObject(msg);
                    await upsertMessage(fullMsg, 'append');
                }
            }),
            sendMessageAck(node)
        ]);
    };
    const handleMessage = async (node) => {
        const { fullMessage: msg, category, author, decryptionTask } = (0, Utils_1.decodeMessageStanza)(node, authState);
        await Promise.all([
            processingMutex.mutex(async () => {
                await decryptionTask;
                // message failed to decrypt
                if (msg.messageStubType === WAProto_1.proto.WebMessageInfo.StubType.CIPHERTEXT) {
                    logger.error({ key: msg.key, params: msg.messageStubParameters }, 'failure in decrypting message');
                    retryMutex.mutex(async () => {
                        if (ws.readyState === ws.OPEN) {
                            const encNode = (0, WABinary_1.getBinaryNodeChild)(node, 'enc');
                            await sendRetryRequest(node, !encNode);
                            if (retryRequestDelayMs) {
                                await (0, Utils_1.delay)(retryRequestDelayMs);
                            }
                        }
                        else {
                            logger.debug({ node }, 'connection closed, ignoring retry req');
                        }
                    });
                }
                else {
                    // no type in the receipt => message delivered
                    let type = undefined;
                    let participant = msg.key.participant;
                    if (category === 'peer') { // special peer message
                        type = 'peer_msg';
                    }
                    else if (msg.key.fromMe) { // message was sent by us from a different device
                        type = 'sender';
                        // need to specially handle this case
                        if ((0, WABinary_1.isJidUser)(msg.key.remoteJid)) {
                            participant = author;
                        }
                    }
                    else if (!sendActiveReceipts) {
                        type = 'inactive';
                    }
                    await sendReceipt(msg.key.remoteJid, participant, [msg.key.id], type);
                    // send ack for history message
                    const isAnyHistoryMsg = (0, Utils_1.isHistoryMsg)(msg.message);
                    if (isAnyHistoryMsg) {
                        const jid = (0, WABinary_1.jidNormalizedUser)(msg.key.remoteJid);
                        await sendReceipt(jid, undefined, [msg.key.id], 'hist_sync');
                    }
                }
                (0, process_message_1.cleanMessage)(msg, authState.creds.me.id);
                await upsertMessage(msg, node.attrs.offline ? 'append' : 'notify');
            }),
            sendMessageAck(node)
        ]);
    };
    const handleCall = async (node) => {
        const { attrs } = node;
        const [infoChild] = (0, WABinary_1.getAllBinaryNodeChildren)(node);
        const callId = infoChild.attrs['call-id'];
        const from = infoChild.attrs.from || infoChild.attrs['call-creator'];
        const status = (0, Utils_1.getCallStatusFromNode)(infoChild);
        const call = {
            chatId: attrs.from,
            from,
            id: callId,
            date: new Date(+attrs.t * 1000),
            offline: !!attrs.offline,
            status,
        };
        if (status === 'offer') {
            call.isVideo = !!(0, WABinary_1.getBinaryNodeChild)(infoChild, 'video');
            call.isGroup = infoChild.attrs.type === 'group';
            callOfferData[call.id] = call;
        }
        // use existing call info to populate this event
        if (callOfferData[call.id]) {
            call.isVideo = callOfferData[call.id].isVideo;
            call.isGroup = callOfferData[call.id].isGroup;
        }
        // delete data once call has ended
        if (status === 'reject' || status === 'accept' || status === 'timeout') {
            delete callOfferData[call.id];
        }
        ev.emit('call', [call]);
        await sendMessageAck(node);
    };
    const handleBadAck = async ({ attrs }) => {
        // current hypothesis is that if pash is sent in the ack
        // it means -- the message hasn't reached all devices yet
        // we'll retry sending the message here
        if (attrs.phash) {
            logger.info({ attrs }, 'received phash in ack, resending message...');
            const key = { remoteJid: attrs.from, fromMe: true, id: attrs.id };
            const msg = await getMessage(key);
            if (msg) {
                await relayMessage(key.remoteJid, msg, { messageId: key.id, useUserDevicesCache: false });
            }
            else {
                logger.warn({ attrs }, 'could not send message again, as it was not found');
            }
        }
    };
    const flushBufferIfLastOfflineNode = (node, identifier, exec) => {
        const task = exec(node)
            .catch(err => onUnexpectedError(err, identifier));
        const offline = node.attrs.offline;
        if (offline) {
            ev.processInBuffer(task);
        }
    };
    // called when all offline notifs are handled
    ws.on('CB:ib,,offline', async (node) => {
        const child = (0, WABinary_1.getBinaryNodeChild)(node, 'offline');
        const offlineNotifs = +((child === null || child === void 0 ? void 0 : child.attrs.count) || 0);
        logger.info(`handled ${offlineNotifs} offline messages/notifications`);
        await ev.flush();
        ev.emit('connection.update', { receivedPendingNotifications: true });
    });
    // recv a message
    ws.on('CB:message', (node) => {
        flushBufferIfLastOfflineNode(node, 'processing message', handleMessage);
    });
    ws.on('CB:call', async (node) => {
        flushBufferIfLastOfflineNode(node, 'handling call', handleCall);
    });
    ws.on('CB:receipt', node => {
        flushBufferIfLastOfflineNode(node, 'handling receipt', handleReceipt);
    });
    ws.on('CB:notification', async (node) => {
        flushBufferIfLastOfflineNode(node, 'handling notification', handleNotification);
    });
    ws.on('CB:ack,class:message', (node) => {
        handleBadAck(node)
            .catch(error => onUnexpectedError(error, 'handling bad ack'));
    });
    ev.on('call', ([call]) => {
        // missed call + group call notification message generation
        if (call.status === 'timeout' || (call.status === 'offer' && call.isGroup)) {
            const msg = {
                key: {
                    remoteJid: call.chatId,
                    id: call.id,
                    fromMe: false
                },
                messageTimestamp: (0, Utils_1.unixTimestampSeconds)(call.date),
            };
            if (call.status === 'timeout') {
                if (call.isGroup) {
                    msg.messageStubType = call.isVideo ? Types_1.WAMessageStubType.CALL_MISSED_GROUP_VIDEO : Types_1.WAMessageStubType.CALL_MISSED_GROUP_VOICE;
                }
                else {
                    msg.messageStubType = call.isVideo ? Types_1.WAMessageStubType.CALL_MISSED_VIDEO : Types_1.WAMessageStubType.CALL_MISSED_VOICE;
                }
            }
            else {
                msg.message = { call: { callKey: Buffer.from(call.id) } };
            }
            const protoMsg = WAProto_1.proto.WebMessageInfo.fromObject(msg);
            upsertMessage(protoMsg, call.offline ? 'append' : 'notify');
        }
    });
    ev.on('connection.update', ({ isOnline }) => {
        if (typeof isOnline !== 'undefined') {
            sendActiveReceipts = isOnline;
            logger.trace(`sendActiveReceipts set to "${sendActiveReceipts}"`);
        }
    });
    return {
        ...sock,
        sendMessageAck,
        sendRetryRequest
    };
};
exports.makeMessagesRecvSocket = makeMessagesRecvSocket;
