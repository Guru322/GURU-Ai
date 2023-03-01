import * as ESTree from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../AbstractCustomNode';
export declare class BlockStatementControlFlowFlatteningNode extends AbstractCustomNode {
    private blockStatementBody;
    private originalKeysIndexesInShuffledArray;
    private shuffledKeys;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(blockStatementBody: ESTree.Statement[], shuffledKeys: number[], originalKeysIndexesInShuffledArray: number[]): void;
    protected getNodeStructure(): TStatement[];
}
