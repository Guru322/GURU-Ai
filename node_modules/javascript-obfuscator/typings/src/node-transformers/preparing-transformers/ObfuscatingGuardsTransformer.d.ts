import * as ESTree from 'estree';
import { TObfuscatingGuardFactory } from '../../types/container/node-transformers/TObfuscatingGuardFactory';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class ObfuscatingGuardsTransformer extends AbstractNodeTransformer {
    private static readonly obfuscatingGuardsList;
    readonly runAfter: NodeTransformer[];
    private readonly obfuscatingGuards;
    constructor(obfuscatingGuardFactory: TObfuscatingGuardFactory, randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node;
    private setNodeMetadata;
}
