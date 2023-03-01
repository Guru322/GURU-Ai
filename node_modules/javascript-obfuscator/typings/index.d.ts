import { TDictionary } from './src/types/TDictionary';
import { TInputOptions } from './src/types/options/TInputOptions';
import { TObfuscationResultsObject } from './src/types/TObfuscationResultsObject';
import { TOptionsPreset } from './src/types/options/TOptionsPreset';
import { IObfuscationResult } from './src/interfaces/source-code/IObfuscationResult';
export type ObfuscatorOptions = TInputOptions;
export interface ObfuscationResult extends IObfuscationResult {
}
export declare function obfuscate(sourceCode: string, inputOptions?: ObfuscatorOptions): ObfuscationResult;
export declare function obfuscateMultiple<TSourceCodesObject extends TDictionary<string>>(sourceCodesObject: TSourceCodesObject, inputOptions?: TInputOptions): TObfuscationResultsObject<TSourceCodesObject>;
export declare function getOptionsByPreset(optionsPreset: TOptionsPreset): TInputOptions;
export declare const version: string;
