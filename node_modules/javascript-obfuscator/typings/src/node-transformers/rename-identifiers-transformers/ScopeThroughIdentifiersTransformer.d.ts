import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IThroughIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IThroughIdentifierReplacer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class ScopeThroughIdentifiersTransformer extends AbstractNodeTransformer {
    protected readonly scopeIdentifiersTraverser: IScopeIdentifiersTraverser;
    protected readonly throughIdentifierReplacer: IThroughIdentifierReplacer;
    constructor(throughIdentifierReplacer: IThroughIdentifierReplacer, scopeIdentifiersTraverser: IScopeIdentifiersTraverser, randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node;
    protected transformScopeThroughIdentifiers(reference: eslintScope.Reference, lexicalScopeNode: TNodeWithLexicalScope): void;
    protected replaceIdentifierName(reference: eslintScope.Reference): void;
}
