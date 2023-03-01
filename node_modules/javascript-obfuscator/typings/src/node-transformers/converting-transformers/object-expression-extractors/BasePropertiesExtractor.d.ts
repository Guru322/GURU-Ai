import * as ESTree from 'estree';
import { IObjectExpressionExtractorResult } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractorResult';
import { IObjectExpressionExtractor } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractor';
export declare class BasePropertiesExtractor implements IObjectExpressionExtractor {
    private static getPropertyNodeKeyName;
    private static isProhibitedPropertyNode;
    private static isProhibitedPattern;
    private static shouldCreateLiteralNode;
    extract(objectExpressionNode: ESTree.ObjectExpression, hostStatement: ESTree.Statement): IObjectExpressionExtractorResult;
    private transformObjectExpressionNode;
    private extractPropertiesToExpressionStatements;
    private filterExtractedObjectExpressionProperties;
}
