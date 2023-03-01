import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
export declare class ConsoleOutputDisableCodeHelper extends AbstractCustomCodeHelper {
    private callsControllerFunctionName;
    private consoleOutputDisableFunctionName;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, customCodeHelperObfuscator: ICustomCodeHelperObfuscator, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(callsControllerFunctionName: string, consoleOutputDisableFunctionName: string): void;
    protected getNodeStructure(codeHelperTemplate: string): TStatement[];
    protected getCodeHelperTemplate(): string;
}
