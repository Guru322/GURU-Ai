/// <reference types="estraverse" />
import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';
import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../enums/node-transformers/NodeTransformationStage';
export declare abstract class AbstractNodeTransformer implements INodeTransformer {
    readonly runAfter: NodeTransformer[] | undefined;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    abstract getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    abstract transformNode(node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node | estraverse.VisitorOption;
}
