import * as ESTree from 'estree';
import { TNumberLiteralNode } from '../types/node/TNumberLiteralNode';
import { TStringLiteralNode } from '../types/node/TStringLiteralNode';
export declare class NodeLiteralUtils {
    static isNumberLiteralNode(literalNode: ESTree.Literal): literalNode is TNumberLiteralNode;
    static isStringLiteralNode(literalNode: ESTree.Literal): literalNode is TStringLiteralNode;
    static isProhibitedLiteralNode(literalNode: ESTree.Literal, parentNode: ESTree.Node): boolean;
}
