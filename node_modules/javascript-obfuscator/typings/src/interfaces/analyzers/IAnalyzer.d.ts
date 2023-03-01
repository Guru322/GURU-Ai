export interface IAnalyzer<TArgs extends unknown[], TData extends unknown> {
    analyze(...args: TArgs): TData;
}
