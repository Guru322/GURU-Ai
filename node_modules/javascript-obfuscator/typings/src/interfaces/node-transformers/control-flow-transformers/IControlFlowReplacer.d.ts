import * as ESTree from 'estree';
import { IControlFlowStorage } from '../../storages/control-flow-transformers/IControlFlowStorage';
export interface IControlFlowReplacer {
    replace(node: ESTree.Node, parentNode: ESTree.Node, controlFlowStorage: IControlFlowStorage): ESTree.Node;
    generateStorageKey(controlFlowStorage: IControlFlowStorage): string;
}
