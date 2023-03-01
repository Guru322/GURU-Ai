import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class ClassFieldTransformer extends AbstractNodeTransformer {
    private static readonly ignoredNames;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(classFieldNode: ESTree.MethodDefinition | ESTree.PropertyDefinition, parentNode: ESTree.Node): ESTree.Node;
    private replaceIdentifierKey;
    private replaceLiteralKey;
}
