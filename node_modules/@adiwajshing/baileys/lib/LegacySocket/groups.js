"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const generics_1 = require("../Utils/generics");
const WABinary_1 = require("../WABinary");
const messages_1 = __importDefault(require("./messages"));
const makeGroupsSocket = (config) => {
    const { logger } = config;
    const sock = (0, messages_1.default)(config);
    const { ev, ws: socketEvents, query, generateMessageTag, currentEpoch, setQuery, state } = sock;
    /** Generic function for group queries */
    const groupQuery = async (type, jid, subject, participants, additionalNodes) => {
        var _a, _b;
        const tag = generateMessageTag();
        const result = await setQuery([
            {
                tag: 'group',
                attrs: {
                    author: (_b = (_a = state.legacy) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id,
                    id: tag,
                    type: type,
                    jid: jid,
                    subject: subject,
                },
                content: participants ?
                    participants.map(jid => ({ tag: 'participant', attrs: { jid } })) :
                    additionalNodes
            }
        ], [Types_1.WAMetric.group, 136], tag);
        return result;
    };
    /** Get the metadata of the group from WA */
    const groupMetadataFull = async (jid) => {
        const metadata = await query({
            json: ['query', 'GroupMetadata', jid],
            expect200: true
        });
        const meta = {
            id: metadata.id,
            subject: metadata.subject,
            creation: +metadata.creation,
            owner: metadata.owner ? (0, WABinary_1.jidNormalizedUser)(metadata.owner) : undefined,
            desc: metadata.desc,
            descOwner: metadata.descOwner,
            participants: metadata.participants.map(p => ({
                id: (0, WABinary_1.jidNormalizedUser)(p.id),
                admin: p.isSuperAdmin ? 'super-admin' : p.isAdmin ? 'admin' : undefined
            })),
            ephemeralDuration: metadata.ephemeralDuration
        };
        return meta;
    };
    /** Get the metadata (works after you've left the group also) */
    const groupMetadataMinimal = async (jid) => {
        const { attrs, content } = await query({
            json: {
                tag: 'query',
                attrs: { type: 'group', jid: jid, epoch: currentEpoch().toString() }
            },
            binaryTag: [Types_1.WAMetric.group, Types_1.WAFlag.ignore],
            expect200: true
        });
        const participants = [];
        let desc;
        if (Array.isArray(content) && Array.isArray(content[0].content)) {
            const nodes = content[0].content;
            for (const item of nodes) {
                if (item.tag === 'participant') {
                    participants.push({
                        id: item.attrs.jid,
                        isAdmin: item.attrs.type === 'admin',
                        isSuperAdmin: false
                    });
                }
                else if (item.tag === 'description') {
                    desc = item.content.toString('utf-8');
                }
            }
        }
        const meta = {
            id: jid,
            owner: attrs === null || attrs === void 0 ? void 0 : attrs.creator,
            creation: +(attrs === null || attrs === void 0 ? void 0 : attrs.create),
            subject: '',
            desc,
            participants
        };
        return meta;
    };
    socketEvents.on('CB:Chat,cmd:action', () => {
        /*const data = json[1].data
        if (data) {
            const emitGroupParticipantsUpdate = (action: WAParticipantAction) => this.emitParticipantsUpdate
            (json[1].id, data[2].participants.map(whatsappID), action)
            const emitGroupUpdate = (data: Partial<WAGroupMetadata>) => this.emitGroupUpdate(json[1].id, data)

            switch (data[0]) {
                case "promote":
                    emitGroupParticipantsUpdate('promote')
                    break
                case "demote":
                    emitGroupParticipantsUpdate('demote')
                    break
                case "desc_add":
                    emitGroupUpdate({ ...data[2], descOwner: data[1] })
                    break
                default:
                    this.logger.debug({ unhandled: true }, json)
                    break
            }
        }*/
    });
    return {
        ...sock,
        groupMetadata: async (jid, minimal) => {
            let result;
            if (minimal) {
                result = await groupMetadataMinimal(jid);
            }
            else {
                result = await groupMetadataFull(jid);
            }
            return result;
        },
        /**
         * Create a group
         * @param title like, the title of the group
         * @param participants people to include in the group
         */
        groupCreate: async (title, participants) => {
            const response = await groupQuery('create', undefined, title, participants);
            const gid = response.gid;
            let metadata;
            try {
                metadata = await groupMetadataFull(gid);
            }
            catch (error) {
                logger.warn(`error in group creation: ${error}, switching gid & checking`);
                // if metadata is not available
                const comps = gid.replace('@g.us', '').split('-');
                response.gid = `${comps[0]}-${+comps[1] + 1}@g.us`;
                metadata = await groupMetadataFull(gid);
                logger.warn(`group ID switched from ${gid} to ${response.gid}`);
            }
            ev.emit('chats.upsert', [
                {
                    id: response.gid,
                    name: title,
                    conversationTimestamp: (0, generics_1.unixTimestampSeconds)(),
                    unreadCount: 0
                }
            ]);
            return metadata;
        },
        /**
         * Leave a group
         * @param jid the ID of the group
         */
        groupLeave: async (id) => {
            await groupQuery('leave', id);
            ev.emit('chats.update', [{ id, readOnly: true }]);
        },
        /**
         * Update the subject of the group
         * @param {string} jid the ID of the group
         * @param {string} title the new title of the group
         */
        groupUpdateSubject: async (id, title) => {
            await groupQuery('subject', id, title);
            ev.emit('chats.update', [{ id, name: title }]);
            ev.emit('contacts.update', [{ id, name: title }]);
            ev.emit('groups.update', [{ id: id, subject: title }]);
        },
        /**
         * Update the group description
         * @param {string} jid the ID of the group
         * @param {string} title the new title of the group
         */
        groupUpdateDescription: async (jid, description) => {
            const metadata = await groupMetadataFull(jid);
            const node = {
                tag: 'description',
                attrs: { id: (0, generics_1.generateMessageID)(), prev: metadata === null || metadata === void 0 ? void 0 : metadata.descId },
                content: Buffer.from(description, 'utf-8')
            };
            const response = await groupQuery('description', jid, undefined, undefined, [node]);
            ev.emit('groups.update', [{ id: jid, desc: description }]);
            return response;
        },
        /**
         * Update participants in the group
         * @param jid the ID of the group
         * @param participants the people to add
         */
        groupParticipantsUpdate: async (id, participants, action) => {
            const result = await groupQuery(action, id, undefined, participants);
            const jids = Object.keys(result.participants || {});
            ev.emit('group-participants.update', { id, participants: jids, action });
            return Object.keys(result.participants || {}).map(jid => { var _a; return ({ jid, status: (_a = result.participants) === null || _a === void 0 ? void 0 : _a[jid] }); });
        },
        /** Query broadcast list info */
        getBroadcastListInfo: async (jid) => {
            var _a, _b;
            const result = await query({
                json: ['query', 'contact', jid],
                expect200: true,
                requiresPhoneConnection: true
            });
            const metadata = {
                subject: result.name,
                id: jid,
                owner: (_b = (_a = state.legacy) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id,
                participants: result.recipients.map(({ id }) => ({ id: (0, WABinary_1.jidNormalizedUser)(id), isAdmin: false, isSuperAdmin: false }))
            };
            return metadata;
        },
        groupInviteCode: async (jid) => {
            const response = await sock.query({
                json: ['query', 'inviteCode', jid],
                expect200: true,
                requiresPhoneConnection: false
            });
            return response.code;
        }
    };
};
exports.default = makeGroupsSocket;
