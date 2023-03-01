import { TIdentifierNamesCache } from '../../types/TIdentifierNamesCache';
export declare class IdentifierNamesCacheFileUtils {
    private static readonly identifierNamesCacheExtension;
    private readonly identifierNamesCachePath;
    constructor(identifierNamesCachePath: string | undefined);
    private static isValidFilePath;
    private static readFile;
    readFile(): TIdentifierNamesCache | null;
    writeFile(identifierNamesCache: TIdentifierNamesCache): void;
}
