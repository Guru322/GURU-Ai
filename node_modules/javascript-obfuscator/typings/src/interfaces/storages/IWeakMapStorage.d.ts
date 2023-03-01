import { IInitializable } from '../IInitializable';
export interface IWeakMapStorage<K extends object, V> extends IInitializable {
    get(key: K): V | undefined;
    getOrThrow(key: K): V;
    getStorage(): WeakMap<K, V>;
    getStorageId(): string;
    has(key: K): boolean;
    set(key: K, value: V): void;
}
