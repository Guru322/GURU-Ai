import * as ESTree from 'estree';
import { TNodeTransformerFactory } from '../types/container/node-transformers/TNodeTransformerFactory';
import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';
import { INodeTransformersRunner } from '../interfaces/node-transformers/INodeTransformersRunner';
import { ITransformerNamesGroupsBuilder } from '../interfaces/utils/ITransformerNamesGroupsBuilder';
import { NodeTransformer } from '../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../enums/node-transformers/NodeTransformationStage';
export declare class NodeTransformersRunner implements INodeTransformersRunner {
    private readonly nodeTransformerFactory;
    private readonly nodeTransformerNamesGroupsBuilder;
    constructor(nodeTransformerFactory: TNodeTransformerFactory, nodeTransformerNamesGroupsBuilder: ITransformerNamesGroupsBuilder<NodeTransformer, INodeTransformer>);
    transform<T extends ESTree.Node = ESTree.Program>(astTree: T, nodeTransformerNames: NodeTransformer[], nodeTransformationStage: NodeTransformationStage): T;
    private buildNormalizedNodeTransformers;
    private mergeVisitorsForDirection;
}
