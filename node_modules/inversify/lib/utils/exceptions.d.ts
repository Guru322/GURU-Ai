export declare function isStackOverflowExeption(error: Error): boolean;
export declare const tryAndThrowErrorIfStackOverflow: <T>(fn: () => T, errorCallback: () => Error) => T;
