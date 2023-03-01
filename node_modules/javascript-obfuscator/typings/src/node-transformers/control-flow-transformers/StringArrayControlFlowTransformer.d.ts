/// <reference types="estraverse" />
import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';
import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowReplacerFactory } from '../../types/container/node-transformers/TControlFlowReplacerFactory';
import { TControlFlowStorageFactoryCreator } from '../../types/container/node-transformers/TControlFlowStorageFactoryCreator';
import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';
import { IControlFlowStorage } from '../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { ControlFlowReplacer } from '../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { FunctionControlFlowTransformer } from './FunctionControlFlowTransformer';
export declare class StringArrayControlFlowTransformer extends FunctionControlFlowTransformer {
    readonly runAfter: NodeTransformer[];
    protected readonly controlFlowReplacersMap: Map<string, ControlFlowReplacer>;
    protected readonly controlFlowStorageNodes: WeakSet<ESTree.VariableDeclaration>;
    constructor(controlFlowStorageFactoryCreator: TControlFlowStorageFactoryCreator, controlFlowReplacerFactory: TControlFlowReplacerFactory, controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory, randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    protected transformFunctionBodyNode(node: ESTree.Node, parentNode: ESTree.Node | null, functionNode: ESTree.Function, controlFlowStorage: IControlFlowStorage): estraverse.VisitorOption | ESTree.Node;
    protected getControlFlowStorage(hostNode: TNodeWithStatements): IControlFlowStorage;
    protected appendControlFlowStorageNode(hostNode: TNodeWithStatements, controlFlowStorageNode: ESTree.VariableDeclaration): void;
    protected isAllowedTransformationByThreshold(): boolean;
}
