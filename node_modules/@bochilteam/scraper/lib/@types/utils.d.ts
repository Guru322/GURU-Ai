export declare class ScraperError extends Error {
    readonly date: Date;
    constructor(message: any, options?: {});
    static createError(message: any, options?: {}): ScraperError;
    static createErrorArgs(message: any, options?: {}): ScraperError;
}
export declare function getEncodedSnapApp(data: string): string[];
export declare function decodeSnapApp(...args: string[] | number[]): string;
export declare function getDecodedSnapSave(data: string): string;
export declare function decryptSnapSave(data: string): string;
export declare function stringifyCookies(cookies: string[]): string;
export declare function parseCookies(cookieString: string): {
    [key: string]: string;
};
/**
 * @returns is a kilobyte
 */
export declare function parseFileSize(size: string): number;
//# sourceMappingURL=utils.d.ts.map