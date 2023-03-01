import { interfaces } from 'inversify';
import { TConstructor } from '../types/TConstructor';
import { TInputOptions } from '../types/options/TInputOptions';
import { IInversifyContainerFacade } from '../interfaces/container/IInversifyContainerFacade';
export declare class InversifyContainerFacade implements IInversifyContainerFacade {
    private readonly container;
    constructor();
    static getFactory<T extends string, U>(serviceIdentifier: interfaces.ServiceIdentifier<U>): (context: interfaces.Context) => (bindingName: T) => U;
    static getCacheFactory<T extends string, U>(serviceIdentifier: interfaces.ServiceIdentifier<U>): (context: interfaces.Context) => (bindingName: T) => U;
    static getConstructorFactory<T extends string, U>(serviceIdentifier: interfaces.ServiceIdentifier<TConstructor<Record<string, any>[], U>>, ...dependencies: interfaces.ServiceIdentifier<TConstructor<Record<string, any>[], U>>[]): (context: interfaces.Context) => (bindingName: T) => U;
    get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
    getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T;
    load(sourceCode: string, sourceMap: string, options: TInputOptions): void;
    unload(): void;
}
