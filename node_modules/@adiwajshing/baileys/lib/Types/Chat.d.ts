import type { proto } from '../../WAProto';
import type { AccountSettings } from './Auth';
import type { MinimalMessage } from './Message';
/** set of statuses visible to other people; see updatePresence() in WhatsAppWeb.Send */
export declare type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused';
export declare const ALL_WA_PATCH_NAMES: readonly ["critical_block", "critical_unblock_low", "regular_high", "regular_low", "regular"];
export declare type WAPatchName = typeof ALL_WA_PATCH_NAMES[number];
export interface PresenceData {
    lastKnownPresence: WAPresence;
    lastSeen?: number;
}
export declare type ChatMutation = {
    syncAction: proto.ISyncActionData;
    index: string[];
};
export declare type WAPatchCreate = {
    syncAction: proto.ISyncActionValue;
    index: string[];
    type: WAPatchName;
    apiVersion: number;
    operation: proto.SyncdMutation.SyncdOperation;
};
export declare type Chat = proto.IConversation & {
    /** unix timestamp of date when mute ends, if applicable */
    mute?: number | null;
    /** timestamp of when pinned */
    pin?: number | null;
    archive?: boolean;
};
/**
 * the last messages in a chat, sorted reverse-chronologically. That is, the latest message should be first in the chat
 * for MD modifications, the last message in the array (i.e. the earlist message) must be the last message recv in the chat
 * */
export declare type LastMessageList = MinimalMessage[] | proto.SyncActionValue.ISyncActionMessageRange;
export declare type ChatModification = {
    archive: boolean;
    lastMessages: LastMessageList;
} | {
    pushNameSetting: string;
} | {
    pin: boolean;
} | {
    /** mute for duration, or provide timestamp of mute to remove*/
    mute: number | null;
} | {
    clear: 'all' | {
        messages: {
            id: string;
            fromMe?: boolean;
            timestamp: number;
        }[];
    };
} | {
    star: {
        messages: {
            id: string;
            fromMe?: boolean;
        }[];
        star: boolean;
    };
} | {
    markRead: boolean;
    lastMessages: LastMessageList;
} | {
    delete: true;
    lastMessages: LastMessageList;
};
export declare type InitialReceivedChatsState = {
    [jid: string]: {
        lastMsgRecvTimestamp: number;
    };
};
export declare type InitialAppStateSyncOptions = {
    recvChats: InitialReceivedChatsState;
    accountSettings: AccountSettings;
};
