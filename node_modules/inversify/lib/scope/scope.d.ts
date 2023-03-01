import { interfaces } from "../inversify";
export declare const tryGetFromScope: <T>(requestScope: interfaces.RequestScope, binding: interfaces.Binding<T>) => T | Promise<T> | null;
export declare const saveToScope: <T>(requestScope: interfaces.RequestScope, binding: interfaces.Binding<T>, result: T | Promise<T>) => void;
