import { TDictionary } from '../types/TDictionary';
import { TStatement } from '../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IPrevailingKindOfVariablesAnalyzer } from '../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
export declare class CustomCodeHelperFormatter implements ICustomCodeHelperFormatter {
    private readonly prevailingKindOfVariables;
    constructor(prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer);
    formatTemplate<TMapping extends TDictionary>(template: string, mapping: TMapping): string;
    formatStructure(statements: TStatement[]): TStatement[];
}
