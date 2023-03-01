import * as ESTree from 'estree';
import { TNodeWithStatements } from '../types/node/TNodeWithStatements';
import { TStatement } from '../types/node/TStatement';
import { ICallsGraphData } from '../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
export declare class NodeAppender {
    static append(nodeWithStatements: TNodeWithStatements, statements: TStatement[]): void;
    static appendToOptimalBlockScope(callsGraphData: ICallsGraphData[], nodeWithStatements: TNodeWithStatements, bodyStatements: TStatement[], index?: number): void;
    static getOptimalBlockScope(callsGraphData: ICallsGraphData[], index: number, deep?: number): ESTree.BlockStatement;
    static getScopeStatements(nodeWithStatements: TNodeWithStatements): TStatement[];
    static insertBefore(nodeWithStatements: TNodeWithStatements, statements: TStatement[], target: ESTree.Statement): void;
    static insertAfter(nodeWithStatements: TNodeWithStatements, statements: TStatement[], target: ESTree.Statement): void;
    static insertAtIndex(nodeWithStatements: TNodeWithStatements, statements: TStatement[], index: number): void;
    static prepend(nodeWithStatements: TNodeWithStatements, statements: TStatement[]): void;
    static remove(nodeWithStatements: TNodeWithStatements, statement: ESTree.Statement): void;
    private static parentizeScopeStatementsBeforeAppend;
    private static setScopeStatements;
}
