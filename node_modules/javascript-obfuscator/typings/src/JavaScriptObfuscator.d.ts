import { TObfuscationResultFactory } from './types/container/source-code/TObfuscationResultFactory';
import { ICodeTransformersRunner } from './interfaces/code-transformers/ICodeTransformersRunner';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { ILogger } from './interfaces/logger/ILogger';
import { IObfuscationResult } from './interfaces/source-code/IObfuscationResult';
import { IOptions } from './interfaces/options/IOptions';
import { IRandomGenerator } from './interfaces/utils/IRandomGenerator';
import { INodeTransformersRunner } from './interfaces/node-transformers/INodeTransformersRunner';
export declare class JavaScriptObfuscator implements IJavaScriptObfuscator {
    private static readonly parseOptions;
    private static readonly escodegenParams;
    private static readonly codeTransformersList;
    private static readonly nodeTransformersList;
    private readonly codeTransformersRunner;
    private readonly logger;
    private readonly obfuscationResultFactory;
    private readonly options;
    private readonly randomGenerator;
    private readonly nodeTransformersRunner;
    constructor(codeTransformersRunner: ICodeTransformersRunner, nodeTransformersRunner: INodeTransformersRunner, randomGenerator: IRandomGenerator, obfuscatedCodeFactory: TObfuscationResultFactory, logger: ILogger, options: IOptions);
    obfuscate(sourceCode: string): IObfuscationResult;
    private parseCode;
    private transformAstTree;
    private generateCode;
    private getObfuscationResult;
    private runCodeTransformationStage;
    private runNodeTransformationStage;
}
