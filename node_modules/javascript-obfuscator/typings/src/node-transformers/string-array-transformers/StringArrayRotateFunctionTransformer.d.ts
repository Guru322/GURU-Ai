import * as ESTree from 'estree';
import { TCustomCodeHelperFactory } from '../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { INodeTransformersRunner } from '../../interfaces/node-transformers/INodeTransformersRunner';
import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class StringArrayRotateFunctionTransformer extends AbstractNodeTransformer {
    private static readonly stringArrayRotateFunctionTransformers;
    private static readonly comparisonExpressionAdditionalPartsCount;
    private readonly numberNumericalExpressionAnalyzer;
    private readonly stringArrayStorage;
    private readonly stringArrayStorageAnalyzer;
    private readonly customCodeHelperFactory;
    private readonly transformersRunner;
    constructor(randomGenerator: IRandomGenerator, options: IOptions, transformersRunner: INodeTransformersRunner, stringArrayStorage: IStringArrayStorage, stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer, customCodeHelperFactory: TCustomCodeHelperFactory, numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer);
    private static isProgramNodeHasStringLiterals;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(programNode: ESTree.Program): ESTree.Node;
    private getStringArrayRotateFunctionNode;
    private isComparisonExpressionStringLiteralNode;
    private getComparisonValue;
}
