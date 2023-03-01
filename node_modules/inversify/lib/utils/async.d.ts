declare function isPromise<T>(object: unknown): object is Promise<T>;
declare function isPromiseOrContainsPromise<T>(object: unknown): object is Promise<T> | (T | Promise<T>)[];
export { isPromise, isPromiseOrContainsPromise };
