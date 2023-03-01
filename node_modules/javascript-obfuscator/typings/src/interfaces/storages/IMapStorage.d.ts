import { TDictionary } from '../../types/TDictionary';
import { IInitializable } from '../IInitializable';
export interface IMapStorage<K, V> extends IInitializable {
    get(key: K): V | undefined;
    getOrThrow(key: K): V;
    getKeyOf(value: V): K | null;
    getLength(): number;
    getStorage(): Map<K, V>;
    getStorageAsDictionary(): TDictionary<V>;
    getStorageId(): string;
    has(key: K): boolean;
    mergeWith(storage: this, mergeId: boolean): void;
    set(key: K, value: V): void;
    toString(): string;
}
