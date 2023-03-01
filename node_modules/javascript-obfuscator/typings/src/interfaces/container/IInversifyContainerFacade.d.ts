import { interfaces } from 'inversify';
import { TInputOptions } from '../../types/options/TInputOptions';
export interface IInversifyContainerFacade {
    get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
    getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T;
    load(sourceCode: string, sourceMap: string, options: TInputOptions): void;
    unload(): void;
}
