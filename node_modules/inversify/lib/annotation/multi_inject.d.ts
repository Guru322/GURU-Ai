declare const multiInject: <T = unknown>(serviceIdentifier: import("./lazy_service_identifier").ServiceIdentifierOrFunc<T>) => (target: import("./decorator_utils").DecoratorTarget<unknown>, targetKey?: string | symbol | undefined, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<any> | undefined) => void;
export { multiInject };
