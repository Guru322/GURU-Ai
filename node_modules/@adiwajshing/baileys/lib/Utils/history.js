"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHistoryMsg = exports.downloadAndProcessHistorySyncNotification = exports.processHistoryMessage = exports.downloadHistory = void 0;
const util_1 = require("util");
const zlib_1 = require("zlib");
const WAProto_1 = require("../../WAProto");
const WABinary_1 = require("../WABinary");
const generics_1 = require("./generics");
const messages_1 = require("./messages");
const messages_media_1 = require("./messages-media");
const inflatePromise = (0, util_1.promisify)(zlib_1.inflate);
const downloadHistory = async (msg) => {
    const stream = await (0, messages_media_1.downloadContentFromMessage)(msg, 'history');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    // decompress buffer
    buffer = await inflatePromise(buffer);
    const syncData = WAProto_1.proto.HistorySync.decode(buffer);
    return syncData;
};
exports.downloadHistory = downloadHistory;
const processHistoryMessage = (item, historyCache, recvChats) => {
    const messages = [];
    const contacts = [];
    const chats = [];
    switch (item.syncType) {
        case WAProto_1.proto.HistorySync.HistorySyncType.INITIAL_BOOTSTRAP:
        case WAProto_1.proto.HistorySync.HistorySyncType.RECENT:
            for (const chat of item.conversations) {
                const contactId = `c:${chat.id}`;
                if (chat.name && !historyCache.has(contactId)) {
                    contacts.push({ id: chat.id, name: chat.name });
                    historyCache.add(contactId);
                }
                const msgs = chat.messages || [];
                for (const item of msgs) {
                    const message = item.message;
                    const uqId = `${message.key.remoteJid}:${message.key.id}`;
                    if (!historyCache.has(uqId)) {
                        messages.push(message);
                        const curItem = recvChats[message.key.remoteJid];
                        const timestamp = (0, generics_1.toNumber)(message.messageTimestamp);
                        if (!message.key.fromMe && (!curItem || timestamp > curItem.lastMsgRecvTimestamp)) {
                            recvChats[chat.id] = { lastMsgRecvTimestamp: timestamp };
                            // keep only the most recent message in the chat array
                            chat.messages = [{ message }];
                        }
                        historyCache.add(uqId);
                    }
                }
                if (!historyCache.has(chat.id)) {
                    if ((0, WABinary_1.isJidUser)(chat.id) && chat.readOnly && chat.archived) {
                        chat.readOnly = false;
                    }
                    chats.push(chat);
                    historyCache.add(chat.id);
                }
            }
            break;
        case WAProto_1.proto.HistorySync.HistorySyncType.PUSH_NAME:
            for (const c of item.pushnames) {
                const contactId = `c:${c.id}`;
                if (!historyCache.has(contactId)) {
                    contacts.push({ notify: c.pushname, id: c.id });
                    historyCache.add(contactId);
                }
            }
            break;
        case WAProto_1.proto.HistorySync.HistorySyncType.INITIAL_STATUS_V3:
            // TODO
            break;
    }
    const didProcess = !!(chats.length || messages.length || contacts.length);
    return {
        chats,
        contacts,
        messages,
        didProcess,
    };
};
exports.processHistoryMessage = processHistoryMessage;
const downloadAndProcessHistorySyncNotification = async (msg, historyCache, recvChats) => {
    const historyMsg = await (0, exports.downloadHistory)(msg);
    return (0, exports.processHistoryMessage)(historyMsg, historyCache, recvChats);
};
exports.downloadAndProcessHistorySyncNotification = downloadAndProcessHistorySyncNotification;
const isHistoryMsg = (message) => {
    var _a;
    const normalizedContent = !!message ? (0, messages_1.normalizeMessageContent)(message) : undefined;
    const isAnyHistoryMsg = !!((_a = normalizedContent === null || normalizedContent === void 0 ? void 0 : normalizedContent.protocolMessage) === null || _a === void 0 ? void 0 : _a.historySyncNotification);
    return isAnyHistoryMsg;
};
exports.isHistoryMsg = isHistoryMsg;
