import { CodeTransformer } from '../../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../../enums/code-transformers/CodeTransformationStage';
export interface ICodeTransformersRunner {
    transform(code: string, codeTransformers: CodeTransformer[], codeTransformationStage: CodeTransformationStage): string;
}
