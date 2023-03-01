import * as ESTree from 'estree';
export interface IObjectExpressionExtractorResult {
    nodeToReplace: ESTree.Node;
    objectExpressionHostStatement: ESTree.Statement;
    objectExpressionNode: ESTree.ObjectExpression;
}
