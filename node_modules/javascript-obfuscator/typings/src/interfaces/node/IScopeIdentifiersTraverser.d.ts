import * as ESTree from 'estree';
import { TScopeIdentifiersTraverserCallback } from '../../types/node/TScopeIdentifiersTraverserCallback';
import { IScopeIdentifiersTraverserCallbackData } from './IScopeIdentifiersTraverserCallbackData';
import { IScopeThroughIdentifiersTraverserCallbackData } from './IScopeThroughIdentifiersTraverserCallbackData';
export interface IScopeIdentifiersTraverser {
    traverseScopeIdentifiers(programNode: ESTree.Program, parentNode: ESTree.Node | null, callback: TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>): void;
    traverseScopeThroughIdentifiers(node: ESTree.Node, parentNode: ESTree.Node | null, callback: TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>): void;
}
