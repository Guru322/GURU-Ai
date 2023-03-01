import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';
export interface IIdentifierNamesGenerator {
    generate(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;
    generateForGlobalScope(nameLength?: number): string;
    generateForLexicalScope(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;
    generateForLabel(label: string, nameLength?: number): string;
    generateNext(nameLength?: number): string;
    isValidIdentifierName(identifierName: string): boolean;
    isValidIdentifierNameInLexicalScopes(identifierName: string, lexicalScopeNodes: TNodeWithLexicalScope[]): boolean;
    preserveName(identifierName: string): void;
    preserveNameForLexicalScope(identifierName: string, lexicalScope: TNodeWithLexicalScope): void;
}
