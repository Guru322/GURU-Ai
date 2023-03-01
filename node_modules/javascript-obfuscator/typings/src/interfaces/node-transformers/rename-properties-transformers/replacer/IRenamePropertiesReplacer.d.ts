import * as ESTree from 'estree';
export interface IRenamePropertiesReplacer {
    excludePropertyName(propertyName: string): void;
    replace(node: ESTree.Identifier | ESTree.Literal): ESTree.Identifier | ESTree.Literal;
}
