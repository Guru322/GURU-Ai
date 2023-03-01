import * as ESTree from 'estree';
import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class NumberToNumericalExpressionTransformer extends AbstractNodeTransformer {
    private readonly numberNumericalExpressionAnalyzer;
    constructor(numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer, randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node;
    private getNumberNumericalExpressionLiteralNode;
}
