import * as ESTree from 'estree';
import { ICalleeData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeData';
import { AbstractCalleeDataExtractor } from './AbstractCalleeDataExtractor';
export declare class ObjectExpressionCalleeDataExtractor extends AbstractCalleeDataExtractor {
    private static isValidTargetPropertyNode;
    extract(blockScopeBody: ESTree.Node[], callee: ESTree.MemberExpression): ICalleeData | null;
    private createObjectMembersCallsChain;
    private getCalleeBlockStatement;
    private findCalleeBlockStatement;
}
