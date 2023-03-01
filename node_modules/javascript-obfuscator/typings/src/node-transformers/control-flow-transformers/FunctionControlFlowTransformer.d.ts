/// <reference types="estraverse" />
import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';
import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowReplacerFactory } from '../../types/container/node-transformers/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/node-transformers/TControlFlowStorageFactory';
import { TControlFlowStorageFactoryCreator } from '../../types/container/node-transformers/TControlFlowStorageFactoryCreator';
import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';
import { IControlFlowStorage } from '../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { ControlFlowReplacer } from '../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class FunctionControlFlowTransformer extends AbstractNodeTransformer {
    private static readonly hostNodeSearchMinDepth;
    private static readonly hostNodeSearchMaxDepth;
    protected readonly controlFlowReplacersMap: Map<string, ControlFlowReplacer>;
    protected readonly controlFlowData: WeakMap<TNodeWithStatements, IControlFlowStorage>;
    protected readonly hostNodesWithControlFlowNode: WeakMap<TNodeWithStatements, ESTree.VariableDeclaration>;
    protected readonly controlFlowReplacerFactory: TControlFlowReplacerFactory;
    protected controlFlowStorageFactory: TControlFlowStorageFactory;
    protected readonly controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory;
    protected readonly visitedFunctionNodes: WeakSet<ESTree.Function>;
    constructor(controlFlowStorageFactoryCreator: TControlFlowStorageFactoryCreator, controlFlowReplacerFactory: TControlFlowReplacerFactory, controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory, randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(functionNode: ESTree.Function, parentNode: ESTree.Node): ESTree.Function;
    protected transformFunctionBody(functionNode: ESTree.Function, controlFlowStorage: IControlFlowStorage): void;
    protected transformFunctionBodyNode(node: ESTree.Node, parentNode: ESTree.Node | null, functionNode: ESTree.Function, controlFlowStorage: IControlFlowStorage): estraverse.VisitorOption | ESTree.Node;
    protected getHostNode(functionNodeBody: ESTree.BlockStatement): TNodeWithStatements;
    protected getControlFlowStorage(hostNode: TNodeWithStatements): IControlFlowStorage;
    protected getControlFlowStorageNode(controlFlowStorage: IControlFlowStorage): ESTree.VariableDeclaration;
    protected appendControlFlowStorageNode(hostNode: TNodeWithStatements, controlFlowStorageNode: ESTree.VariableDeclaration): void;
    protected isVisitedFunctionNode(node: ESTree.Node): boolean;
    protected isAllowedTransformationByThreshold(): boolean;
}
