import type * as ESTree from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../../AbstractCustomNode';
export declare class CallExpressionControlFlowStorageCallNode extends AbstractCustomNode {
    private callee;
    private controlFlowStorageKey;
    private controlFlowStorageName;
    private expressionArguments;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(controlFlowStorageName: string, controlFlowStorageKey: string, callee: ESTree.Expression, expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[]): void;
    protected getNodeStructure(): TStatement[];
}
