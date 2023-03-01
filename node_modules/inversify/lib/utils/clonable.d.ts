import { interfaces } from "../interfaces/interfaces";
declare function isClonable<T>(obj: unknown): obj is interfaces.Clonable<T>;
export { isClonable };
