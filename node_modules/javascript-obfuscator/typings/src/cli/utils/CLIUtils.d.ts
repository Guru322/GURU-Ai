import { TDictionary } from '../../types/TDictionary';
export declare class CLIUtils {
    static readonly allowedConfigFileExtensions: string[];
    static getUserConfig(configPath: string): TDictionary;
    static stringifyOptionAvailableValues(optionEnum: TDictionary): string;
}
