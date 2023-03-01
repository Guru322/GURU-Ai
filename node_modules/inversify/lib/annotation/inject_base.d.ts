import { DecoratorTarget } from "./decorator_utils";
import { ServiceIdentifierOrFunc } from "./lazy_service_identifier";
export declare function injectBase(metadataKey: string): <T = unknown>(serviceIdentifier: ServiceIdentifierOrFunc<T>) => (target: DecoratorTarget, targetKey?: string | symbol | undefined, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<any> | undefined) => void;
