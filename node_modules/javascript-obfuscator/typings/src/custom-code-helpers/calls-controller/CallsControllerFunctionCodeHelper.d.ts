import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
export declare class CallsControllerFunctionCodeHelper extends AbstractCustomCodeHelper {
    protected callsControllerFunctionName: string;
    private nodeTransformationStage;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, customCodeHelperObfuscator: ICustomCodeHelperObfuscator, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(nodeTransformationStage: NodeTransformationStage, callsControllerFunctionName: string): void;
    protected getNodeStructure(codeHelperTemplate: string): TStatement[];
    protected getCodeHelperTemplate(): string;
}
