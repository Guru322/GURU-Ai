import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IControlFlowStorage } from '../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { MapStorage } from '../MapStorage';
export declare class FunctionControlFlowStorage extends MapStorage<string, ICustomNode> implements IControlFlowStorage {
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory);
}
