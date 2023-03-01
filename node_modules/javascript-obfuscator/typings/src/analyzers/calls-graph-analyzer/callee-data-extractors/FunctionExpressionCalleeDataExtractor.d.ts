import * as ESTree from 'estree';
import { ICalleeData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeData';
import { AbstractCalleeDataExtractor } from './AbstractCalleeDataExtractor';
export declare class FunctionExpressionCalleeDataExtractor extends AbstractCalleeDataExtractor {
    extract(blockScopeBody: ESTree.Node[], callee: ESTree.Identifier | ESTree.FunctionExpression): ICalleeData | null;
    private getCalleeBlockStatement;
}
