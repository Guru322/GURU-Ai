import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStatementSimplifyData } from '../../interfaces/node-transformers/simplifying-transformers/IStatementSimplifyData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractStatementSimplifyTransformer } from './AbstractStatementSimplifyTransformer';
export declare class IfStatementSimplifyTransformer extends AbstractStatementSimplifyTransformer {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(ifStatementNode: ESTree.IfStatement, parentNode: ESTree.Node): ESTree.Node;
    protected getConsequentNode(ifStatementNode: ESTree.IfStatement, consequentSimplifyData: IStatementSimplifyData): ESTree.Node;
    protected getConsequentAndAlternateNode(ifStatementNode: ESTree.IfStatement, consequentSimplifyData: IStatementSimplifyData, alternateSimplifyData: IStatementSimplifyData): ESTree.Node;
    protected getPartialStatement(statementSimplifyData: IStatementSimplifyData): ESTree.Statement;
    protected isProhibitedSingleStatementForIfStatementBranch(statement: ESTree.Statement): boolean;
}
