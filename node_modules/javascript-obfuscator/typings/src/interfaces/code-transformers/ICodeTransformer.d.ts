import { ITransformer } from '../ITransformer';
import { CodeTransformer } from '../../enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from '../../enums/code-transformers/CodeTransformationStage';
export interface ICodeTransformer extends ITransformer<CodeTransformer> {
    transformCode(code: string, codeTransformationStage: CodeTransformationStage): string;
}
