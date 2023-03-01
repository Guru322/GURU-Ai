import * as ESTree from 'estree';
import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IPrevailingKindOfVariablesAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
export declare class PrevailingKindOfVariablesAnalyzer implements IPrevailingKindOfVariablesAnalyzer {
    private static readonly defaultKindOfVariables;
    private readonly arrayUtils;
    private prevailingKindOfVariables;
    constructor(arrayUtils: IArrayUtils);
    analyze(astTree: ESTree.Program): void;
    getPrevailingKind(): ESTree.VariableDeclaration['kind'];
}
