import { ICodeTransformer } from '../interfaces/code-transformers/ICodeTransformer';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { CodeTransformer } from '../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../enums/code-transformers/CodeTransformationStage';
export declare abstract class AbstractCodeTransformer implements ICodeTransformer {
    readonly runAfter: CodeTransformer[] | undefined;
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    abstract transformCode(code: string, codeTransformationStage: CodeTransformationStage): string;
}
