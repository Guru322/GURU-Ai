import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';
import { IAnalyzer } from '../IAnalyzer';
export interface IScopeAnalyzer extends IAnalyzer<[ESTree.Node], void> {
    analyze(astTree: ESTree.Node): void;
    acquireScope(node: ESTree.Node): eslintScope.Scope;
}
