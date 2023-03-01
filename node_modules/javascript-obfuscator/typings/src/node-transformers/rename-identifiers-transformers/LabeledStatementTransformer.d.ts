import * as ESTree from 'estree';
import { IIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class LabeledStatementTransformer extends AbstractNodeTransformer {
    private readonly identifierReplacer;
    constructor(identifierReplacer: IIdentifierReplacer, randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(labeledStatementNode: ESTree.LabeledStatement, parentNode: ESTree.Node): ESTree.Node;
    private storeLabeledStatementName;
    private replaceLabeledStatementName;
}
