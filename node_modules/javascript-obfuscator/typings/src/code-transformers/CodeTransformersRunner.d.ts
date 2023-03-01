import { TCodeTransformerFactory } from '../types/container/code-transformers/TCodeTransformerFactory';
import { ICodeTransformer } from '../interfaces/code-transformers/ICodeTransformer';
import { ICodeTransformersRunner } from '../interfaces/code-transformers/ICodeTransformersRunner';
import { ITransformerNamesGroupsBuilder } from '../interfaces/utils/ITransformerNamesGroupsBuilder';
import { CodeTransformer } from '../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../enums/code-transformers/CodeTransformationStage';
export declare class CodeTransformersRunner implements ICodeTransformersRunner {
    private readonly codeTransformerFactory;
    private readonly codeTransformerNamesGroupsBuilder;
    constructor(codeTransformerFactory: TCodeTransformerFactory, codeTransformerNamesGroupsBuilder: ITransformerNamesGroupsBuilder<CodeTransformer, ICodeTransformer>);
    transform(code: string, codeTransformerNames: CodeTransformer[], codeTransformationStage: CodeTransformationStage): string;
    private buildNormalizedCodeTransformers;
}
