import { TInputCLIOptions } from '../../types/options/TInputCLIOptions';
import { IFileData } from '../../interfaces/cli/IFileData';
export declare class SourceCodeFileUtils {
    private readonly inputPath;
    private readonly options;
    constructor(inputPath: string, options: TInputCLIOptions);
    private static isExcludedPath;
    private static isDirectoryPath;
    private static isFilePath;
    private static isValidDirectory;
    private static isValidFile;
    private static readFile;
    readSourceCode(): IFileData[];
    private readDirectoryRecursive;
}
