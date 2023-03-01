import * as ESTree from 'estree';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
export interface INodeTransformersRunner {
    transform<T extends ESTree.Node = ESTree.Program>(astTree: T, nodeTransformers: NodeTransformer[], nodeTransformationStage: NodeTransformationStage): T;
}
