/// <reference types="estraverse" />
import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';
import { ITransformer } from '../ITransformer';
import { IVisitor } from './IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
export interface INodeTransformer extends ITransformer<NodeTransformer> {
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    prepareNode?(node: ESTree.Node, parentNode: ESTree.Node | null): void;
    restoreNode?(node: ESTree.Node, parentNode: ESTree.Node | null): void;
    transformNode(node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | estraverse.VisitorOption;
}
