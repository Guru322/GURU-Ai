import * as ESTree from 'estree';
import { IIteratedStatementsSimplifyData } from '../../interfaces/node-transformers/simplifying-transformers/IIteratedStatementsSimplifyData';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStatementSimplifyData } from '../../interfaces/node-transformers/simplifying-transformers/IStatementSimplifyData';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare abstract class AbstractStatementSimplifyTransformer extends AbstractNodeTransformer {
    readonly runAfter: NodeTransformer[];
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    protected getStatementSimplifyData(statementNode: ESTree.Statement | null | undefined): IStatementSimplifyData | null;
    protected collectIteratedStatementsSimplifyData(statementNode: ESTree.BlockStatement): IIteratedStatementsSimplifyData;
    protected getLeadingStatements(statementNode: ESTree.BlockStatement, startIndex: number | null): ESTree.Statement[];
    protected getPartialStatement(statementSimplifyData: IStatementSimplifyData): ESTree.Statement;
    abstract transformNode(statementNode: ESTree.Statement, parentNode: ESTree.Node): ESTree.Node;
}
