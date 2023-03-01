import * as ESTree from 'estree';
export interface IIteratedStatementsSimplifyData {
    startIndex: number | null;
    unwrappedExpressions: ESTree.Expression[];
    hasReturnStatement: boolean;
    hasStatementsAfterReturnStatement: boolean;
}
