import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
export declare class DictionaryIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    private readonly arrayUtils;
    private identifierNamesSet;
    private identifiersIterator;
    constructor(randomGenerator: IRandomGenerator, options: IOptions, arrayUtils: IArrayUtils);
    private static incrementIdentifierName;
    generateNext(): string;
    generateForGlobalScope(): string;
    generateForLexicalScope(lexicalScopeNode: TNodeWithLexicalScope): string;
    generateForLabel(label: string): string;
    private generateNewDictionaryName;
    private getInitialIdentifierNames;
    private getIncrementedIdentifierNames;
}
