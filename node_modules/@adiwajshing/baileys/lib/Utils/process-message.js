"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldIncrementChatUnread = exports.isRealMessage = exports.cleanMessage = void 0;
const WAProto_1 = require("../../WAProto");
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const WABinary_1 = require("../WABinary");
const MSG_MISSED_CALL_TYPES = new Set([
    Types_1.WAMessageStubType.CALL_MISSED_GROUP_VIDEO,
    Types_1.WAMessageStubType.CALL_MISSED_GROUP_VOICE,
    Types_1.WAMessageStubType.CALL_MISSED_VIDEO,
    Types_1.WAMessageStubType.CALL_MISSED_VOICE
]);
/** Cleans a received message to further processing */
const cleanMessage = (message, meId) => {
    // ensure remoteJid and participant doesn't have device or agent in it
    message.key.remoteJid = (0, WABinary_1.jidNormalizedUser)(message.key.remoteJid);
    message.key.participant = message.key.participant ? (0, WABinary_1.jidNormalizedUser)(message.key.participant) : undefined;
    const content = (0, Utils_1.normalizeMessageContent)(message.message);
    // if the message has a reaction, ensure fromMe & remoteJid are from our perspective
    if (content === null || content === void 0 ? void 0 : content.reactionMessage) {
        const msgKey = content.reactionMessage.key;
        // if the reaction is from another user
        // we've to correctly map the key to this user's perspective
        if (!message.key.fromMe) {
            // if the sender believed the message being reacted to is not from them
            // we've to correct the key to be from them, or some other participant
            msgKey.fromMe = !msgKey.fromMe
                ? (0, WABinary_1.areJidsSameUser)(msgKey.participant || msgKey.remoteJid, meId)
                // if the message being reacted to, was from them
                // fromMe automatically becomes false
                : false;
            // set the remoteJid to being the same as the chat the message came from
            msgKey.remoteJid = message.key.remoteJid;
            // set participant of the message
            msgKey.participant = msgKey.participant || message.key.participant;
        }
    }
};
exports.cleanMessage = cleanMessage;
const isRealMessage = (message) => {
    const normalizedContent = (0, Utils_1.normalizeMessageContent)(message.message);
    return (!!normalizedContent
        || MSG_MISSED_CALL_TYPES.has(message.messageStubType))
        && !(normalizedContent === null || normalizedContent === void 0 ? void 0 : normalizedContent.protocolMessage)
        && !(normalizedContent === null || normalizedContent === void 0 ? void 0 : normalizedContent.reactionMessage);
};
exports.isRealMessage = isRealMessage;
const shouldIncrementChatUnread = (message) => (!message.key.fromMe && !message.messageStubType);
exports.shouldIncrementChatUnread = shouldIncrementChatUnread;
const processMessage = async (message, { downloadHistory, ev, historyCache, recvChats, creds, keyStore, logger }) => {
    var _a, _b, _c, _d;
    const meId = creds.me.id;
    const { accountSettings } = creds;
    const chat = { id: (0, WABinary_1.jidNormalizedUser)(message.key.remoteJid) };
    if ((0, exports.isRealMessage)(message)) {
        chat.conversationTimestamp = (0, Utils_1.toNumber)(message.messageTimestamp);
        // only increment unread count if not CIPHERTEXT and from another person
        if ((0, exports.shouldIncrementChatUnread)(message)) {
            chat.unreadCount = (chat.unreadCount || 0) + 1;
        }
        if (accountSettings === null || accountSettings === void 0 ? void 0 : accountSettings.unarchiveChats) {
            chat.archive = false;
            chat.readOnly = false;
        }
    }
    const content = (0, Utils_1.normalizeMessageContent)(message.message);
    const protocolMsg = content === null || content === void 0 ? void 0 : content.protocolMessage;
    if (protocolMsg) {
        switch (protocolMsg.type) {
            case WAProto_1.proto.Message.ProtocolMessage.Type.HISTORY_SYNC_NOTIFICATION:
                const histNotification = protocolMsg.historySyncNotification;
                logger === null || logger === void 0 ? void 0 : logger.info({ histNotification, id: message.key.id }, 'got history notification');
                if (downloadHistory) {
                    const isLatest = historyCache.size === 0 && !((_a = creds.processedHistoryMessages) === null || _a === void 0 ? void 0 : _a.length);
                    const { chats, contacts, messages, didProcess } = await (0, Utils_1.downloadAndProcessHistorySyncNotification)(histNotification, historyCache, recvChats);
                    if (chats.length) {
                        ev.emit('chats.set', { chats, isLatest });
                    }
                    if (messages.length) {
                        ev.emit('messages.set', { messages, isLatest });
                    }
                    if (contacts.length) {
                        ev.emit('contacts.set', { contacts, isLatest });
                    }
                    if (didProcess) {
                        ev.emit('creds.update', {
                            processedHistoryMessages: [
                                ...(creds.processedHistoryMessages || []),
                                { key: message.key, messageTimestamp: message.messageTimestamp }
                            ]
                        });
                    }
                }
                break;
            case WAProto_1.proto.Message.ProtocolMessage.Type.APP_STATE_SYNC_KEY_SHARE:
                const keys = protocolMsg.appStateSyncKeyShare.keys;
                if (keys === null || keys === void 0 ? void 0 : keys.length) {
                    let newAppStateSyncKeyId = '';
                    await keyStore.transaction(async () => {
                        for (const { keyData, keyId } of keys) {
                            const strKeyId = Buffer.from(keyId.keyId).toString('base64');
                            logger === null || logger === void 0 ? void 0 : logger.info({ strKeyId }, 'injecting new app state sync key');
                            await keyStore.set({ 'app-state-sync-key': { [strKeyId]: keyData } });
                            newAppStateSyncKeyId = strKeyId;
                        }
                    });
                    ev.emit('creds.update', { myAppStateKeyId: newAppStateSyncKeyId });
                }
                else {
                    logger === null || logger === void 0 ? void 0 : logger.info({ protocolMsg }, 'recv app state sync with 0 keys');
                }
                break;
            case WAProto_1.proto.Message.ProtocolMessage.Type.REVOKE:
                ev.emit('messages.update', [
                    {
                        key: {
                            ...message.key,
                            id: protocolMsg.key.id
                        },
                        update: { message: null, messageStubType: Types_1.WAMessageStubType.REVOKE, key: message.key }
                    }
                ]);
                break;
            case WAProto_1.proto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING:
                Object.assign(chat, {
                    ephemeralSettingTimestamp: (0, Utils_1.toNumber)(message.messageTimestamp),
                    ephemeralExpiration: protocolMsg.ephemeralExpiration || null
                });
                break;
        }
    }
    else if (content === null || content === void 0 ? void 0 : content.reactionMessage) {
        const reaction = {
            ...content.reactionMessage,
            key: message.key,
        };
        ev.emit('messages.reaction', [{
                reaction,
                key: content.reactionMessage.key,
            }]);
    }
    else if (message.messageStubType) {
        const jid = message.key.remoteJid;
        //let actor = whatsappID (message.participant)
        let participants;
        const emitParticipantsUpdate = (action) => (ev.emit('group-participants.update', { id: jid, participants, action }));
        const emitGroupUpdate = (update) => {
            ev.emit('groups.update', [{ id: jid, ...update }]);
        };
        const participantsIncludesMe = () => participants.find(jid => (0, WABinary_1.areJidsSameUser)(meId, jid));
        switch (message.messageStubType) {
            case Types_1.WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
            case Types_1.WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
                participants = message.messageStubParameters || [];
                emitParticipantsUpdate('remove');
                // mark the chat read only if you left the group
                if (participantsIncludesMe()) {
                    chat.readOnly = true;
                }
                break;
            case Types_1.WAMessageStubType.GROUP_PARTICIPANT_ADD:
            case Types_1.WAMessageStubType.GROUP_PARTICIPANT_INVITE:
            case Types_1.WAMessageStubType.GROUP_PARTICIPANT_ADD_REQUEST_JOIN:
                participants = message.messageStubParameters || [];
                if (participantsIncludesMe()) {
                    chat.readOnly = false;
                }
                emitParticipantsUpdate('add');
                break;
            case Types_1.WAMessageStubType.GROUP_PARTICIPANT_DEMOTE:
                participants = message.messageStubParameters || [];
                emitParticipantsUpdate('demote');
                break;
            case Types_1.WAMessageStubType.GROUP_PARTICIPANT_PROMOTE:
                participants = message.messageStubParameters || [];
                emitParticipantsUpdate('promote');
                break;
            case Types_1.WAMessageStubType.GROUP_CHANGE_ANNOUNCE:
                const announceValue = (_b = message.messageStubParameters) === null || _b === void 0 ? void 0 : _b[0];
                emitGroupUpdate({ announce: announceValue === 'true' || announceValue === 'on' });
                break;
            case Types_1.WAMessageStubType.GROUP_CHANGE_RESTRICT:
                const restrictValue = (_c = message.messageStubParameters) === null || _c === void 0 ? void 0 : _c[0];
                emitGroupUpdate({ restrict: restrictValue === 'true' || restrictValue === 'on' });
                break;
            case Types_1.WAMessageStubType.GROUP_CHANGE_SUBJECT:
                const name = (_d = message.messageStubParameters) === null || _d === void 0 ? void 0 : _d[0];
                chat.name = name;
                emitGroupUpdate({ subject: name });
                break;
        }
    }
    if (Object.keys(chat).length > 1) {
        ev.emit('chats.update', [chat]);
    }
};
exports.default = processMessage;
