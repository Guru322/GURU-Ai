import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { FunctionControlFlowStorage } from './FunctionControlFlowStorage';
export declare class StringControlFlowStorage extends FunctionControlFlowStorage {
    constructor(randomGenerator: IRandomGenerator, options: IOptions, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory);
    initialize(): void;
}
