import * as ESTree from 'estree';
import { TObjectExpressionKeysTransformerCustomNodeFactory } from '../../../types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory';
import { IObjectExpressionExtractorResult } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractorResult';
import { IObjectExpressionExtractor } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractor';
export declare class ObjectExpressionToVariableDeclarationExtractor implements IObjectExpressionExtractor {
    private readonly objectExpressionKeysTransformerCustomNodeFactory;
    constructor(objectExpressionKeysTransformerCustomNodeFactory: TObjectExpressionKeysTransformerCustomNodeFactory);
    extract(objectExpressionNode: ESTree.ObjectExpression, hostStatement: ESTree.Statement): IObjectExpressionExtractorResult;
    private transformObjectExpressionToVariableDeclaration;
    private getObjectExpressionHostNode;
    private getObjectExpressionIdentifierNode;
    private getObjectExpressionNode;
}
