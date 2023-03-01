import { Adapter } from '../Low.js';
export declare class TextFile implements Adapter<string> {
    #private;
    constructor(filename: string);
    read(): Promise<string | null>;
    write(str: string): Promise<void>;
}
