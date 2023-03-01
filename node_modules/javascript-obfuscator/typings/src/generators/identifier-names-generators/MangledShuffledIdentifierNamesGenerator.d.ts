import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ISetUtils } from '../../interfaces/utils/ISetUtils';
import { MangledIdentifierNamesGenerator } from './MangledIdentifierNamesGenerator';
export declare class MangledShuffledIdentifierNamesGenerator extends MangledIdentifierNamesGenerator {
    protected static shuffledNameSequence: string[];
    private readonly arrayUtils;
    constructor(arrayUtils: IArrayUtils, randomGenerator: IRandomGenerator, options: IOptions, setUtils: ISetUtils);
    initialize(): void;
    protected initializeNameSequence(nameSequence: string[]): void;
    protected getNameSequence(): string[];
}
