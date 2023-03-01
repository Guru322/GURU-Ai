import * as ESTree from 'estree';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class EscapeSequenceTransformer extends AbstractNodeTransformer {
    readonly runAfter: NodeTransformer[];
    private readonly escapeSequenceEncoder;
    constructor(randomGenerator: IRandomGenerator, options: IOptions, escapeSequenceEncoder: IEscapeSequenceEncoder);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(literalNode: ESTree.Literal, parentNode: ESTree.Node | null): ESTree.Literal;
}
