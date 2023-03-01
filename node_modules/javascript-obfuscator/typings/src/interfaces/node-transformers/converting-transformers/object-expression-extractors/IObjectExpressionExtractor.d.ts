import * as ESTree from 'estree';
import { IObjectExpressionExtractorResult } from './IObjectExpressionExtractorResult';
export interface IObjectExpressionExtractor {
    extract(objectExpressionNode: ESTree.ObjectExpression, hostStatement: ESTree.Statement): IObjectExpressionExtractorResult;
}
