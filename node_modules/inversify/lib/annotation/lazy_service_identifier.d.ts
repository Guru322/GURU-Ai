import { interfaces } from "../interfaces/interfaces";
export declare type ServiceIdentifierOrFunc<T> = interfaces.ServiceIdentifier<T> | LazyServiceIdentifer<T>;
export declare class LazyServiceIdentifer<T = unknown> {
    private _cb;
    constructor(cb: () => interfaces.ServiceIdentifier<T>);
    unwrap(): interfaces.ServiceIdentifier<T>;
}
