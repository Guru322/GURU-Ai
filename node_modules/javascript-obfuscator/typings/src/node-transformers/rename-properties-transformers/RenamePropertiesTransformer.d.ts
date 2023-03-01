import * as ESTree from 'estree';
import { IRenamePropertiesReplacer } from '../../interfaces/node-transformers/rename-properties-transformers/replacer/IRenamePropertiesReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class RenamePropertiesTransformer extends AbstractNodeTransformer {
    private readonly renamePropertiesReplacer;
    constructor(renamePropertiesReplacer: IRenamePropertiesReplacer, randomGenerator: IRandomGenerator, options: IOptions);
    private static isValidPropertyNode;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    prepareNode(node: ESTree.Node, parentNode: ESTree.Node): void;
    transformNode(node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
    private analyzeAutoExcludedPropertyNames;
}
