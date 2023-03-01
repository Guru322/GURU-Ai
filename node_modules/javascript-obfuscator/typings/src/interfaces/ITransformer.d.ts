export interface ITransformer<TTransformerName extends string> {
    runAfter?: TTransformerName[];
}
