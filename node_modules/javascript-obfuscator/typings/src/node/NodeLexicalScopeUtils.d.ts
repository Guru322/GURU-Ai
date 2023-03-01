import * as ESTree from 'estree';
import { TNodeWithLexicalScope } from '../types/node/TNodeWithLexicalScope';
export declare class NodeLexicalScopeUtils {
    static getLexicalScope(node: ESTree.Node): TNodeWithLexicalScope | undefined;
    static getLexicalScopes(node: ESTree.Node): TNodeWithLexicalScope[];
    private static getLexicalScopesRecursive;
}
