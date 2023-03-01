import * as ESTree from 'estree';
import { IAnalyzer } from '../IAnalyzer';
export interface IPrevailingKindOfVariablesAnalyzer extends IAnalyzer<[ESTree.Program], void> {
    analyze(astTree: ESTree.Program): void;
    getPrevailingKind(): ESTree.VariableDeclaration['kind'];
}
