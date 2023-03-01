export interface IInitializable<T extends unknown[] = never[]> {
    [key: string]: any;
    initialize(...args: T): void;
}
