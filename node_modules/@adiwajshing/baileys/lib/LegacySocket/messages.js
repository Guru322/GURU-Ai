"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WAProto_1 = require("../../WAProto");
const Defaults_1 = require("../Defaults");
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const WABinary_1 = require("../WABinary");
const chats_1 = __importDefault(require("./chats"));
const STATUS_MAP = {
    read: Types_1.WAMessageStatus.READ,
    message: Types_1.WAMessageStatus.DELIVERY_ACK,
    error: Types_1.WAMessageStatus.ERROR
};
const makeMessagesSocket = (config) => {
    const { logger } = config;
    const sock = (0, chats_1.default)(config);
    const { ev, ws: socketEvents, query, generateMessageTag, currentEpoch, setQuery, state } = sock;
    let mediaConn;
    const refreshMediaConn = async (forceGet = false) => {
        const media = await mediaConn;
        if (!media || forceGet || (new Date().getTime() - media.fetchDate.getTime()) > media.ttl * 1000) {
            mediaConn = (async () => {
                const { media_conn } = await query({
                    json: ['query', 'mediaConn'],
                    requiresPhoneConnection: false,
                    expect200: true
                });
                media_conn.fetchDate = new Date();
                return media_conn;
            })();
        }
        return mediaConn;
    };
    const fetchMessagesFromWA = async (jid, count, cursor) => {
        let key;
        if (cursor) {
            key = 'before' in cursor ? cursor.before : cursor.after;
        }
        const { content } = await query({
            json: {
                tag: 'query',
                attrs: {
                    epoch: currentEpoch().toString(),
                    type: 'message',
                    jid: jid,
                    kind: !cursor || 'before' in cursor ? 'before' : 'after',
                    count: count.toString(),
                    index: key === null || key === void 0 ? void 0 : key.id,
                    owner: (key === null || key === void 0 ? void 0 : key.fromMe) === false ? 'false' : 'true',
                }
            },
            binaryTag: [Types_1.WAMetric.queryMessages, Types_1.WAFlag.ignore],
            expect200: false,
            requiresPhoneConnection: true
        });
        if (Array.isArray(content)) {
            return content.map(data => WAProto_1.proto.WebMessageInfo.decode(data.content));
        }
        return [];
    };
    const updateMediaMessage = async (message) => {
        const content = (0, Utils_1.assertMediaContent)(message.message);
        const response = await query({
            json: {
                tag: 'query',
                attrs: {
                    type: 'media',
                    index: message.key.id,
                    owner: message.key.fromMe ? 'true' : 'false',
                    jid: message.key.remoteJid,
                    epoch: currentEpoch().toString()
                }
            },
            binaryTag: [Types_1.WAMetric.queryMedia, Types_1.WAFlag.ignore],
            expect200: true,
            requiresPhoneConnection: true
        });
        const attrs = response.attrs;
        Object.assign(content, attrs); // update message
        ev.emit('messages.update', [{ key: message.key, update: { message: message.message } }]);
        return message;
    };
    const onMessage = (message, type) => {
        var _a, _b, _c, _d;
        const jid = message.key.remoteJid;
        // store chat updates in this
        const chatUpdate = {
            id: jid,
        };
        const emitGroupUpdate = (update) => {
            ev.emit('groups.update', [{ id: jid, ...update }]);
        };
        const normalizedContent = (0, Utils_1.normalizeMessageContent)(message.message);
        const protocolMessage = normalizedContent === null || normalizedContent === void 0 ? void 0 : normalizedContent.protocolMessage;
        if (!!normalizedContent
            && !(normalizedContent === null || normalizedContent === void 0 ? void 0 : normalizedContent.protocolMessage)
            && !(normalizedContent === null || normalizedContent === void 0 ? void 0 : normalizedContent.reactionMessage)) {
            chatUpdate.conversationTimestamp = +(0, Utils_1.toNumber)(message.messageTimestamp);
            // add to count if the message isn't from me & there exists a message
            if (!message.key.fromMe) {
                chatUpdate.unreadCount = 1;
                const participant = (0, WABinary_1.jidNormalizedUser)(message.participant || jid);
                ev.emit('presence.update', {
                    id: jid,
                    presences: { [participant]: { lastKnownPresence: 'available' } }
                });
            }
        }
        if (normalizedContent === null || normalizedContent === void 0 ? void 0 : normalizedContent.reactionMessage) {
            const reaction = {
                ...normalizedContent.reactionMessage,
                key: message.key,
            };
            ev.emit('messages.reaction', [{ reaction, key: normalizedContent.reactionMessage.key }]);
        }
        // if it's a message to delete another message
        if (protocolMessage) {
            switch (protocolMessage.type) {
                case WAProto_1.proto.Message.ProtocolMessage.Type.REVOKE:
                    const key = protocolMessage.key;
                    const messageStubType = Types_1.WAMessageStubType.REVOKE;
                    ev.emit('messages.update', [
                        {
                            // the key of the deleted message is updated
                            update: { message: null, key: message.key, messageStubType },
                            key: key
                        }
                    ]);
                    return;
                case WAProto_1.proto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING:
                    chatUpdate.ephemeralSettingTimestamp = message.messageTimestamp;
                    chatUpdate.ephemeralExpiration = protocolMessage.ephemeralExpiration;
                    if ((0, WABinary_1.isJidGroup)(jid)) {
                        emitGroupUpdate({ ephemeralDuration: protocolMessage.ephemeralExpiration || 0 });
                    }
                    break;
                default:
                    break;
            }
        }
        // check if the message is an action
        if (message.messageStubType) {
            const { user } = state.legacy;
            //let actor = jidNormalizedUser (message.participant)
            let participants;
            const emitParticipantsUpdate = (action) => (ev.emit('group-participants.update', { id: jid, participants, action }));
            switch (message.messageStubType) {
                case Types_1.WAMessageStubType.CHANGE_EPHEMERAL_SETTING:
                    chatUpdate.ephemeralSettingTimestamp = message.messageTimestamp;
                    chatUpdate.ephemeralExpiration = +message.messageStubParameters[0];
                    if ((0, WABinary_1.isJidGroup)(jid)) {
                        emitGroupUpdate({ ephemeralDuration: +(((_a = message.messageStubParameters) === null || _a === void 0 ? void 0 : _a[0]) || 0) });
                    }
                    break;
                case Types_1.WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
                case Types_1.WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
                    participants = message.messageStubParameters.map(WABinary_1.jidNormalizedUser);
                    emitParticipantsUpdate('remove');
                    // mark the chat read only if you left the group
                    if (participants.includes(user.id)) {
                        chatUpdate.readOnly = true;
                    }
                    break;
                case Types_1.WAMessageStubType.GROUP_PARTICIPANT_ADD:
                case Types_1.WAMessageStubType.GROUP_PARTICIPANT_INVITE:
                case Types_1.WAMessageStubType.GROUP_PARTICIPANT_ADD_REQUEST_JOIN:
                    participants = message.messageStubParameters.map(WABinary_1.jidNormalizedUser);
                    if (participants.includes(user.id)) {
                        chatUpdate.readOnly = null;
                    }
                    emitParticipantsUpdate('add');
                    break;
                case Types_1.WAMessageStubType.GROUP_CHANGE_ANNOUNCE:
                    const announce = ((_b = message.messageStubParameters) === null || _b === void 0 ? void 0 : _b[0]) === 'on';
                    emitGroupUpdate({ announce });
                    break;
                case Types_1.WAMessageStubType.GROUP_CHANGE_RESTRICT:
                    const restrict = ((_c = message.messageStubParameters) === null || _c === void 0 ? void 0 : _c[0]) === 'on';
                    emitGroupUpdate({ restrict });
                    break;
                case Types_1.WAMessageStubType.GROUP_CHANGE_SUBJECT:
                case Types_1.WAMessageStubType.GROUP_CREATE:
                    chatUpdate.name = (_d = message.messageStubParameters) === null || _d === void 0 ? void 0 : _d[0];
                    emitGroupUpdate({ subject: chatUpdate.name });
                    break;
            }
        }
        if (Object.keys(chatUpdate).length > 1) {
            ev.emit('chats.update', [chatUpdate]);
        }
        ev.emit('messages.upsert', { messages: [message], type });
    };
    const waUploadToServer = (0, Utils_1.getWAUploadToServer)(config, refreshMediaConn);
    /** Query a string to check if it has a url, if it does, return WAUrlInfo */
    const generateUrlInfo = async (text) => {
        const response = await query({
            json: {
                tag: 'query',
                attrs: {
                    type: 'url',
                    url: text,
                    epoch: currentEpoch().toString()
                }
            },
            binaryTag: [26, Types_1.WAFlag.ignore],
            expect200: true,
            requiresPhoneConnection: false
        });
        const urlInfo = { ...response.attrs };
        if (response && response.content) {
            urlInfo.jpegThumbnail = response.content;
        }
        return urlInfo;
    };
    /** Relay (send) a WAMessage; more advanced functionality to send a built WA Message, you may want to stick with sendMessage() */
    const relayMessage = async (message, { waitForAck } = { waitForAck: true }) => {
        var _a, _b;
        const json = {
            tag: 'action',
            attrs: { epoch: currentEpoch().toString(), type: 'relay' },
            content: [
                {
                    tag: 'message',
                    attrs: {},
                    content: WAProto_1.proto.WebMessageInfo.encode(message).finish()
                }
            ]
        };
        const isMsgToMe = (0, WABinary_1.areJidsSameUser)(message.key.remoteJid, ((_b = (_a = state.legacy) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) || '');
        const flag = isMsgToMe ? Types_1.WAFlag.acknowledge : Types_1.WAFlag.ignore; // acknowledge when sending message to oneself
        const mID = message.key.id;
        const finalState = isMsgToMe ? Types_1.WAMessageStatus.READ : Types_1.WAMessageStatus.SERVER_ACK;
        message.status = Types_1.WAMessageStatus.PENDING;
        const promise = query({
            json,
            binaryTag: [Types_1.WAMetric.message, flag],
            tag: mID,
            expect200: true,
            requiresPhoneConnection: true
        });
        if (waitForAck) {
            await promise;
            message.status = finalState;
        }
        else {
            const emitUpdate = (status) => {
                message.status = status;
                ev.emit('messages.update', [{ key: message.key, update: { status } }]);
            };
            promise
                .then(() => emitUpdate(finalState))
                .catch(() => emitUpdate(Types_1.WAMessageStatus.ERROR));
        }
        if (config.emitOwnEvents) {
            onMessage(message, 'append');
        }
    };
    // messages received
    const messagesUpdate = (node, isLatest) => {
        const messages = (0, WABinary_1.getBinaryNodeMessages)(node);
        messages.reverse();
        ev.emit('messages.set', { messages, isLatest });
    };
    socketEvents.on('CB:action,add:last', json => messagesUpdate(json, true));
    socketEvents.on('CB:action,add:unread', json => messagesUpdate(json, false));
    socketEvents.on('CB:action,add:before', json => messagesUpdate(json, false));
    // new messages
    socketEvents.on('CB:action,add:relay,message', (node) => {
        const msgs = (0, WABinary_1.getBinaryNodeMessages)(node);
        for (const msg of msgs) {
            onMessage(msg, 'notify');
        }
    });
    // If a message has been updated
    // usually called when a video message gets its upload url, or live locations or ciphertext message gets fixed
    socketEvents.on('CB:action,add:update,message', (node) => {
        const msgs = (0, WABinary_1.getBinaryNodeMessages)(node);
        for (const msg of msgs) {
            onMessage(msg, 'append');
        }
    });
    // message status updates
    const onMessageStatusUpdate = ({ content }) => {
        if (Array.isArray(content)) {
            const updates = [];
            for (const { attrs: json } of content) {
                const key = {
                    remoteJid: (0, WABinary_1.jidNormalizedUser)(json.jid),
                    id: json.index,
                    fromMe: json.owner === 'true'
                };
                const status = STATUS_MAP[json.type];
                if (status) {
                    updates.push({ key, update: { status } });
                }
                else {
                    logger.warn({ content, key }, 'got unknown status update for message');
                }
            }
            ev.emit('messages.update', updates);
        }
    };
    const onMessageInfoUpdate = ([, attributes]) => {
        var _a, _b;
        let ids = attributes.id;
        if (typeof ids === 'string') {
            ids = [ids];
        }
        let updateKey;
        switch (attributes.ack.toString()) {
            case '2':
                updateKey = 'receiptTimestamp';
                break;
            case '3':
                updateKey = 'readTimestamp';
                break;
            case '4':
                updateKey = 'playedTimestamp';
                break;
            default:
                logger.warn({ attributes }, 'received unknown message info update');
                return;
        }
        const keyPartial = {
            remoteJid: (0, WABinary_1.jidNormalizedUser)(attributes.to),
            fromMe: (0, WABinary_1.areJidsSameUser)(attributes.from, ((_b = (_a = state.legacy) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) || ''),
        };
        const userJid = (0, WABinary_1.jidNormalizedUser)(attributes.participant || attributes.to);
        const updates = ids.map(id => ({
            key: { ...keyPartial, id },
            receipt: {
                userJid,
                [updateKey]: +attributes.t
            }
        }));
        ev.emit('message-receipt.update', updates);
        // for individual messages
        // it means the message is marked read/delivered
        if (!(0, WABinary_1.isJidGroup)(keyPartial.remoteJid)) {
            ev.emit('messages.update', ids.map(id => ({
                key: { ...keyPartial, id },
                update: {
                    status: updateKey === 'receiptTimestamp' ? Types_1.WAMessageStatus.DELIVERY_ACK : Types_1.WAMessageStatus.READ
                }
            })));
        }
    };
    socketEvents.on('CB:action,add:relay,received', onMessageStatusUpdate);
    socketEvents.on('CB:action,,received', onMessageStatusUpdate);
    socketEvents.on('CB:Msg', onMessageInfoUpdate);
    socketEvents.on('CB:MsgInfo', onMessageInfoUpdate);
    return {
        ...sock,
        relayMessage,
        waUploadToServer,
        generateUrlInfo,
        messageInfo: async (jid, messageID) => {
            const { content } = await query({
                json: {
                    tag: 'query',
                    attrs: {
                        type: 'message_info',
                        index: messageID,
                        jid: jid,
                        epoch: currentEpoch().toString()
                    }
                },
                binaryTag: [Types_1.WAMetric.queryRead, Types_1.WAFlag.ignore],
                expect200: true,
                requiresPhoneConnection: true
            });
            const info = {};
            if (Array.isArray(content)) {
                for (const { tag, content: innerData } of content) {
                    const [{ attrs }] = innerData;
                    const jid = (0, WABinary_1.jidNormalizedUser)(attrs.jid);
                    const recp = info[jid] || { userJid: jid };
                    const date = +attrs.t;
                    switch (tag) {
                        case 'read':
                            recp.readTimestamp = date;
                            break;
                        case 'delivery':
                            recp.receiptTimestamp = date;
                            break;
                    }
                    info[jid] = recp;
                }
            }
            return Object.values(info);
        },
        downloadMediaMessage: async (message, type = 'buffer', options = {}) => {
            try {
                const result = await (0, Utils_1.downloadMediaMessage)(message, type, options);
                return result;
            }
            catch (error) {
                if (error.message.includes('404')) { // media needs to be updated
                    logger.info(`updating media of message: ${message.key.id}`);
                    await updateMediaMessage(message);
                    const result = await (0, Utils_1.downloadMediaMessage)(message, type, options);
                    return result;
                }
                throw error;
            }
        },
        updateMediaMessage,
        fetchMessagesFromWA,
        /** Load a single message specified by the ID */
        loadMessageFromWA: async (jid, id) => {
            // load the message before the given message
            let messages = (await fetchMessagesFromWA(jid, 1, { before: { id, fromMe: true } }));
            if (!messages[0]) {
                messages = (await fetchMessagesFromWA(jid, 1, { before: { id, fromMe: false } }));
            }
            // the message after the loaded message is the message required
            const [actual] = await fetchMessagesFromWA(jid, 1, { after: messages[0] && messages[0].key });
            return actual;
        },
        searchMessages: async (txt, inJid, count, page) => {
            var _a;
            const node = await query({
                json: {
                    tag: 'query',
                    attrs: {
                        epoch: currentEpoch().toString(),
                        type: 'search',
                        search: txt,
                        count: count.toString(),
                        page: page.toString(),
                        jid: inJid
                    }
                },
                binaryTag: [24, Types_1.WAFlag.ignore],
                expect200: true
            }); // encrypt and send  off
            return {
                last: ((_a = node.attrs) === null || _a === void 0 ? void 0 : _a.last) === 'true',
                messages: (0, WABinary_1.getBinaryNodeMessages)(node)
            };
        },
        sendMessage: async (jid, content, options = { waitForAck: true }) => {
            var _a, _b;
            const userJid = (_b = (_a = state.legacy) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
            if (typeof content === 'object' &&
                'disappearingMessagesInChat' in content &&
                typeof content['disappearingMessagesInChat'] !== 'undefined' &&
                (0, WABinary_1.isJidGroup)(jid)) {
                const { disappearingMessagesInChat } = content;
                const value = typeof disappearingMessagesInChat === 'boolean' ?
                    (disappearingMessagesInChat ? Defaults_1.WA_DEFAULT_EPHEMERAL : 0) :
                    disappearingMessagesInChat;
                const tag = generateMessageTag(true);
                await setQuery([
                    {
                        tag: 'group',
                        attrs: { id: tag, jid, type: 'prop', author: userJid },
                        content: [
                            { tag: 'ephemeral', attrs: { value: value.toString() } }
                        ]
                    }
                ]);
            }
            else {
                const msg = await (0, Utils_1.generateWAMessage)(jid, content, {
                    logger,
                    userJid: userJid,
                    getUrlInfo: generateUrlInfo,
                    upload: waUploadToServer,
                    mediaCache: config.mediaCache,
                    ...options,
                });
                await relayMessage(msg, { waitForAck: !!options.waitForAck });
                return msg;
            }
        }
    };
};
exports.default = makeMessagesSocket;
