import * as ESTree from 'estree';
import { TCustomCodeHelperGroupStorage } from '../../types/storages/TCustomCodeHelperGroupStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICallsGraphAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';
import { IPrevailingKindOfVariablesAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class CustomCodeHelpersTransformer extends AbstractNodeTransformer {
    readonly runAfter: NodeTransformer[];
    private readonly customCodeHelperGroupStorage;
    private readonly callsGraphAnalyzer;
    private callsGraphData;
    private readonly prevailingKindOfVariablesAnalyzer;
    constructor(callsGraphAnalyzer: ICallsGraphAnalyzer, prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer, customCodeHelperGroupStorage: TCustomCodeHelperGroupStorage, randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    prepareNode(node: ESTree.Program, parentNode: ESTree.Node | null): void;
    transformNode(node: ESTree.Program, parentNode: ESTree.Node | null): ESTree.Node;
    private appendCustomNodesForPreparingStage;
    private appendCustomNodesForStage;
}
