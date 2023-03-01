import * as ESTree from 'estree';
import { TScopeIdentifiersTraverserCallback } from '../types/node/TScopeIdentifiersTraverserCallback';
import { IScopeAnalyzer } from '../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
import { IScopeIdentifiersTraverser } from '../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeIdentifiersTraverserCallbackData } from '../interfaces/node/IScopeIdentifiersTraverserCallbackData';
import { IScopeThroughIdentifiersTraverserCallbackData } from '../interfaces/node/IScopeThroughIdentifiersTraverserCallbackData';
export declare class ScopeIdentifiersTraverser implements IScopeIdentifiersTraverser {
    private static readonly argumentsVariableName;
    private static readonly globalScopeNames;
    private readonly scopeAnalyzer;
    constructor(scopeAnalyzer: IScopeAnalyzer);
    traverseScopeIdentifiers(programNode: ESTree.Program, parentNode: ESTree.Node | null, callback: TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>): void;
    traverseScopeThroughIdentifiers(programNode: ESTree.Program, parentNode: ESTree.Node | null, callback: TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>): void;
    private traverseScopeIdentifiersRecursive;
    private traverseScopeThroughIdentifiersRecursive;
}
