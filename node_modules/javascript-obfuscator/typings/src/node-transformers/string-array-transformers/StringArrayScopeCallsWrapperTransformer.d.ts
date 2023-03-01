import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayCustomNodeFactory';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrappersDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrappersDataStorage';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class StringArrayScopeCallsWrapperTransformer extends AbstractNodeTransformer {
    readonly runAfter: NodeTransformer[];
    private readonly stringArrayStorage;
    private readonly stringArrayScopeCallsWrappersDataStorage;
    private readonly stringArrayTransformerCustomNodeFactory;
    private readonly visitedLexicalScopeNodesStackStorage;
    constructor(randomGenerator: IRandomGenerator, options: IOptions, visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage, stringArrayStorage: IStringArrayStorage, stringArrayScopeCallsWrappersDataStorage: IStringArrayScopeCallsWrappersDataStorage, stringArrayTransformerCustomNodeFactory: TStringArrayCustomNodeFactory);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(lexicalScopeBodyNode: TNodeWithLexicalScopeStatements): TNodeWithLexicalScopeStatements;
    private getRootStringArrayCallsWrapperData;
    private getUpperStringArrayCallsWrapperData;
    private getAndAppendStringArrayScopeCallsWrapperNode;
    private getStringArrayScopeCallsWrapperVariableNode;
    private getStringArrayScopeCallsWrapperFunctionNode;
    private onLexicalScopeNodeEnter;
    private onLexicalScopeNodeLeave;
}
