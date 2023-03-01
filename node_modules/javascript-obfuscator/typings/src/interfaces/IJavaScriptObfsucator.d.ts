import { IObfuscationResult } from './source-code/IObfuscationResult';
export interface IJavaScriptObfuscator {
    obfuscate(sourceCode: string): IObfuscationResult;
}
