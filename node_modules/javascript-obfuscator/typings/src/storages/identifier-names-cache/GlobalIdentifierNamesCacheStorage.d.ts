import { IGlobalIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { MapStorage } from '../MapStorage';
export declare class GlobalIdentifierNamesCacheStorage extends MapStorage<string, string> implements IGlobalIdentifierNamesCacheStorage {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    initialize(): void;
}
