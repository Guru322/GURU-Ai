import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
export declare class StringArrayCallsWrapperCodeHelper extends AbstractCustomCodeHelper {
    protected indexShiftAmount: number;
    protected stringArrayCallsWrapperName: string;
    protected stringArrayFunctionName: string;
    protected stringArrayCacheName: string;
    private readonly escapeSequenceEncoder;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, customCodeHelperObfuscator: ICustomCodeHelperObfuscator, randomGenerator: IRandomGenerator, options: IOptions, escapeSequenceEncoder: IEscapeSequenceEncoder);
    initialize(stringArrayFunctionName: string, stringArrayCallsWrapperName: string, indexShiftAmount: number): void;
    protected getNodeStructure(codeHelperTemplate: string): TStatement[];
    protected getCodeHelperTemplate(): string;
    protected getDecodeStringArrayTemplate(): string;
    protected getSelfDefendingTemplate(): string;
}
