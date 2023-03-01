/// <reference types="node" />
import type { BinaryNode } from '../types';
export declare const encodeBinaryNodeLegacy: (node: BinaryNode) => Buffer;
export declare const decodeBinaryNodeLegacy: (data: Buffer, indexRef: {
    index: number;
}) => BinaryNode;
