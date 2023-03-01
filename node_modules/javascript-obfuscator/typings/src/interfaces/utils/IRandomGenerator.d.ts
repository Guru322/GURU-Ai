/// <reference types="chance" />
export interface IRandomGenerator {
    getMathRandom(): number;
    getRandomGenerator(): Chance.Chance;
    getRandomInteger(min: number, max: number): number;
    getRandomIntegerExcluding(min: number, max: number, valuesToExclude: number[]): number;
    getRandomString(length: number, pool?: string): string;
    getInputSeed(): string;
    getRawSeed(): string;
}
