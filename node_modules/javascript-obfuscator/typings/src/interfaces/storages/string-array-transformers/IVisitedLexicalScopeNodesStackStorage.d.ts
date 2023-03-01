import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';
import { IArrayStorage } from '../IArrayStorage';
export interface IVisitedLexicalScopeNodesStackStorage extends IArrayStorage<TNodeWithLexicalScopeStatements> {
    getLastElement(): TNodeWithLexicalScopeStatements | undefined;
    getPenultimateElement(): TNodeWithLexicalScopeStatements | undefined;
    pop(): TNodeWithLexicalScopeStatements | undefined;
    push(lexicalScopeBodyNode: TNodeWithLexicalScopeStatements): void;
}
