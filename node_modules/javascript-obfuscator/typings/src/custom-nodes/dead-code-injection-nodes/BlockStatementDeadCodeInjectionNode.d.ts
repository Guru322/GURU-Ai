import type { BlockStatement } from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../AbstractCustomNode';
export declare class BlockStatementDeadCodeInjectionNode extends AbstractCustomNode {
    private blockStatementNode;
    private deadCodeInjectionRootAstHostNode;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(blockStatementNode: BlockStatement, deadCodeInjectionRootAstHostNode: BlockStatement): void;
    getNode(): TStatement[];
    protected getNodeStructure(): TStatement[];
}
