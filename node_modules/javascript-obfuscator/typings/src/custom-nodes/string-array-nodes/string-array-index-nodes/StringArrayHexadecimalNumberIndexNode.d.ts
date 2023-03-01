import * as ESTree from 'estree';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { AbstractStringArrayIndexNode } from './AbstractStringArrayIndexNode';
export declare class StringArrayHexadecimalNumberIndexNode extends AbstractStringArrayIndexNode {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getNode(index: number): ESTree.Expression;
}
