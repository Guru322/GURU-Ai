/// <reference types="node" />
/// <reference types="ws" />
import { Chat, ChatModification, LegacySocketConfig, WABusinessProfile, WAMessageKey, WAPresence } from '../Types';
import { BinaryNode } from '../WABinary';
declare const makeChatsSocket: (config: LegacySocketConfig) => {
    sendChatsQuery: (epoch: number) => Promise<string>;
    profilePictureUrl: (jid: string, timeoutMs?: number) => Promise<string | undefined>;
    chatRead: (fromMessage: WAMessageKey, count: number) => Promise<void>;
    /**
     * Modify a given chat (archive, pin etc.)
     * @param jid the ID of the person/group you are modifiying
     */
    chatModify: (modification: ChatModification, jid: string, chatInfo: Pick<Chat, 'mute' | 'pin'>, timestampNow?: number) => Promise<void | {
        status: number;
    }>;
    /**
     * Query whether a given number is registered on WhatsApp
     * @param str phone number/jid you want to check for
     * @returns undefined if the number doesn't exists, otherwise the correctly formatted jid
     */
    onWhatsApp: (str: string) => Promise<{
        exists: boolean;
        jid: string;
        isBusiness: boolean;
    } | undefined>;
    /**
     * Tell someone about your presence -- online, typing, offline etc.
     * @param jid the ID of the person/group who you are updating
     * @param type your presence
     */
    sendPresenceUpdate: (type: WAPresence, toJid?: string) => Promise<string>;
    /**
     * Request updates on the presence of a user
     * this returns nothing, you'll receive updates in chats.update event
     * */
    presenceSubscribe: (jid: string) => Promise<string>;
    /** Query the status of the person (see groupMetadata() for groups) */
    getStatus: (jid: string) => Promise<{
        status: string;
    }>;
    setStatus: (status: string) => Promise<{
        status: number;
    }>;
    /** Updates business profile. */
    updateBusinessProfile: (profile: WABusinessProfile) => Promise<void>;
    updateProfileName: (name: string) => Promise<{
        status: number;
        pushname: string;
    }>;
    /**
     * Update the profile picture
     * @param jid
     * @param img
     */
    updateProfilePicture(jid: string, imgBuffer: Buffer): Promise<void>;
    /**
     * Add or remove user from blocklist
     * @param jid the ID of the person who you are blocking/unblocking
     * @param type type of operation
     */
    blockUser: (jid: string, type?: 'add' | 'remove') => Promise<void>;
    /**
     * Query Business Profile (Useful for VCards)
     * @param jid Business Jid
     * @returns profile object or undefined if not business account
     */
    getBusinessProfile: (jid: string) => Promise<WABusinessProfile>;
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
export default makeChatsSocket;
