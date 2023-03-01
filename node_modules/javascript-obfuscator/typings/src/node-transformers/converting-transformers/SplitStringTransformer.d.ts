import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class SplitStringTransformer extends AbstractNodeTransformer {
    private static readonly firstPassChunkLength;
    runAfter: NodeTransformer[];
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    private static chunkString;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node;
    private transformLiteralNodeByChunkLength;
    private transformStringChunksToBinaryExpressionNode;
}
