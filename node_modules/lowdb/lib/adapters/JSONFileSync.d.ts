import { SyncAdapter } from '../LowSync.js';
export declare class JSONFileSync<T> implements SyncAdapter<T> {
    #private;
    constructor(filename: string);
    read(): T | null;
    write(obj: T): void;
}
