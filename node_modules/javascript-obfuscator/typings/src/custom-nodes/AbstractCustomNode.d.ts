import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../types/node/TStatement';
import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomCodeHelperFormatter } from '../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
export declare abstract class AbstractCustomNode<TInitialData extends unknown[] = unknown[]> implements ICustomNode<TInitialData> {
    protected cachedNode: TStatement[] | null;
    protected readonly customCodeHelperFormatter: ICustomCodeHelperFormatter;
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    getNode(): TStatement[];
    abstract initialize(...args: TInitialData): void;
    protected abstract getNodeStructure(): TStatement[];
}
