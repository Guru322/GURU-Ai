"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const generics_1 = require("../Utils/generics");
const WABinary_1 = require("../WABinary");
const auth_1 = __importDefault(require("./auth"));
const makeChatsSocket = (config) => {
    const { logger } = config;
    const sock = (0, auth_1.default)(config);
    const { ev, ws: socketEvents, currentEpoch, setQuery, query, sendNode, state } = sock;
    const chatsDebounceTimeout = (0, generics_1.debouncedTimeout)(10000, () => sendChatsQuery(1));
    const sendChatsQuery = (epoch) => (sendNode({
        json: {
            tag: 'query',
            attrs: { type: 'chat', epoch: epoch.toString() }
        },
        binaryTag: [Types_1.WAMetric.queryChat, Types_1.WAFlag.ignore]
    }));
    const profilePictureUrl = async (jid, timeoutMs) => {
        const response = await query({
            json: ['query', 'ProfilePicThumb', jid],
            expect200: false,
            requiresPhoneConnection: false,
            timeoutMs
        });
        return response.eurl;
    };
    const executeChatModification = (node) => {
        const { attrs: attributes } = node;
        const updateType = attributes.type;
        const jid = (0, WABinary_1.jidNormalizedUser)(attributes === null || attributes === void 0 ? void 0 : attributes.jid);
        switch (updateType) {
            case 'delete':
                ev.emit('chats.delete', [jid]);
                break;
            case 'clear':
                if (node.content) {
                    const ids = node.content.map(({ attrs }) => attrs.index);
                    ev.emit('messages.delete', { keys: ids.map(id => ({ id, remoteJid: jid })) });
                }
                else {
                    ev.emit('messages.delete', { jid, all: true });
                }
                break;
            case 'archive':
                ev.emit('chats.update', [{ id: jid, archive: true }]);
                break;
            case 'unarchive':
                ev.emit('chats.update', [{ id: jid, archive: false }]);
                break;
            case 'pin':
                ev.emit('chats.update', [{ id: jid, pin: attributes.pin ? +attributes.pin : null }]);
                break;
            case 'star':
            case 'unstar':
                const starred = updateType === 'star';
                const updates = node.content.map(({ attrs }) => ({
                    key: {
                        remoteJid: jid,
                        id: attrs.index,
                        fromMe: attrs.owner === 'true'
                    },
                    update: { starred }
                }));
                ev.emit('messages.update', updates);
                break;
            case 'mute':
                if (attributes.mute === '0') {
                    ev.emit('chats.update', [{ id: jid, mute: null }]);
                }
                else {
                    ev.emit('chats.update', [{ id: jid, mute: +attributes.mute }]);
                }
                break;
            default:
                logger.warn({ node }, 'received unrecognized chat update');
                break;
        }
    };
    const applyingPresenceUpdate = (update) => {
        const id = (0, WABinary_1.jidNormalizedUser)(update.id);
        const participant = (0, WABinary_1.jidNormalizedUser)(update.participant || update.id);
        const presence = {
            lastSeen: update.t ? +update.t : undefined,
            lastKnownPresence: update.type
        };
        return { id, presences: { [participant]: presence } };
    };
    const chatRead = async (fromMessage, count) => {
        await setQuery([
            {
                tag: 'read',
                attrs: {
                    jid: fromMessage.remoteJid,
                    count: count.toString(),
                    index: fromMessage.id,
                    owner: fromMessage.fromMe ? 'true' : 'false'
                }
            }
        ], [Types_1.WAMetric.read, Types_1.WAFlag.ignore]);
        if (config.emitOwnEvents) {
            ev.emit('chats.update', [{ id: fromMessage.remoteJid, unreadCount: count < 0 ? -1 : 0 }]);
        }
    };
    ev.on('connection.update', async ({ connection }) => {
        if (connection !== 'open') {
            return;
        }
        try {
            await Promise.all([
                sendNode({
                    json: { tag: 'query', attrs: { type: 'contacts', epoch: '1' } },
                    binaryTag: [Types_1.WAMetric.queryContact, Types_1.WAFlag.ignore]
                }),
                sendNode({
                    json: { tag: 'query', attrs: { type: 'status', epoch: '1' } },
                    binaryTag: [Types_1.WAMetric.queryStatus, Types_1.WAFlag.ignore]
                }),
                sendNode({
                    json: { tag: 'query', attrs: { type: 'quick_reply', epoch: '1' } },
                    binaryTag: [Types_1.WAMetric.queryQuickReply, Types_1.WAFlag.ignore]
                }),
                sendNode({
                    json: { tag: 'query', attrs: { type: 'label', epoch: '1' } },
                    binaryTag: [Types_1.WAMetric.queryLabel, Types_1.WAFlag.ignore]
                }),
                sendNode({
                    json: { tag: 'query', attrs: { type: 'emoji', epoch: '1' } },
                    binaryTag: [Types_1.WAMetric.queryEmoji, Types_1.WAFlag.ignore]
                }),
                sendNode({
                    json: {
                        tag: 'action',
                        attrs: { type: 'set', epoch: '1' },
                        content: [
                            { tag: 'presence', attrs: { type: 'available' } }
                        ]
                    },
                    binaryTag: [Types_1.WAMetric.presence, Types_1.WAFlag.available]
                })
            ]);
            chatsDebounceTimeout.start();
            logger.debug('sent init queries');
        }
        catch (error) {
            logger.error(`error in sending init queries: ${error}`);
        }
    });
    socketEvents.on('CB:response,type:chat', async ({ content: data }) => {
        chatsDebounceTimeout.cancel();
        if (Array.isArray(data)) {
            const contacts = [];
            const chats = data.map(({ attrs }) => {
                const id = (0, WABinary_1.jidNormalizedUser)(attrs.jid);
                if (attrs.name) {
                    contacts.push({ id, name: attrs.name });
                }
                return {
                    id: (0, WABinary_1.jidNormalizedUser)(attrs.jid),
                    conversationTimestamp: attrs.t ? +attrs.t : undefined,
                    unreadCount: +attrs.count,
                    archive: attrs.archive === 'true' ? true : undefined,
                    pin: attrs.pin ? +attrs.pin : undefined,
                    mute: attrs.mute ? +attrs.mute : undefined,
                    notSpam: !(attrs.spam === 'true'),
                    name: attrs.name,
                    ephemeralExpiration: attrs.ephemeral ? +attrs.ephemeral : undefined,
                    ephemeralSettingTimestamp: attrs.eph_setting_ts ? +attrs.eph_setting_ts : undefined,
                    readOnly: attrs.read_only === 'true' ? true : undefined,
                };
            });
            logger.info(`got ${chats.length} chats, extracted ${contacts.length} contacts with name`);
            ev.emit('chats.set', { chats, isLatest: true });
        }
    });
    // got all contacts from phone
    socketEvents.on('CB:response,type:contacts', async ({ content: data }) => {
        if (Array.isArray(data)) {
            const contacts = data.map(({ attrs }) => {
                return {
                    id: (0, WABinary_1.jidNormalizedUser)(attrs.jid),
                    name: attrs.name,
                    notify: attrs.notify,
                    verifiedName: attrs.verify === '2' ? attrs.vname : undefined
                };
            });
            logger.info(`got ${contacts.length} contacts`);
            ev.emit('contacts.set', { contacts, isLatest: true });
        }
    });
    // status updates
    socketEvents.on('CB:Status,status', json => {
        const id = (0, WABinary_1.jidNormalizedUser)(json[1].id);
        ev.emit('contacts.update', [{ id, status: json[1].status }]);
    });
    // User Profile Name Updates
    socketEvents.on('CB:Conn,pushname', json => {
        const { legacy, connection } = state;
        const { user } = legacy;
        if (connection === 'open' && json[1].pushname !== user.name) {
            user.name = json[1].pushname;
            ev.emit('connection.update', { legacy: { ...legacy, user } });
        }
    });
    // read updates
    socketEvents.on('CB:action,,read', async ({ content }) => {
        if (Array.isArray(content)) {
            const { attrs } = content[0];
            const update = {
                id: (0, WABinary_1.jidNormalizedUser)(attrs.jid)
            };
            if (attrs.type === 'false') {
                update.unreadCount = -1;
            }
            else {
                update.unreadCount = 0;
            }
            ev.emit('chats.update', [update]);
        }
    });
    socketEvents.on('CB:Cmd,type:picture', async (json) => {
        json = json[1];
        const id = (0, WABinary_1.jidNormalizedUser)(json.jid);
        const imgUrl = await profilePictureUrl(id).catch(() => '');
        ev.emit('contacts.update', [{ id, imgUrl }]);
    });
    // chat archive, pin etc.
    socketEvents.on('CB:action,,chat', ({ content }) => {
        if (Array.isArray(content)) {
            const [node] = content;
            executeChatModification(node);
        }
    });
    socketEvents.on('CB:action,,user', (json) => {
        if (Array.isArray(json.content)) {
            const user = json.content[0].attrs;
            if (user.id) {
                user.id = (0, WABinary_1.jidNormalizedUser)(user.id);
                //ev.emit('contacts.upsert', [user])
            }
            else {
                logger.warn({ json }, 'recv unknown action');
            }
        }
    });
    // presence updates
    socketEvents.on('CB:Presence', json => {
        const update = applyingPresenceUpdate(json[1]);
        ev.emit('presence.update', update);
    });
    // blocklist updates
    socketEvents.on('CB:Blocklist', json => {
        json = json[1];
        const blocklist = json.blocklist;
        ev.emit('blocklist.set', { blocklist });
    });
    socketEvents.on('ws-close', () => {
        chatsDebounceTimeout.cancel();
    });
    return {
        ...sock,
        sendChatsQuery,
        profilePictureUrl,
        chatRead,
        /**
         * Modify a given chat (archive, pin etc.)
         * @param jid the ID of the person/group you are modifiying
         */
        chatModify: async (modification, jid, chatInfo, timestampNow) => {
            const chatAttrs = { jid: jid };
            let data = undefined;
            timestampNow = timestampNow || (0, generics_1.unixTimestampSeconds)();
            const getIndexKey = (list) => {
                var _a, _b, _c;
                if (Array.isArray(list)) {
                    return list[list.length - 1].key;
                }
                return (_c = (_a = list.messages) === null || _a === void 0 ? void 0 : _a[((_b = list.messages) === null || _b === void 0 ? void 0 : _b.length) - 1]) === null || _c === void 0 ? void 0 : _c.key;
            };
            if ('archive' in modification) {
                chatAttrs.type = modification.archive ? 'archive' : 'unarchive';
            }
            else if ('pin' in modification) {
                chatAttrs.type = 'pin';
                if (modification.pin) {
                    chatAttrs.pin = timestampNow.toString();
                }
                else {
                    chatAttrs.previous = chatInfo.pin.toString();
                }
            }
            else if ('mute' in modification) {
                chatAttrs.type = 'mute';
                if (modification.mute) {
                    chatAttrs.mute = (timestampNow + modification.mute).toString();
                }
                else {
                    chatAttrs.previous = chatInfo.mute.toString();
                }
            }
            else if ('clear' in modification) {
                chatAttrs.type = 'clear';
                chatAttrs.modify_tag = Math.round(Math.random() * 1000000).toString();
                if (modification.clear !== 'all') {
                    data = modification.clear.messages.map(({ id, fromMe }) => ({
                        tag: 'item',
                        attrs: { owner: (!!fromMe).toString(), index: id }
                    }));
                }
            }
            else if ('star' in modification) {
                chatAttrs.type = modification.star.star ? 'star' : 'unstar';
                data = modification.star.messages.map(({ id, fromMe }) => ({
                    tag: 'item',
                    attrs: { owner: (!!fromMe).toString(), index: id }
                }));
            }
            else if ('markRead' in modification) {
                const indexKey = getIndexKey(modification.lastMessages);
                return chatRead(indexKey, modification.markRead ? 0 : -1);
            }
            else if ('delete' in modification) {
                chatAttrs.type = 'delete';
            }
            if ('lastMessages' in modification) {
                const indexKey = getIndexKey(modification.lastMessages);
                if (indexKey) {
                    chatAttrs.index = indexKey.id;
                    chatAttrs.owner = indexKey.fromMe ? 'true' : 'false';
                }
            }
            const node = { tag: 'chat', attrs: chatAttrs, content: data };
            const response = await setQuery([node], [Types_1.WAMetric.chat, Types_1.WAFlag.ignore]);
            if (config.emitOwnEvents) {
                // apply it and emit events
                executeChatModification(node);
            }
            return response;
        },
        /**
         * Query whether a given number is registered on WhatsApp
         * @param str phone number/jid you want to check for
         * @returns undefined if the number doesn't exists, otherwise the correctly formatted jid
         */
        onWhatsApp: async (str) => {
            const { status, jid, biz } = await query({
                json: ['query', 'exist', str],
                requiresPhoneConnection: false
            });
            if (status === 200) {
                return {
                    exists: true,
                    jid: (0, WABinary_1.jidNormalizedUser)(jid),
                    isBusiness: biz
                };
            }
        },
        /**
         * Tell someone about your presence -- online, typing, offline etc.
         * @param jid the ID of the person/group who you are updating
         * @param type your presence
         */
        sendPresenceUpdate: (type, toJid) => (sendNode({
            binaryTag: [Types_1.WAMetric.presence, Types_1.WAFlag[type]],
            json: {
                tag: 'action',
                attrs: { epoch: currentEpoch().toString(), type: 'set' },
                content: [
                    {
                        tag: 'presence',
                        attrs: { type: type, to: toJid }
                    }
                ]
            }
        })),
        /**
         * Request updates on the presence of a user
         * this returns nothing, you'll receive updates in chats.update event
         * */
        presenceSubscribe: async (jid) => (sendNode({ json: ['action', 'presence', 'subscribe', jid] })),
        /** Query the status of the person (see groupMetadata() for groups) */
        getStatus: async (jid) => {
            const status = await query({ json: ['query', 'Status', jid], requiresPhoneConnection: false });
            return status;
        },
        setStatus: async (status) => {
            const response = await setQuery([
                {
                    tag: 'status',
                    attrs: {},
                    content: Buffer.from(status, 'utf-8')
                }
            ]);
            ev.emit('contacts.update', [{ id: state.legacy.user.id, status }]);
            return response;
        },
        /** Updates business profile. */
        updateBusinessProfile: async (profile) => {
            var _a;
            if ((_a = profile.business_hours) === null || _a === void 0 ? void 0 : _a.config) {
                profile.business_hours.business_config = profile.business_hours.config;
                delete profile.business_hours.config;
            }
            const json = ['action', 'editBusinessProfile', { ...profile, v: 2 }];
            await query({ json, expect200: true, requiresPhoneConnection: true });
        },
        updateProfileName: async (name) => {
            const response = (await setQuery([
                {
                    tag: 'profile',
                    attrs: { name }
                }
            ]));
            if (config.emitOwnEvents) {
                const user = { ...state.legacy.user, name };
                ev.emit('connection.update', { legacy: {
                        ...state.legacy, user
                    } });
                ev.emit('contacts.update', [{ id: user.id, name }]);
            }
            return response;
        },
        /**
         * Update the profile picture
         * @param jid
         * @param img
         */
        async updateProfilePicture(jid, imgBuffer) {
            var _a;
            jid = (0, WABinary_1.jidNormalizedUser)(jid);
            const { img } = await (0, Utils_1.generateProfilePicture)(imgBuffer);
            const tag = this.generateMessageTag();
            const query = {
                tag: 'picture',
                attrs: { jid: jid, id: tag, type: 'set' },
                content: [
                    { tag: 'image', attrs: {}, content: img },
                    { tag: 'preview', attrs: {}, content: img }
                ]
            };
            const user = (_a = state.legacy) === null || _a === void 0 ? void 0 : _a.user;
            const { eurl } = await this.setQuery([query], [Types_1.WAMetric.picture, 136], tag);
            if (config.emitOwnEvents) {
                if (jid === (user === null || user === void 0 ? void 0 : user.id)) {
                    user.imgUrl = eurl;
                    ev.emit('connection.update', {
                        legacy: {
                            ...state.legacy,
                            user
                        }
                    });
                }
                ev.emit('contacts.update', [{ id: jid, imgUrl: eurl }]);
            }
        },
        /**
         * Add or remove user from blocklist
         * @param jid the ID of the person who you are blocking/unblocking
         * @param type type of operation
         */
        blockUser: async (jid, type = 'add') => {
            const json = {
                tag: 'block',
                attrs: { type },
                content: [{ tag: 'user', attrs: { jid } }]
            };
            await setQuery([json], [Types_1.WAMetric.block, Types_1.WAFlag.ignore]);
            if (config.emitOwnEvents) {
                ev.emit('blocklist.update', { blocklist: [jid], type });
            }
        },
        /**
         * Query Business Profile (Useful for VCards)
         * @param jid Business Jid
         * @returns profile object or undefined if not business account
         */
        getBusinessProfile: async (jid) => {
            jid = (0, WABinary_1.jidNormalizedUser)(jid);
            const { profiles: [{ profile, wid }] } = await query({
                json: [
                    'query', 'businessProfile',
                    [{ 'wid': jid.replace('@s.whatsapp.net', '@c.us') }],
                    84
                ],
                expect200: true,
                requiresPhoneConnection: false,
            });
            return {
                ...profile,
                wid: (0, WABinary_1.jidNormalizedUser)(wid)
            };
        }
    };
};
exports.default = makeChatsSocket;
