import * as ESTree from 'estree';
import { TCalleeDataExtractorFactory } from '../../types/container/calls-graph-analyzer/TCalleeDataExtractorFactory';
import { ICallsGraphAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';
import { ICallsGraphData } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
export declare class CallsGraphAnalyzer implements ICallsGraphAnalyzer {
    private static readonly calleeDataExtractorsList;
    private static readonly limitThresholdActivationLength;
    private static readonly limitThreshold;
    private readonly calleeDataExtractorFactory;
    constructor(calleeDataExtractorFactory: TCalleeDataExtractorFactory);
    static getLimitIndex(blockScopeBodyLength: number): number;
    analyze(astTree: ESTree.Program): ICallsGraphData[];
    private analyzeRecursive;
    private analyzeCallExpressionNode;
}
