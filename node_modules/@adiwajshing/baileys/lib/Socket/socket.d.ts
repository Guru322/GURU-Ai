/// <reference types="node" />
import WebSocket from 'ws';
import { SocketConfig } from '../Types';
import { BinaryNode } from '../WABinary';
/**
 * Connects to WA servers and performs:
 * - simple queries (no retry mechanism, wait for connection establishment)
 * - listen to messages and emit events
 * - query phone connection
 */
export declare const makeSocket: ({ waWebSocketUrl, connectTimeoutMs, logger, agent, keepAliveIntervalMs, version, browser, auth: authState, printQRInTerminal, defaultQueryTimeoutMs, syncFullHistory, transactionOpts, qrTimeout }: SocketConfig) => {
    type: "md";
    ws: WebSocket;
    ev: import("../Types").BaileysEventEmitter & {
        process(handler: (events: Partial<import("../Types").BaileysEventMap<import("../Types").AuthenticationCreds>>) => void | Promise<void>): () => void;
        buffer(): boolean;
        createBufferedFunction<A extends any[], T>(work: (...args: A) => Promise<T>): (...args: A) => Promise<T>;
        flush(): Promise<void>;
        processInBuffer(task: Promise<any>): any;
    };
    authState: {
        creds: import("../Types").AuthenticationCreds;
        keys: import("../Types").SignalKeyStoreWithTransaction;
    };
    readonly user: import("../Types").Contact | undefined;
    generateMessageTag: () => string;
    query: (node: BinaryNode, timeoutMs?: number) => Promise<BinaryNode>;
    waitForMessage: (msgId: string, timeoutMs?: number | undefined) => Promise<any>;
    waitForSocketOpen: () => Promise<void>;
    sendRawMessage: (data: Uint8Array | Buffer) => Promise<void>;
    sendNode: (frame: BinaryNode) => Promise<void>;
    logout: () => Promise<void>;
    end: (error: Error | undefined) => void;
    onUnexpectedError: (error: Error, msg: string) => void;
    uploadPreKeys: (count?: number) => Promise<void>;
    /** Waits for the connection to WA to reach a state */
    waitForConnectionUpdate: (check: (u: Partial<import("../Types").ConnectionState>) => boolean | undefined, timeoutMs?: number | undefined) => Promise<void>;
};
export declare type Socket = ReturnType<typeof makeSocket>;
