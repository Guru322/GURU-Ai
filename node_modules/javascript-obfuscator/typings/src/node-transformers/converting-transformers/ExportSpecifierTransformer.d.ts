import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class ExportSpecifierTransformer extends AbstractNodeTransformer {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(exportSpecifierNode: ESTree.ExportSpecifier, parentNode: ESTree.Node): ESTree.Node;
}
