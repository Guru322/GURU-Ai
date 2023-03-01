import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class CommentsTransformer extends AbstractNodeTransformer {
    private static readonly preservedWords;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(rootNode: ESTree.Program): ESTree.Node;
    private filterCommentsOnPrimaryTraverse;
    private filterCommentsOnFinalizingTraverse;
    private filterComment;
}
