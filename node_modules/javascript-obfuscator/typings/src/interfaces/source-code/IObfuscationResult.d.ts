import { TIdentifierNamesCache } from '../../types/TIdentifierNamesCache';
import { IInitializable } from '../IInitializable';
import { IOptions } from '../options/IOptions';
export interface IObfuscationResult extends IInitializable<[string, string]> {
    getIdentifierNamesCache(): TIdentifierNamesCache;
    getObfuscatedCode(): string;
    getOptions(): IOptions;
    getSourceMap(): string;
}
