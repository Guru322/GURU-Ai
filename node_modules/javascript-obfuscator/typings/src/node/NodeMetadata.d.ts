import * as ESTree from 'estree';
export declare class NodeMetadata {
    static set<T extends ESTree.Node = ESTree.Node>(node: T, metadata: Partial<T['metadata']>): void;
    static get<T extends ESTree.BaseNodeMetadata, TMetadataKey extends keyof T>(node: ESTree.Node, metadataKey: TMetadataKey): T[TMetadataKey] | undefined;
    static isEvalHostNode(node: ESTree.Node): boolean;
    static isForceTransformNode(node: ESTree.Node): boolean;
    static isIgnoredNode(node: ESTree.Node): boolean;
    static isPropertyKeyToRenameNode(node: ESTree.Identifier | ESTree.Literal): boolean;
    static isStringArrayCallLiteralNode(literalNode: ESTree.Literal): boolean;
}
