import { IArrayStorage } from '../interfaces/storages/IArrayStorage';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
export declare abstract class ArrayStorage<V> implements IArrayStorage<V> {
    protected storage: V[];
    protected storageId: string;
    protected readonly randomGenerator: IRandomGenerator;
    protected readonly options: IOptions;
    private storageLength;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    initialize(): void;
    delete(key: number): V | undefined;
    get(key: number): V | undefined;
    getOrThrow(key: number): V;
    getKeyOf(value: V): number | null;
    getLength(): number;
    getStorage(): V[];
    getStorageId(): string;
    mergeWith(storage: this, mergeId?: boolean): void;
    set(key: number, value: V): void;
}
