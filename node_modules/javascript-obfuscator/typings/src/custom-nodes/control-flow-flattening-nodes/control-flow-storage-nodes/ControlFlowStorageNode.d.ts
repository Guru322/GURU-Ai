import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';
import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { ICustomCodeHelperFormatter } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../../AbstractCustomNode';
export declare class ControlFlowStorageNode extends AbstractCustomNode {
    private controlFlowStorage;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(controlFlowStorage: IControlFlowStorage): void;
    protected getNodeStructure(): TStatement[];
}
