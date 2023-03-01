import * as ESTree from 'estree';
export declare class NodeUtils {
    static addXVerbatimPropertyTo(literalNode: ESTree.Literal): ESTree.Literal;
    static clone<T extends ESTree.Node = ESTree.Node>(astTree: T): T;
    static convertCodeToStructure(code: string): ESTree.Statement[];
    static convertStructureToCode(structure: ESTree.Node[]): string;
    static getUnaryExpressionArgumentNode(unaryExpressionNode: ESTree.UnaryExpression): ESTree.Node;
    static parentizeAst<T extends ESTree.Node = ESTree.Node>(astTree: T): T;
    static parentizeNode<T extends ESTree.Node = ESTree.Node>(node: T, parentNode: ESTree.Node | null): T;
    private static cloneRecursive;
}
