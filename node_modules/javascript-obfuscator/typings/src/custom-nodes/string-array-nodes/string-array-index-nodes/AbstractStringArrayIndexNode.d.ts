import * as ESTree from 'estree';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStringArrayIndexNode } from '../../../interfaces/custom-nodes/string-array-nodes/IStringArrayIndexNode';
export declare abstract class AbstractStringArrayIndexNode implements IStringArrayIndexNode {
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    abstract getNode(index: number): ESTree.Expression;
}
