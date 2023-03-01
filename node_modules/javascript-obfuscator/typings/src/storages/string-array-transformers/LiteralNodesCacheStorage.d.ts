import * as ESTree from 'estree';
import { ILiteralNodesCacheStorage } from '../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';
import { MapStorage } from '../MapStorage';
export declare class LiteralNodesCacheStorage extends MapStorage<string, ESTree.Node> implements ILiteralNodesCacheStorage {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    buildKey(literalValue: string, stringArrayStorageItemData: IStringArrayStorageItemData | undefined): string;
    shouldUseCachedValue(key: string, stringArrayStorageItemData: IStringArrayStorageItemData | undefined): boolean;
}
