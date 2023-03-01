export declare class NumberUtils {
    static toHex(number: number | bigint): string;
    static extractIntegerAndDecimalParts(number: number): [number, number | null];
    static isCeil(number: number | bigint): boolean;
    static isPositive(number: number): boolean;
    static isUnsafeNumber(number: number): boolean;
    static getFactors(number: number): number[];
}
