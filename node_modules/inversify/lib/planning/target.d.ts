import { interfaces } from '../interfaces/interfaces';
import { Metadata } from './metadata';
declare class Target implements interfaces.Target {
    id: number;
    type: interfaces.TargetType;
    serviceIdentifier: interfaces.ServiceIdentifier;
    name: interfaces.QueryableString;
    identifier: string | symbol;
    key: string | symbol;
    metadata: Metadata[];
    constructor(type: interfaces.TargetType, identifier: string | symbol, serviceIdentifier: interfaces.ServiceIdentifier, namedOrTagged?: (string | Metadata));
    hasTag(key: string): boolean;
    isArray(): boolean;
    matchesArray(name: interfaces.ServiceIdentifier<unknown>): boolean;
    isNamed(): boolean;
    isTagged(): boolean;
    isOptional(): boolean;
    getNamedTag(): interfaces.Metadata<string> | null;
    getCustomTags(): interfaces.Metadata[] | null;
    matchesNamedTag(name: string): boolean;
    matchesTag(key: string): (value: unknown) => boolean;
}
export { Target };
