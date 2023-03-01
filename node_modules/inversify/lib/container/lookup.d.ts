import { interfaces } from "../interfaces/interfaces";
declare class Lookup<T> implements interfaces.Lookup<T> {
    private _map;
    constructor();
    getMap(): Map<interfaces.ServiceIdentifier<unknown>, T[]>;
    add(serviceIdentifier: interfaces.ServiceIdentifier, value: T): void;
    get(serviceIdentifier: interfaces.ServiceIdentifier): T[];
    remove(serviceIdentifier: interfaces.ServiceIdentifier): void;
    removeIntersection(lookup: interfaces.Lookup<T>): void;
    removeByCondition(condition: (item: T) => boolean): T[];
    hasKey(serviceIdentifier: interfaces.ServiceIdentifier): boolean;
    clone(): interfaces.Lookup<T>;
    traverse(func: (key: interfaces.ServiceIdentifier, value: T[]) => void): void;
    private _setValue;
}
export { Lookup };
