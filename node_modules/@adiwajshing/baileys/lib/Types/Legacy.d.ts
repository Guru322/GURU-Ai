/// <reference types="node" />
import { BinaryNode } from '../WABinary';
import { CommonBaileysEventEmitter } from './Events';
import { CommonSocketConfig } from './Socket';
export interface LegacyAuthenticationCreds {
    clientID: string;
    serverToken: string;
    clientToken: string;
    encKey: Buffer;
    macKey: Buffer;
}
/** used for binary messages */
export declare enum WAMetric {
    debugLog = 1,
    queryResume = 2,
    liveLocation = 3,
    queryMedia = 4,
    queryChat = 5,
    queryContact = 6,
    queryMessages = 7,
    presence = 8,
    presenceSubscribe = 9,
    group = 10,
    read = 11,
    chat = 12,
    received = 13,
    picture = 14,
    status = 15,
    message = 16,
    queryActions = 17,
    block = 18,
    queryGroup = 19,
    queryPreview = 20,
    queryEmoji = 21,
    queryRead = 22,
    queryVCard = 29,
    queryStatus = 30,
    queryStatusUpdate = 31,
    queryLiveLocation = 33,
    queryLabel = 36,
    queryQuickReply = 39
}
/** used for binary messages */
export declare enum WAFlag {
    available = 160,
    other = 136,
    ignore = 128,
    acknowledge = 64,
    unavailable = 16,
    expires = 8,
    composing = 4,
    recording = 4,
    paused = 4
}
/** Tag used with binary queries */
export declare type WATag = [WAMetric, WAFlag];
export declare type SocketSendMessageOptions = {
    json: BinaryNode | any[];
    binaryTag?: WATag;
    tag?: string;
    longTag?: boolean;
};
export declare type SocketQueryOptions = SocketSendMessageOptions & {
    timeoutMs?: number;
    expect200?: boolean;
    requiresPhoneConnection?: boolean;
};
export declare type LegacySocketConfig = CommonSocketConfig & {
    auth?: LegacyAuthenticationCreds;
    /** max time for the phone to respond to a connectivity test */
    phoneResponseTimeMs: number;
    /** max time for WA server to respond before error with 422 */
    expectResponseTimeout: number;
};
export declare type LegacyBaileysEventEmitter = CommonBaileysEventEmitter<LegacyAuthenticationCreds>;
