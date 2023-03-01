import * as ESTree from 'estree';
export interface IStatementSimplifyData {
    leadingStatements: ESTree.Statement[];
    trailingStatement: {
        statement: ESTree.Statement;
        expression: ESTree.Expression;
    } | null;
    hasReturnStatement: boolean;
    hasSingleExpression: boolean;
}
