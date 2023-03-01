/// <reference types="ws" />
/// <reference types="node" />
import { ConnectionState, LegacyBaileysEventEmitter, LegacySocketConfig } from '../Types';
declare const makeAuthSocket: (config: LegacySocketConfig) => {
    state: ConnectionState;
    authInfo: import("../Types").LegacyAuthenticationCreds;
    ev: LegacyBaileysEventEmitter;
    canLogin: () => boolean;
    logout: () => Promise<void>;
    /** Waits for the connection to WA to reach a state */
    waitForConnectionUpdate: (check: (u: Partial<ConnectionState>) => boolean | undefined, timeoutMs?: number | undefined) => Promise<void>;
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
    setQuery: (nodes: import("..").BinaryNode[], binaryTag?: import("../Types").WATag, tag?: string | undefined) => Promise<{
        status: number;
    }>;
    currentEpoch: () => number;
    end: (error: Error | undefined) => void;
};
export default makeAuthSocket;
