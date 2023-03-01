import { SyncAdapter } from '../LowSync.js';
export declare class TextFileSync implements SyncAdapter<string> {
    #private;
    constructor(filename: string);
    read(): string | null;
    write(str: string): void;
}
