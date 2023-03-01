import { TDictionary } from '../../types/TDictionary';
export interface ITransformerNamesGroupsBuilder<TTransformerName extends string, TTransformer> {
    build(normalizedTransformers: TDictionary<TTransformer>): TTransformerName[][];
}
