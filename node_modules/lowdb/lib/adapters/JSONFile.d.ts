import { Adapter } from '../Low.js';
export declare class JSONFile<T> implements Adapter<T> {
    #private;
    constructor(filename: string);
    read(): Promise<T | null>;
    write(obj: T): Promise<void>;
}
