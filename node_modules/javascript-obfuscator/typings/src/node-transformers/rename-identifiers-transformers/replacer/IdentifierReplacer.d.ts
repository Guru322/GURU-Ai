import * as ESTree from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';
import { IGlobalIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IIdentifierReplacer } from '../../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';
export declare class IdentifierReplacer implements IIdentifierReplacer {
    private readonly identifierNamesCacheStorage;
    private readonly identifierNamesGenerator;
    private readonly blockScopesMap;
    private readonly options;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, identifierNamesCacheStorage: IGlobalIdentifierNamesCacheStorage, options: IOptions);
    storeGlobalName(identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
    storeLocalName(identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
    replace(identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): ESTree.Identifier;
    preserveName(identifierNode: ESTree.Identifier): void;
    preserveNameForLexicalScope(identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
    private isReservedName;
}
