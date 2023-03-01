import { TCustomCodeHelperGroupFactory } from '../../types/container/custom-code-helpers/TCustomCodeHelperGroupFactory';
import { ICustomCodeHelperGroup } from '../../interfaces/custom-code-helpers/ICustomCodeHelperGroup';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { MapStorage } from '../MapStorage';
export declare class CustomCodeHelperGroupStorage extends MapStorage<string, ICustomCodeHelperGroup> {
    private static readonly customCodeHelperGroupsList;
    private readonly customCodeHelperGroupFactory;
    constructor(customCodeHelperGroupFactory: TCustomCodeHelperGroupFactory, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(): void;
}
