import { IArrayUtils } from '../interfaces/utils/IArrayUtils';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
export declare class ArrayUtils implements IArrayUtils {
    private readonly randomGenerator;
    constructor(randomGenerator: IRandomGenerator);
    createWithRange(length: number): number[];
    fillWithRange<TValue>(length: number, valueFunction: (index: number) => TValue): TValue[];
    findMostOccurringElement<T extends string | number>(array: T[]): T | null;
    getLastElement<T>(array: T[]): T | undefined;
    getLastElementByIndex<T>(array: T[], index: number): T | undefined;
    rotate<T>(array: T[], times: number): T[];
    shuffle<T>(array: T[]): T[];
}
