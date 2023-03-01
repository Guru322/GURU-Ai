import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class EvalCallExpressionTransformer extends AbstractNodeTransformer {
    readonly runAfter: NodeTransformer[];
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    private static extractEvalStringFromCallExpressionArgument;
    private static extractEvalStringFromLiteralNode;
    private static extractEvalStringFromTemplateLiteralNode;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
    restoreNode(node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
    private isEvalRootAstHostNode;
}
