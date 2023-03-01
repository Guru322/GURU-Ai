import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';
import { IScopeAnalyzer } from '../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
export declare class ScopeAnalyzer implements IScopeAnalyzer {
    private static readonly eslintScopeOptions;
    private static readonly sourceTypes;
    private static readonly emptyRangeValue;
    private scopeManager;
    private static attachMissingRanges;
    private static isRootNode;
    analyze(astTree: ESTree.Node): void;
    acquireScope(node: ESTree.Node): eslintScope.Scope;
    private sanitizeScopes;
}
