import { interfaces } from "../interfaces/interfaces";
declare class Metadata implements interfaces.Metadata {
    key: string | number | symbol;
    value: unknown;
    constructor(key: string | number | symbol, value: unknown);
    toString(): string;
}
export { Metadata };
