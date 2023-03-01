declare function injectable(): <T extends abstract new (...args: never) => unknown>(target: T) => T;
export { injectable };
