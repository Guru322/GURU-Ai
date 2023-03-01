import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IWeakMapStorage } from '../interfaces/storages/IWeakMapStorage';
export declare abstract class WeakMapStorage<K extends object, V> implements IWeakMapStorage<K, V> {
    protected storageId: string;
    protected storage: WeakMap<K, V>;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    initialize(): void;
    get(key: K): V | undefined;
    getOrThrow(key: K): V;
    getStorage(): WeakMap<K, V>;
    getStorageId(): string;
    has(key: K): boolean;
    set(key: K, value: V): void;
}
