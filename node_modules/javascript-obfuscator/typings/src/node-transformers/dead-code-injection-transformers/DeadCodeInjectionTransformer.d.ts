/// <reference types="estraverse" />
import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';
import { TDeadNodeInjectionCustomNodeFactory } from '../../types/container/custom-nodes/TDeadNodeInjectionCustomNodeFactory';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { INodeTransformersRunner } from '../../interfaces/node-transformers/INodeTransformersRunner';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class DeadCodeInjectionTransformer extends AbstractNodeTransformer {
    private static readonly deadCodeInjectionRootAstHostNodeName;
    private static readonly maxNestedBlockStatementsCount;
    private static readonly minCollectedBlockStatementsCount;
    private static readonly transformersToRenameBlockScopeIdentifiers;
    private readonly deadCodeInjectionRootAstHostNodeSet;
    private readonly collectedBlockStatements;
    private collectedBlockStatementsTotalLength;
    private readonly deadCodeInjectionCustomNodeFactory;
    private readonly transformersRunner;
    constructor(deadCodeInjectionCustomNodeFactory: TDeadNodeInjectionCustomNodeFactory, transformersRunner: INodeTransformersRunner, randomGenerator: IRandomGenerator, options: IOptions);
    private static isProhibitedNodeInsideCollectedBlockStatement;
    private static isScopeHoistingFunctionDeclaration;
    private static isValidCollectedBlockStatementNode;
    private static isValidWrappedBlockStatementNode;
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    prepareNode(programNode: ESTree.Node, parentNode: ESTree.Node): void;
    transformNode(blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node | estraverse.VisitorOption;
    restoreNode(deadCodeInjectionRootAstHostNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node;
    private isDeadCodeInjectionRootAstHostNode;
    private makeClonedBlockStatementNodeUnique;
    private replaceBlockStatementNode;
}
