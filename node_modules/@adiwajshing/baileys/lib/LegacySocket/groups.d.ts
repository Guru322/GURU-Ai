/// <reference types="node" />
/// <reference types="node" />
/// <reference types="ws" />
import { GroupMetadata, LegacySocketConfig, ParticipantAction } from '../Types';
import { BinaryNode } from '../WABinary';
declare const makeGroupsSocket: (config: LegacySocketConfig) => {
    groupMetadata: (jid: string, minimal: boolean) => Promise<GroupMetadata>;
    /**
     * Create a group
     * @param title like, the title of the group
     * @param participants people to include in the group
     */
    groupCreate: (title: string, participants: string[]) => Promise<GroupMetadata>;
    /**
     * Leave a group
     * @param jid the ID of the group
     */
    groupLeave: (id: string) => Promise<void>;
    /**
     * Update the subject of the group
     * @param {string} jid the ID of the group
     * @param {string} title the new title of the group
     */
    groupUpdateSubject: (id: string, title: string) => Promise<void>;
    /**
     * Update the group description
     * @param {string} jid the ID of the group
     * @param {string} title the new title of the group
     */
    groupUpdateDescription: (jid: string, description: string) => Promise<{
        status: number;
    }>;
    /**
     * Update participants in the group
     * @param jid the ID of the group
     * @param participants the people to add
     */
    groupParticipantsUpdate: (id: string, participants: string[], action: ParticipantAction) => Promise<{
        jid: string;
        status: any;
    }[]>;
    /** Query broadcast list info */
    getBroadcastListInfo: (jid: string) => Promise<GroupMetadata>;
    groupInviteCode: (jid: string) => Promise<string>;
    relayMessage: (message: import("../Types").WAProto.IWebMessageInfo, { waitForAck }?: {
        waitForAck: boolean;
    }) => Promise<void>;
    waUploadToServer: import("../Types").WAMediaUploadFunction;
    generateUrlInfo: (text: string) => Promise<import("../Types").WAUrlInfo>;
    messageInfo: (jid: string, messageID: string) => Promise<import("../Types").WAProto.IUserReceipt[]>;
    downloadMediaMessage: (message: import("../Types").WAProto.IWebMessageInfo, type?: "stream" | "buffer", options?: import("..").MediaDownloadOptions) => Promise<Buffer | import("stream").Transform>;
    updateMediaMessage: (message: import("../Types").WAProto.IWebMessageInfo) => Promise<import("../Types").WAProto.IWebMessageInfo>;
    fetchMessagesFromWA: (jid: string, count: number, cursor?: import("../Types").WAMessageCursor | undefined) => Promise<import("../Types").WAProto.WebMessageInfo[]>;
    loadMessageFromWA: (jid: string, id: string) => Promise<import("../Types").WAProto.WebMessageInfo>;
    searchMessages: (txt: string, inJid: string | null, count: number, page: number) => Promise<{
        last: boolean;
        messages: import("../Types").WAProto.WebMessageInfo[];
    }>;
    sendMessage: (jid: string, content: import("../Types").AnyMessageContent, options?: {
        messageId?: string | undefined;
        cachedGroupMetadata?: ((jid: string) => Promise<import("../Types").GroupMetadataParticipants | undefined>) | undefined;
    } & {
        timestamp?: Date | undefined;
        quoted?: import("../Types").WAProto.IWebMessageInfo | undefined;
        ephemeralExpiration?: string | number | undefined;
        mediaUploadTimeoutMs?: number | undefined;
    } & {
        waitForAck?: boolean | undefined;
    }) => Promise<import("../Types").WAProto.WebMessageInfo | undefined>;
    sendChatsQuery: (epoch: number) => Promise<string>;
    profilePictureUrl: (jid: string, timeoutMs?: number | undefined) => Promise<string | undefined>;
    chatRead: (fromMessage: import("../Types").WAProto.IMessageKey, count: number) => Promise<void>;
    chatModify: (modification: import("../Types").ChatModification, jid: string, chatInfo: Pick<import("../Types").Chat, "mute" | "pin">, timestampNow?: number | undefined) => Promise<void | {
        status: number;
    }>;
    onWhatsApp: (str: string) => Promise<{
        exists: boolean;
        jid: string;
        isBusiness: boolean;
    } | undefined>;
    sendPresenceUpdate: (type: import("../Types").WAPresence, toJid?: string | undefined) => Promise<string>;
    presenceSubscribe: (jid: string) => Promise<string>;
    getStatus: (jid: string) => Promise<{
        status: string;
    }>;
    setStatus: (status: string) => Promise<{
        status: number;
    }>;
    updateBusinessProfile: (profile: import("../Types").WABusinessProfile) => Promise<void>;
    updateProfileName: (name: string) => Promise<{
        status: number;
        pushname: string;
    }>;
    updateProfilePicture(jid: string, imgBuffer: Buffer): Promise<void>;
    blockUser: (jid: string, type?: "add" | "remove") => Promise<void>;
    getBusinessProfile: (jid: string) => Promise<import("../Types").WABusinessProfile>;
    state: import("../Types").ConnectionState;
    authInfo: import("../Types").LegacyAuthenticationCreds;
    ev: import("../Types").LegacyBaileysEventEmitter;
    canLogin: () => boolean;
    logout: () => Promise<void>;
    waitForConnectionUpdate: (check: (u: Partial<import("../Types").ConnectionState>) => boolean | undefined, timeoutMs?: number | undefined) => Promise<void>;
    type: "legacy";
    ws: import("ws");
    sendAdminTest: () => Promise<string>;
    updateKeys: (info: {
        encKey: Buffer;
        macKey: Buffer;
    }) => {
        encKey: Buffer;
        macKey: Buffer;
    };
    waitForSocketOpen: () => Promise<void>;
    sendNode: ({ json, binaryTag, tag, longTag }: import("../Types").SocketSendMessageOptions) => Promise<string>;
    generateMessageTag: (longTag?: boolean) => string;
    waitForMessage: (tag: string, requiresPhoneConnection: boolean, timeoutMs?: number | undefined) => {
        promise: Promise<any>;
        cancelToken: () => void;
    };
    query: ({ json, timeoutMs, expect200, tag, longTag, binaryTag, requiresPhoneConnection }: import("../Types").SocketQueryOptions) => Promise<any>;
    setQuery: (nodes: BinaryNode[], binaryTag?: import("../Types").WATag, tag?: string | undefined) => Promise<{
        status: number;
    }>;
    currentEpoch: () => number;
    end: (error: Error | undefined) => void;
};
export default makeGroupsSocket;
