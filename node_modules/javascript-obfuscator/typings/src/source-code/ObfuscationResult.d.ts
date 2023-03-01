import { TIdentifierNamesCache } from '../types/TIdentifierNamesCache';
import { ICryptUtils } from '../interfaces/utils/ICryptUtils';
import { IGlobalIdentifierNamesCacheStorage } from '../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IObfuscationResult } from '../interfaces/source-code/IObfuscationResult';
import { IPropertyIdentifierNamesCacheStorage } from '../interfaces/storages/identifier-names-cache/IPropertyIdentifierNamesCacheStorage';
import { IOptions } from '../interfaces/options/IOptions';
export declare class ObfuscationResult implements IObfuscationResult {
    private obfuscatedCode;
    private sourceMap;
    private readonly cryptUtils;
    private readonly globalIdentifierNamesCacheStorage;
    private readonly propertyIdentifierNamesCacheStorage;
    private readonly options;
    constructor(cryptUtils: ICryptUtils, globalIdentifierNamesCacheStorage: IGlobalIdentifierNamesCacheStorage, propertyIdentifierNamesCacheStorage: IPropertyIdentifierNamesCacheStorage, options: IOptions);
    initialize(obfuscatedCode: string, sourceMap: string): void;
    getIdentifierNamesCache(): TIdentifierNamesCache;
    getObfuscatedCode(): string;
    getOptions(): IOptions;
    getSourceMap(): string;
    toString(): string;
    private correctObfuscatedCode;
}
