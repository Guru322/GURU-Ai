import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { CodeTransformationStage } from '../../enums/code-transformers/CodeTransformationStage';
import { AbstractCodeTransformer } from '../AbstractCodeTransformer';
export declare class HashbangOperatorTransformer extends AbstractCodeTransformer {
    private hashbangOperatorLine;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    transformCode(code: string, codeTransformationStage: CodeTransformationStage): string;
    private removeAndSaveHashbangOperatorLine;
    private appendSavedHashbangOperatorLine;
}
