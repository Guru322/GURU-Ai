declare function tagged<T>(metadataKey: string | number | symbol, metadataValue: unknown): <T_1>(target: import("./decorator_utils").DecoratorTarget<unknown>, targetKey?: string | symbol | undefined, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T_1> | undefined) => void;
export { tagged };
