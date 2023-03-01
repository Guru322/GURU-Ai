import { IOptions } from '../../interfaces/options/IOptions';
import { IPropertyIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IPropertyIdentifierNamesCacheStorage';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { MapStorage } from '../MapStorage';
export declare class PropertyIdentifierNamesCacheStorage extends MapStorage<string, string> implements IPropertyIdentifierNamesCacheStorage {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    initialize(): void;
}
