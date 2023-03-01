import * as ESTree from 'estree';
import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
export declare abstract class ExpressionWithOperatorControlFlowReplacer extends AbstractControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    protected getControlFlowStorageCallNode(controlFlowStorageId: string, storageKey: string, leftExpression: ESTree.Expression, rightExpression: ESTree.Expression): ESTree.Node;
}
