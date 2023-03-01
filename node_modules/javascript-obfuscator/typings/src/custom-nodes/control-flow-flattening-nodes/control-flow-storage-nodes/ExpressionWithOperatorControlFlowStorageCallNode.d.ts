import type { Expression } from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../../AbstractCustomNode';
export declare class ExpressionWithOperatorControlFlowStorageCallNode extends AbstractCustomNode {
    private controlFlowStorageKey;
    private controlFlowStorageName;
    private leftValue;
    private rightValue;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(controlFlowStorageName: string, controlFlowStorageKey: string, leftValue: Expression, rightValue: Expression): void;
    protected getNodeStructure(): TStatement[];
}
