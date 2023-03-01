import * as ESTree from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { TStatement } from '../../types/node/TStatement';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractCustomNode } from '../AbstractCustomNode';
export declare class ObjectExpressionVariableDeclarationHostNode extends AbstractCustomNode {
    private lexicalScopeNode;
    private properties;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(lexicalScopeNode: TNodeWithLexicalScope, properties: (ESTree.Property | ESTree.SpreadElement)[]): void;
    protected getNodeStructure(): TStatement[];
}
