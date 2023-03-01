import { interfaces } from "../interfaces/interfaces";
declare function resolve<T>(context: interfaces.Context): T | Promise<T> | (T | Promise<T>)[];
export { resolve };
