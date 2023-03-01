import * as ESTree from 'estree';
import { ICalleeData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeData';
import { ICalleeDataExtractor } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeDataExtractor';
export declare abstract class AbstractCalleeDataExtractor implements ICalleeDataExtractor {
    abstract extract(blockScopeBody: ESTree.Node[], callee: ESTree.Node): ICalleeData | null;
}
