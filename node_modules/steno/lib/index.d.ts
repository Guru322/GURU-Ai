export declare class Writer {
    #private;
    constructor(filename: string);
    write(data: string): Promise<void>;
}
