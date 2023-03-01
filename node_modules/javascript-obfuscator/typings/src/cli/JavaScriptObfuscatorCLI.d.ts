/// <reference types="node" />
import { IInitializable } from '../interfaces/IInitializable';
export declare class JavaScriptObfuscatorCLI implements IInitializable {
    static readonly availableInputExtensions: string[];
    static readonly encoding: BufferEncoding;
    static readonly obfuscatedFilePrefix: string;
    private commands;
    private identifierNamesCacheFileUtils;
    private inputCLIOptions;
    private inputPath;
    private sourceCodeFileUtils;
    private obfuscatedCodeFileUtils;
    private readonly arguments;
    private readonly rawArguments;
    constructor(argv: string[]);
    private static buildOptions;
    private static filterOptions;
    initialize(): void;
    run(): void;
    private configureCommands;
    private configureHelp;
    private processSourceCodeData;
    private processSourceCode;
    private processSourceCodeWithoutSourceMap;
    private processSourceCodeWithSourceMap;
}
