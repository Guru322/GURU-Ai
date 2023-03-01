import { TDictionary } from '../../types/TDictionary';
import { TStatement } from '../../types/node/TStatement';
export interface ICustomCodeHelperFormatter {
    formatTemplate<TMapping extends TDictionary>(template: string, mapping: TMapping): string;
    formatStructure(structure: TStatement[]): TStatement[];
}
