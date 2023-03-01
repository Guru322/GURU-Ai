import * as ESTree from 'estree';
import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';
import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
export declare abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    protected readonly controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory;
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    protected readonly replacerDataByControlFlowStorageId: Map<string, Map<string | number, string[]>>;
    constructor(controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    generateStorageKey(controlFlowStorage: IControlFlowStorage): string;
    protected insertCustomNodeToControlFlowStorage(customNode: ICustomNode, controlFlowStorage: IControlFlowStorage, replacerId: string | number, usingExistingIdentifierChance: number): string;
    abstract replace(node: ESTree.Node, parentNode: ESTree.Node, controlFlowStorage: IControlFlowStorage): ESTree.Node;
}
