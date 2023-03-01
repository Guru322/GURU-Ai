import { IMapStorage } from '../interfaces/storages/IMapStorage';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { TDictionary } from '../types/TDictionary';
export declare abstract class MapStorage<K, V> implements IMapStorage<K, V> {
    protected storageId: string;
    protected storage: Map<K, V>;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    initialize(): void;
    get(key: K): V | undefined;
    getOrThrow(key: K): V;
    getKeyOf(value: V): K | null;
    getLength(): number;
    getStorage(): Map<K, V>;
    getStorageAsDictionary(): TDictionary<V>;
    getStorageId(): string;
    has(key: K): boolean;
    mergeWith(storage: this, mergeId?: boolean): void;
    set(key: K, value: V): void;
}
