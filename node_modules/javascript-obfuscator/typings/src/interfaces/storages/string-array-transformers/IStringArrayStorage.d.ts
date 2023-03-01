import { TStringArrayEncoding } from '../../../types/options/TStringArrayEncoding';
import { IMapStorage } from '../IMapStorage';
import { IStringArrayStorageItemData } from './IStringArrayStorageItem';
export interface IStringArrayStorage extends IMapStorage<string, IStringArrayStorageItemData> {
    getIndexShiftAmount(): number;
    getRotationAmount(): number;
    getStorageName(): string;
    getStorageCallsWrapperName(stringArrayEncoding: TStringArrayEncoding | null): string;
    rotateStorage(): void;
    shuffleStorage(): void;
}
