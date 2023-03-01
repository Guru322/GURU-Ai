import * as ESTree from 'estree';
import { IAnalyzer } from '../IAnalyzer';
import { ICallsGraphData } from './ICallsGraphData';
export interface ICallsGraphAnalyzer extends IAnalyzer<[ESTree.Program], ICallsGraphData[]> {
    analyze(astTree: ESTree.Program): ICallsGraphData[];
}
