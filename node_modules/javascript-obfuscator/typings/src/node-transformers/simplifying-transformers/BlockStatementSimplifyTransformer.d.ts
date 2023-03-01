import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractStatementSimplifyTransformer } from './AbstractStatementSimplifyTransformer';
export declare class BlockStatementSimplifyTransformer extends AbstractStatementSimplifyTransformer {
    readonly runAfter: NodeTransformer[];
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(statementNode: ESTree.Statement, parentNode: ESTree.Node): ESTree.Node;
}
