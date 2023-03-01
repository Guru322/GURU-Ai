import * as ESTree from 'estree';
import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class DirectivePlacementTransformer extends AbstractNodeTransformer {
    readonly runAfter: NodeTransformer[];
    private readonly lexicalScopeDirectives;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    analyzeNode(nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements, parentNode: ESTree.Node): TNodeWithLexicalScopeStatements;
    transformNode(nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements, parentNode: ESTree.Node): TNodeWithLexicalScopeStatements;
}
