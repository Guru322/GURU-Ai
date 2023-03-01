import * as ESTree from 'estree';
import { IIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class ScopeIdentifiersTransformer extends AbstractNodeTransformer {
    private readonly identifierReplacer;
    private readonly lexicalScopesWithObjectPatternWithoutDeclarationMap;
    private readonly scopeIdentifiersTraverser;
    constructor(identifierReplacer: IIdentifierReplacer, randomGenerator: IRandomGenerator, options: IOptions, scopeIdentifiersTraverser: IScopeIdentifiersTraverser);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node;
    private transformScopeVariableIdentifiers;
    private storeIdentifierName;
    private replaceIdentifierName;
    private isReplaceableIdentifierNode;
    private isProhibitedClassDeclarationNameIdentifierNode;
    private isProhibitedExportNamedClassDeclarationIdentifierNode;
    private isProhibitedExportNamedFunctionDeclarationIdentifierNode;
    private isProhibitedExportNamedVariableDeclarationIdentifierNode;
    private isProhibitedImportSpecifierNode;
    private isProhibitedPropertyIdentifierNode;
    private isProhibitedPropertyAssignmentPatternIdentifierNode;
    private isProhibitedVariableNameUsedInObjectPatternNode;
}
