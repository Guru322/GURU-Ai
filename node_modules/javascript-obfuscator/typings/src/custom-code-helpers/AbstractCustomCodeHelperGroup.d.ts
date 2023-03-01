import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { ICustomCodeHelper } from '../interfaces/custom-code-helpers/ICustomCodeHelper';
import { ICustomCodeHelperGroup } from '../interfaces/custom-code-helpers/ICustomCodeHelperGroup';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { CustomCodeHelper } from '../enums/custom-code-helpers/CustomCodeHelper';
export declare abstract class AbstractCustomCodeHelperGroup implements ICustomCodeHelperGroup {
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    protected abstract customCodeHelpers: Map<CustomCodeHelper, ICustomCodeHelper>;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    getCustomCodeHelpers(): Map<CustomCodeHelper, ICustomCodeHelper>;
    protected appendCustomNodeIfExist(customCodeHelperName: CustomCodeHelper, callback: (customCodeHelper: ICustomCodeHelper) => void): void;
    protected getRandomCallsGraphIndex(callsGraphLength: number): number;
    abstract initialize(): void;
}
