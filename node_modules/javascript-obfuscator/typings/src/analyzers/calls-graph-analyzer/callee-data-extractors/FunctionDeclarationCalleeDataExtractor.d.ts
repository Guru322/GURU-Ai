import * as ESTree from 'estree';
import { ICalleeData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeData';
import { AbstractCalleeDataExtractor } from './AbstractCalleeDataExtractor';
export declare class FunctionDeclarationCalleeDataExtractor extends AbstractCalleeDataExtractor {
    extract(blockScopeBody: ESTree.Node[], callee: ESTree.Identifier): ICalleeData | null;
    private getCalleeBlockStatement;
}
