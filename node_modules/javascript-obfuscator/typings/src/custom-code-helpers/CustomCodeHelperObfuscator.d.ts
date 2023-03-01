import { TInputOptions } from '../types/options/TInputOptions';
import { ICustomCodeHelperObfuscator } from '../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
export declare class CustomCodeHelperObfuscator implements ICustomCodeHelperObfuscator {
    private readonly options;
    private readonly randomGenerator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    obfuscateTemplate(template: string, additionalOptions?: TInputOptions): string;
}
