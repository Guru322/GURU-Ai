import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
export declare class StringArrayCodeHelper extends AbstractCustomCodeHelper {
    private stringArrayStorage;
    private stringArrayFunctionName;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, customCodeHelperObfuscator: ICustomCodeHelperObfuscator, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(stringArrayStorage: IStringArrayStorage, stringArrayFunctionName: string): void;
    protected getNodeStructure(codeHelperTemplate: string): TStatement[];
    protected getCodeHelperTemplate(): string;
    private getEncodedStringArrayStorageItems;
}
