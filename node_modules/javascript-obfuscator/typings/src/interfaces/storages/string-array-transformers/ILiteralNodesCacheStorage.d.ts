import * as ESTree from 'estree';
import { IMapStorage } from '../IMapStorage';
import { IStringArrayStorageItemData } from './IStringArrayStorageItem';
export interface ILiteralNodesCacheStorage extends IMapStorage<string, ESTree.Node> {
    buildKey(literalValue: string, stringArrayStorageItemData: IStringArrayStorageItemData | undefined): string;
    shouldUseCachedValue(key: string, stringArrayStorageItemData: IStringArrayStorageItemData | undefined): boolean;
}
