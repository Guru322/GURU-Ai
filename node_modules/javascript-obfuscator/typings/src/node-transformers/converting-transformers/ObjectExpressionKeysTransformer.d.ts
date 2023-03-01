import * as ESTree from 'estree';
import { TObjectExpressionExtractorFactory } from '../../types/container/node-transformers/TObjectExpressionExtractorFactory';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class ObjectExpressionKeysTransformer extends AbstractNodeTransformer {
    private static readonly thisIdentifierName;
    private static readonly objectExpressionExtractorNames;
    private readonly objectExpressionExtractorFactory;
    constructor(objectExpressionExtractorFactory: TObjectExpressionExtractorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    private static isProhibitedObjectExpressionNode;
    private static getReferencedIdentifierName;
    private static isReferencedIdentifierName;
    private static isProhibitedArrowFunctionExpression;
    private static isObjectExpressionWithCallExpression;
    private static isProhibitedSequenceExpression;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node;
    private applyObjectExpressionKeysExtractorsRecursive;
}
