import { TInputCLIOptions } from '../../types/options/TInputCLIOptions';
export declare class ObfuscatedCodeFileUtils {
    private readonly inputPath;
    private readonly options;
    constructor(inputPath: string, options: TInputCLIOptions);
    getOutputCodePath(filePath: string): string;
    getOutputSourceMapPath(outputCodePath: string, sourceMapFileName?: string): string;
    writeFile(outputPath: string, data: string): void;
}
