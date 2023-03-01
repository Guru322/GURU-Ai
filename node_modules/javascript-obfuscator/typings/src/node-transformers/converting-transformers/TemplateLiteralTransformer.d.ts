import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class TemplateLiteralTransformer extends AbstractNodeTransformer {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    private static isLiteralNodeWithStringValue;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(templateLiteralNode: ESTree.TemplateLiteral, parentNode: ESTree.Node): ESTree.Node;
    private transformTemplateLiteralNode;
}
