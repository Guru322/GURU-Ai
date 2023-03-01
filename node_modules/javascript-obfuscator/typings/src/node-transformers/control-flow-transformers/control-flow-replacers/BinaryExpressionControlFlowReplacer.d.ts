import * as ESTree from 'estree';
import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { ExpressionWithOperatorControlFlowReplacer } from './ExpressionWithOperatorControlFlowReplacer';
export declare class BinaryExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer {
    private static readonly usingExistingIdentifierChance;
    constructor(controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    replace(binaryExpressionNode: ESTree.BinaryExpression, parentNode: ESTree.Node, controlFlowStorage: IControlFlowStorage): ESTree.Node;
}
