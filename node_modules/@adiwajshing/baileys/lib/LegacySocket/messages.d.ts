/// <reference types="node" />
/// <reference types="node" />
/// <reference types="ws" />
import { proto } from '../../WAProto';
import { AnyMessageContent, Chat, LegacySocketConfig, MiscMessageGenerationOptions, WAMessage, WAMessageCursor, WAUrlInfo } from '../Types';
import { MediaDownloadOptions } from '../Utils';
import { BinaryNode } from '../WABinary';
declare const makeMessagesSocket: (config: LegacySocketConfig) => {
    relayMessage: (message: WAMessage, { waitForAck }?: {
        waitForAck: boolean;
    }) => Promise<void>;
    waUploadToServer: import("../Types").WAMediaUploadFunction;
    generateUrlInfo: (text: string) => Promise<WAUrlInfo>;
    messageInfo: (jid: string, messageID: string) => Promise<proto.IUserReceipt[]>;
    downloadMediaMessage: (message: WAMessage, type?: 'buffer' | 'stream', options?: MediaDownloadOptions) => Promise<Buffer | import("stream").Transform>;
    updateMediaMessage: (message: WAMessage) => Promise<proto.IWebMessageInfo>;
    fetchMessagesFromWA: (jid: string, count: number, cursor?: WAMessageCursor) => Promise<proto.WebMessageInfo[]>;
    /** Load a single message specified by the ID */
    loadMessageFromWA: (jid: string, id: string) => Promise<proto.WebMessageInfo>;
    searchMessages: (txt: string, inJid: string | null, count: number, page: number) => Promise<{
        last: boolean;
        messages: proto.WebMessageInfo[];
    }>;
    sendMessage: (jid: string, content: AnyMessageContent, options?: MiscMessageGenerationOptions & {
        waitForAck?: boolean;
    }) => Promise<proto.WebMessageInfo | undefined>;
    sendChatsQuery: (epoch: number) => Promise<string>;
    profilePictureUrl: (jid: string, timeoutMs?: number | undefined) => Promise<string | undefined>;
    chatRead: (fromMessage: proto.IMessageKey, count: number) => Promise<void>;
    chatModify: (modification: import("../Types").ChatModification, jid: string, chatInfo: Pick<Chat, "mute" | "pin">, timestampNow?: number | undefined) => Promise<void | {
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
export default makeMessagesSocket;
