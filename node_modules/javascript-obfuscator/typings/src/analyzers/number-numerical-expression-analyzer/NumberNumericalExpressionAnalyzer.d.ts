import { TNumberNumericalExpressionData } from '../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';
import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
export declare class NumberNumericalExpressionAnalyzer implements INumberNumericalExpressionAnalyzer {
    static readonly defaultAdditionalPartsCount: number;
    private static readonly delta;
    private readonly numberFactorsMap;
    private readonly randomGenerator;
    constructor(randomGenerator: IRandomGenerator);
    analyze(number: number, additionalPartsCount: number): TNumberNumericalExpressionData;
    private generateAdditionParts;
    private mixWithMultiplyParts;
}
