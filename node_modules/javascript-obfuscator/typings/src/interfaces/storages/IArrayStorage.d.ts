import { IInitializable } from '../IInitializable';
export interface IArrayStorage<V> extends IInitializable {
    delete(key: number): V | undefined;
    get(key: number): V | undefined;
    getOrThrow(key: number): V;
    getKeyOf(value: V): number | null;
    getLength(): number;
    getStorage(): V[];
    getStorageId(): string;
    mergeWith(storage: this, mergeId: boolean): void;
    set(key: number, value: V): void;
    toString(): string;
}
