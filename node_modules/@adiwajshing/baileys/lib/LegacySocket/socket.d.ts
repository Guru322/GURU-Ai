/// <reference types="node" />
import WebSocket from 'ws';
import { LegacySocketConfig, SocketQueryOptions, SocketSendMessageOptions, WATag } from '../Types';
import { BinaryNode } from '../WABinary';
/**
 * Connects to WA servers and performs:
 * - simple queries (no retry mechanism, wait for connection establishment)
 * - listen to messages and emit events
 * - query phone connection
 */
export declare const makeSocket: ({ waWebSocketUrl, connectTimeoutMs, phoneResponseTimeMs, logger, agent, keepAliveIntervalMs, expectResponseTimeout, }: LegacySocketConfig) => {
    type: "legacy";
    ws: WebSocket;
    sendAdminTest: () => Promise<string>;
    updateKeys: (info: {
        encKey: Buffer;
        macKey: Buffer;
    }) => {
        encKey: Buffer;
        macKey: Buffer;
    };
    waitForSocketOpen: () => Promise<void>;
    sendNode: ({ json, binaryTag, tag, longTag }: SocketSendMessageOptions) => Promise<string>;
    generateMessageTag: (longTag?: boolean) => string;
    waitForMessage: (tag: string, requiresPhoneConnection: boolean, timeoutMs?: number) => {
        promise: Promise<any>;
        cancelToken: () => void;
    };
    query: ({ json, timeoutMs, expect200, tag, longTag, binaryTag, requiresPhoneConnection }: SocketQueryOptions) => Promise<any>;
    /** Generic function for action, set queries */
    setQuery: (nodes: BinaryNode[], binaryTag?: WATag, tag?: string) => Promise<{
        status: number;
    }>;
    currentEpoch: () => number;
    end: (error: Error | undefined) => void;
};
