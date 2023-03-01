import * as ESTree from 'estree';
import { TNumericalExpressionDataToNodeConverterLiteralNodeGetter } from '../types/node/TNumericalExpressionDataToNodeConverterLiteralNodeGetter';
import { TNumberNumericalExpressionData } from '../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';
export declare class NumericalExpressionDataToNodeConverter {
    static convertIntegerNumberData(numberNumericalExpressionData: TNumberNumericalExpressionData, literalNodeGetter: TNumericalExpressionDataToNodeConverterLiteralNodeGetter): ESTree.Expression;
    static convertFloatNumberData(integerNumberNumericalExpressionData: TNumberNumericalExpressionData, decimalPart: number, literalNodeGetter: TNumericalExpressionDataToNodeConverterLiteralNodeGetter): ESTree.Expression;
    private static convertNumericalExpressionDataToNode;
    private static convertPartsToBinaryExpression;
    private static convertPartOrNumberToLiteralNode;
}
