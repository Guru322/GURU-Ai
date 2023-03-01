import { TInputOptions } from '../../types/options/TInputOptions';
export interface ICustomCodeHelperObfuscator {
    obfuscateTemplate(template: string, additionalOptions?: TInputOptions): string;
}
