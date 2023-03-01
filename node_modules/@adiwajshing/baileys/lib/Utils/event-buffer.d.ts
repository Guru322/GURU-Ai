import { Logger } from 'pino';
import { AuthenticationCreds, BaileysEventEmitter, BaileysEventMap } from '../Types';
/**
 * A map that contains a list of all events that have been triggered
 *
 * Note, this can contain different type of events
 * this can make processing events extremely efficient -- since everything
 * can be done in a single transaction
 */
declare type BaileysEventData = Partial<BaileysEventMap<AuthenticationCreds>>;
declare type BaileysBufferableEventEmitter = BaileysEventEmitter & {
    /** Use to process events in a batch */
    process(handler: (events: BaileysEventData) => void | Promise<void>): (() => void);
    /**
     * starts buffering events, call flush() to release them
     * @returns true if buffering just started, false if it was already buffering
     * */
    buffer(): boolean;
    /** buffers all events till the promise completes */
    createBufferedFunction<A extends any[], T>(work: (...args: A) => Promise<T>): ((...args: A) => Promise<T>);
    /** flushes all buffered events */
    flush(): Promise<void>;
    /** waits for the task to complete, before releasing the buffer */
    processInBuffer(task: Promise<any>): any;
};
/**
 * The event buffer logically consolidates different events into a single event
 * making the data processing more efficient.
 * @param ev the baileys event emitter
 */
export declare const makeEventBuffer: (logger: Logger) => BaileysBufferableEventEmitter;
export {};
