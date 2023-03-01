import * as ESTree from 'estree';
export interface IThroughIdentifierReplacer {
    replace(identifierNode: ESTree.Identifier): ESTree.Identifier;
}
