import * as ESTree from 'estree';
import { TNodeWithLexicalScope } from '../../../../types/node/TNodeWithLexicalScope';
export interface IIdentifierReplacer {
    storeGlobalName(identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
    storeLocalName(identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
    replace(node: ESTree.Node, lexicalScopeNode?: TNodeWithLexicalScope, nodeIdentifier?: number): ESTree.Identifier;
    preserveName(identifierNode: ESTree.Identifier): void;
    preserveNameForLexicalScope(identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
}
