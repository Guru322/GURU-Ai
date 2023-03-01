import * as ESTree from 'estree';
import { TNodeWithStatements } from '../types/node/TNodeWithStatements';
import { TStatement } from '../types/node/TStatement';
export declare class NodeStatementUtils {
    static getParentNodeWithStatements(node: ESTree.Node): TNodeWithStatements;
    static getParentNodesWithStatements(node: ESTree.Node): TNodeWithStatements[];
    static getNextSiblingStatement(statement: ESTree.Statement): TStatement | null;
    static getPreviousSiblingStatement(statement: ESTree.Statement): TStatement | null;
    static getRootStatementOfNode(node: ESTree.Node): ESTree.Statement;
    static getScopeOfNode(node: ESTree.Node): TNodeWithStatements;
    private static getParentNodesWithStatementsRecursive;
    private static getSiblingStatementByOffset;
}
