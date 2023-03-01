declare function optional(): <T>(target: import("./decorator_utils").DecoratorTarget<unknown>, targetKey?: string | symbol | undefined, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T> | undefined) => void;
export { optional };
