import * as ESTree from 'estree';
import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class BlockStatementControlFlowTransformer extends AbstractNodeTransformer {
    private readonly arrayUtils;
    private readonly controlFlowCustomNodeFactory;
    constructor(controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory, arrayUtils: IArrayUtils, randomGenerator: IRandomGenerator, options: IOptions);
    private static isProhibitedStatementNode;
    private static canTransformBlockStatementNode;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node;
}
