import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
export declare class DebugProtectionFunctionIntervalCodeHelper extends AbstractCustomCodeHelper {
    private debugProtectionFunctionName;
    private debugProtectionInterval;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, customCodeHelperObfuscator: ICustomCodeHelperObfuscator, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(debugProtectionFunctionName: string, debugProtectionInterval: number): void;
    protected getNodeStructure(codeHelperTemplate: string): TStatement[];
    protected getCodeHelperTemplate(): string;
}
