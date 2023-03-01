import * as ESTree from 'estree';
import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
export declare class CallExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
    private static readonly usingExistingIdentifierChance;
    constructor(controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    replace(callExpressionNode: ESTree.CallExpression, parentNode: ESTree.Node, controlFlowStorage: IControlFlowStorage): ESTree.Node;
    protected getControlFlowStorageCallNode(controlFlowStorageId: string, storageKey: string, callee: ESTree.Expression, expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[]): ESTree.Node;
}
