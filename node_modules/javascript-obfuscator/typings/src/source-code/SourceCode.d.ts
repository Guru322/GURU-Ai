import { ISourceCode } from '../interfaces/source-code/ISourceCode';
export declare class SourceCode implements ISourceCode {
    private readonly sourceCode;
    private readonly sourceMap;
    constructor(sourceCode: string, sourceMap: string);
    getSourceCode(): string;
    getSourceMap(): string;
    toString(): string;
}
