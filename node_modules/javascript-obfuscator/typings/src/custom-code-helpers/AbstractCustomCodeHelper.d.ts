import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../types/node/TStatement';
import { ICustomCodeHelper } from '../interfaces/custom-code-helpers/ICustomCodeHelper';
import { ICustomCodeHelperFormatter } from '../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
export declare abstract class AbstractCustomCodeHelper<TInitialData extends unknown[] = unknown[]> implements ICustomCodeHelper<TInitialData> {
    private static readonly globalVariableTemplateFunctions;
    protected cachedNode: TStatement[] | null;
    protected readonly customCodeHelperFormatter: ICustomCodeHelperFormatter;
    protected readonly customCodeHelperObfuscator: ICustomCodeHelperObfuscator;
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, customCodeHelperObfuscator: ICustomCodeHelperObfuscator, randomGenerator: IRandomGenerator, options: IOptions);
    getNode(): TStatement[];
    protected getGlobalVariableTemplate(): string;
    protected getCodeHelperTemplate(): string;
    abstract initialize(...args: TInitialData): void;
    protected abstract getNodeStructure(codeHelperTemplate: string): TStatement[];
}
