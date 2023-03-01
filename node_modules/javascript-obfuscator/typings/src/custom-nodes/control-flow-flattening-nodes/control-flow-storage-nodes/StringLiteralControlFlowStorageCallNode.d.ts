import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../../AbstractCustomNode';
export declare class StringLiteralControlFlowStorageCallNode extends AbstractCustomNode {
    private controlFlowStorageKey;
    private controlFlowStorageName;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(controlFlowStorageName: string, controlFlowStorageKey: string): void;
    protected getNodeStructure(): TStatement[];
}
