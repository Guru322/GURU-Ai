import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class NumberLiteralTransformer extends AbstractNodeTransformer {
    readonly runAfter: NodeTransformer[];
    private readonly numberLiteralCache;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node;
}
