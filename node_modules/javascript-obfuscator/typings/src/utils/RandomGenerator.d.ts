/// <reference types="chance" />
import { IInitializable } from '../interfaces/IInitializable';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { ISourceCode } from '../interfaces/source-code/ISourceCode';
export declare class RandomGenerator implements IRandomGenerator, IInitializable {
    static readonly randomGeneratorPool: string;
    private randomGenerator;
    private readonly options;
    private readonly sourceCode;
    constructor(sourceCode: ISourceCode, options: IOptions);
    initialize(): void;
    getMathRandom(): number;
    getRandomGenerator(): Chance.Chance;
    getRandomInteger(min: number, max: number): number;
    getRandomIntegerExcluding(min: number, max: number, valuesToExclude: number[]): number;
    getRandomString(length: number, pool?: string): string;
    getInputSeed(): string;
    getRawSeed(): string;
}
