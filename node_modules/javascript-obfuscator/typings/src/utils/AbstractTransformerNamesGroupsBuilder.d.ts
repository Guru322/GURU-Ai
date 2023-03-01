import { TDictionary } from '../types/TDictionary';
import { ILevelledTopologicalSorter } from '../interfaces/utils/ILevelledTopologicalSorter';
import { ITransformer } from '../interfaces/ITransformer';
import { ITransformerNamesGroupsBuilder } from '../interfaces/utils/ITransformerNamesGroupsBuilder';
export declare abstract class AbstractTransformerNamesGroupsBuilder<TTransformerName extends string, TTransformer extends ITransformer<TTransformerName>> implements ITransformerNamesGroupsBuilder<TTransformerName, TTransformer> {
    private readonly levelledTopologicalSorter;
    constructor(levelledTopologicalSorter: ILevelledTopologicalSorter<TTransformerName>);
    build(normalizedTransformers: TDictionary<TTransformer>): TTransformerName[][];
    private buildTransformersRelationEdges;
}
