import type { BinaryOperator } from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../AbstractCustomNode';
export declare class BinaryExpressionFunctionNode extends AbstractCustomNode {
    private operator;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(operator: BinaryOperator): void;
    protected getNodeStructure(): TStatement[];
}
