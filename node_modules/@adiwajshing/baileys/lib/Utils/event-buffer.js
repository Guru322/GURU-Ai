"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEventBuffer = void 0;
const events_1 = __importDefault(require("events"));
const Types_1 = require("../Types");
const messages_1 = require("./messages");
const process_message_1 = require("./process-message");
const BUFFERABLE_EVENT = [
    'chats.upsert',
    'chats.update',
    'chats.delete',
    'contacts.upsert',
    'contacts.update',
    'messages.upsert',
    'messages.update',
    'messages.delete',
    'messages.reaction',
    'message-receipt.update',
    'groups.update',
];
const BUFFERABLE_EVENT_SET = new Set(BUFFERABLE_EVENT);
/**
 * The event buffer logically consolidates different events into a single event
 * making the data processing more efficient.
 * @param ev the baileys event emitter
 */
const makeEventBuffer = (logger) => {
    const ev = new events_1.default();
    let data = makeBufferData();
    let isBuffering = false;
    let preBufferTask = Promise.resolve();
    // take the generic event and fire it as a baileys event
    ev.on('event', (map) => {
        for (const event in map) {
            ev.emit(event, map[event]);
        }
    });
    function buffer() {
        if (!isBuffering) {
            logger.trace('buffering events');
            isBuffering = true;
            return true;
        }
        return false;
    }
    async function flush() {
        if (!isBuffering) {
            return;
        }
        logger.trace('releasing buffered events...');
        await preBufferTask;
        isBuffering = false;
        const consolidatedData = consolidateEvents(data);
        if (Object.keys(consolidatedData).length) {
            ev.emit('event', consolidatedData);
        }
        data = makeBufferData();
        logger.trace('released buffered events');
    }
    return {
        process(handler) {
            const listener = (map) => {
                handler(map);
            };
            ev.on('event', listener);
            return () => {
                ev.off('event', listener);
            };
        },
        emit(event, evData) {
            if (isBuffering && BUFFERABLE_EVENT_SET.has(event)) {
                append(data, event, evData, logger);
                return true;
            }
            return ev.emit('event', { [event]: evData });
        },
        processInBuffer(task) {
            if (isBuffering) {
                preBufferTask = Promise.allSettled([preBufferTask, task]);
            }
        },
        buffer,
        flush,
        createBufferedFunction(work) {
            return async (...args) => {
                const started = buffer();
                try {
                    const result = await work(...args);
                    return result;
                }
                finally {
                    if (started) {
                        await flush();
                    }
                }
            };
        },
        on: (...args) => ev.on(...args),
        off: (...args) => ev.off(...args),
        removeAllListeners: (...args) => ev.removeAllListeners(...args),
    };
};
exports.makeEventBuffer = makeEventBuffer;
const makeBufferData = () => {
    return {
        chatUpserts: {},
        chatUpdates: {},
        chatDeletes: new Set(),
        contactUpserts: {},
        contactUpdates: {},
        messageUpserts: {},
        messageUpdates: {},
        messageReactions: {},
        messageDeletes: {},
        messageReceipts: {},
        groupUpdates: {}
    };
};
function append(data, event, eventData, logger) {
    switch (event) {
        case 'chats.upsert':
            for (const chat of eventData) {
                let upsert = data.chatUpserts[chat.id] || {};
                upsert = concatChats(upsert, chat);
                if (data.chatUpdates[chat.id]) {
                    logger.debug({ chatId: chat.id }, 'absorbed chat update in chat upsert');
                    upsert = concatChats(data.chatUpdates[chat.id], upsert);
                    delete data.chatUpdates[chat.id];
                }
                if (data.chatDeletes.has(chat.id)) {
                    data.chatDeletes.delete(chat.id);
                }
                data.chatUpserts[chat.id] = upsert;
            }
            break;
        case 'chats.update':
            for (const update of eventData) {
                const chatId = update.id;
                // if there is an existing upsert, merge the update into it
                const upsert = data.chatUpserts[chatId];
                if (upsert) {
                    concatChats(upsert, update);
                }
                else {
                    // merge the update into the existing update
                    const chatUpdate = data.chatUpdates[chatId] || {};
                    data.chatUpdates[chatId] = concatChats(chatUpdate, update);
                }
                // if the chat has been updated
                // ignore any existing chat delete
                if (data.chatDeletes.has(chatId)) {
                    data.chatDeletes.delete(chatId);
                }
            }
            break;
        case 'chats.delete':
            for (const chatId of eventData) {
                data.chatDeletes.add(chatId);
                // remove any prior updates & upserts
                if (data.chatUpdates[chatId]) {
                    delete data.chatUpdates[chatId];
                }
                if (data.chatUpserts[chatId]) {
                    delete data.chatUpserts[chatId];
                }
            }
            break;
        case 'contacts.upsert':
            for (const contact of eventData) {
                let upsert = data.contactUpserts[contact.id] || {};
                upsert = Object.assign(upsert, contact);
                if (data.contactUpdates[contact.id]) {
                    upsert = Object.assign(data.contactUpdates[contact.id], upsert);
                    delete data.contactUpdates[contact.id];
                }
                data.contactUpserts[contact.id] = upsert;
            }
            break;
        case 'contacts.update':
            const contactUpdates = eventData;
            for (const update of contactUpdates) {
                const id = update.id;
                // merge into prior upsert
                const upsert = data.contactUpserts[update.id];
                if (upsert) {
                    Object.assign(upsert, update);
                }
                else {
                    // merge into prior update
                    const contactUpdate = data.contactUpdates[id] || {};
                    data.contactUpdates[id] = Object.assign(contactUpdate, update);
                }
            }
            break;
        case 'messages.upsert':
            const { messages, type } = eventData;
            for (const message of messages) {
                const key = stringifyMessageKey(message.key);
                const existing = data.messageUpserts[key];
                if (existing) {
                    message.messageTimestamp = existing.message.messageTimestamp;
                }
                if (data.messageUpdates[key]) {
                    logger.debug('absorbed prior message update in message upsert');
                    Object.assign(message, data.messageUpdates[key].update);
                    delete data.messageUpdates[key];
                }
                data.messageUpserts[key] = {
                    message,
                    type: type === 'notify' || (existing === null || existing === void 0 ? void 0 : existing.type) === 'notify'
                        ? 'notify'
                        : type
                };
            }
            break;
        case 'messages.update':
            const msgUpdates = eventData;
            for (const { key, update } of msgUpdates) {
                const keyStr = stringifyMessageKey(key);
                const existing = data.messageUpserts[keyStr];
                if (existing) {
                    Object.assign(existing.message, update);
                    // if the message was received & read by us
                    // the chat counter must have been incremented
                    // so we need to decrement it
                    if (update.status === Types_1.WAMessageStatus.READ && !key.fromMe) {
                        decrementChatReadCounterIfMsgDidUnread(existing.message);
                    }
                }
                else {
                    const msgUpdate = data.messageUpdates[keyStr] || { key, update: {} };
                    Object.assign(msgUpdate.update, update);
                    data.messageUpdates[keyStr] = msgUpdate;
                }
            }
            break;
        case 'messages.delete':
            const deleteData = eventData;
            if ('keys' in deleteData) {
                const { keys } = deleteData;
                for (const key of keys) {
                    const keyStr = stringifyMessageKey(key);
                    data.messageDeletes[keyStr] = key;
                    if (data.messageUpserts[keyStr]) {
                        delete data.messageUpserts[keyStr];
                    }
                    if (data.messageUpdates[keyStr]) {
                        delete data.messageUpdates[keyStr];
                    }
                }
            }
            else {
                // TODO: add support
            }
            break;
        case 'messages.reaction':
            const reactions = eventData;
            for (const { key, reaction } of reactions) {
                const keyStr = stringifyMessageKey(key);
                const existing = data.messageUpserts[keyStr];
                if (existing) {
                    (0, messages_1.updateMessageWithReaction)(existing.message, reaction);
                }
                else {
                    data.messageReactions[keyStr] = data.messageReactions[keyStr]
                        || { key, reactions: [] };
                    (0, messages_1.updateMessageWithReaction)(data.messageReactions[keyStr], reaction);
                }
            }
            break;
        case 'message-receipt.update':
            const receipts = eventData;
            for (const { key, receipt } of receipts) {
                const keyStr = stringifyMessageKey(key);
                const existing = data.messageUpserts[keyStr];
                if (existing) {
                    (0, messages_1.updateMessageWithReceipt)(existing.message, receipt);
                }
                else {
                    data.messageReceipts[keyStr] = data.messageReceipts[keyStr]
                        || { key, userReceipt: [] };
                    (0, messages_1.updateMessageWithReceipt)(data.messageReceipts[keyStr], receipt);
                }
            }
            break;
        case 'groups.update':
            const groupUpdates = eventData;
            for (const update of groupUpdates) {
                const id = update.id;
                const groupUpdate = data.groupUpdates[id] || {};
                data.groupUpdates[id] = Object.assign(groupUpdate, update);
            }
            break;
        default:
            throw new Error(`"${event}" cannot be buffered`);
    }
    function decrementChatReadCounterIfMsgDidUnread(message) {
        // decrement chat unread counter
        // if the message has already been marked read by us
        const chatId = message.key.remoteJid;
        const chat = data.chatUpdates[chatId] || data.chatUpserts[chatId];
        if ((0, process_message_1.isRealMessage)(message)
            && (0, process_message_1.shouldIncrementChatUnread)(message)
            && typeof (chat === null || chat === void 0 ? void 0 : chat.unreadCount) === 'number'
            && chat.unreadCount > 0) {
            logger.debug({ chatId: chat.id }, 'decrementing chat counter');
            chat.unreadCount -= 1;
            if (chat.unreadCount === 0) {
                delete chat.unreadCount;
            }
        }
    }
}
function consolidateEvents(data) {
    const map = {};
    const chatUpsertList = Object.values(data.chatUpserts);
    if (chatUpsertList.length) {
        map['chats.upsert'] = chatUpsertList;
    }
    const chatUpdateList = Object.values(data.chatUpdates);
    if (chatUpdateList.length) {
        map['chats.update'] = chatUpdateList;
    }
    const chatDeleteList = Array.from(data.chatDeletes);
    if (chatDeleteList.length) {
        map['chats.delete'] = chatDeleteList;
    }
    const messageUpsertList = Object.values(data.messageUpserts);
    if (messageUpsertList.length) {
        const type = messageUpsertList[0].type;
        map['messages.upsert'] = {
            messages: messageUpsertList.map(m => m.message),
            type
        };
    }
    const messageUpdateList = Object.values(data.messageUpdates);
    if (messageUpdateList.length) {
        map['messages.update'] = messageUpdateList;
    }
    const messageDeleteList = Object.values(data.messageDeletes);
    if (messageDeleteList.length) {
        map['messages.delete'] = { keys: messageDeleteList };
    }
    const messageReactionList = Object.values(data.messageReactions).flatMap(({ key, reactions }) => reactions.flatMap(reaction => ({ key, reaction })));
    if (messageReactionList.length) {
        map['messages.reaction'] = messageReactionList;
    }
    const messageReceiptList = Object.values(data.messageReceipts).flatMap(({ key, userReceipt }) => userReceipt.flatMap(receipt => ({ key, receipt })));
    if (messageReceiptList.length) {
        map['message-receipt.update'] = messageReceiptList;
    }
    const contactUpsertList = Object.values(data.contactUpserts);
    if (contactUpsertList.length) {
        map['contacts.upsert'] = contactUpsertList;
    }
    const contactUpdateList = Object.values(data.contactUpdates);
    if (contactUpdateList.length) {
        map['contacts.update'] = contactUpdateList;
    }
    const groupUpdateList = Object.values(data.groupUpdates);
    if (groupUpdateList.length) {
        map['groups.update'] = groupUpdateList;
    }
    return map;
}
function concatChats(a, b) {
    if (b.unreadCount === null) {
        // neutralize unread counter
        if (a.unreadCount < 0) {
            a.unreadCount = undefined;
            b.unreadCount = undefined;
        }
    }
    if (typeof a.unreadCount === 'number' && typeof b.unreadCount === 'number') {
        b = { ...b };
        if (b.unreadCount >= 0) {
            b.unreadCount = Math.max(b.unreadCount, 0) + Math.max(a.unreadCount, 0);
        }
    }
    return Object.assign(a, b);
}
const stringifyMessageKey = (key) => `${key.remoteJid},${key.id},${key.fromMe ? '1' : '0'}`;
