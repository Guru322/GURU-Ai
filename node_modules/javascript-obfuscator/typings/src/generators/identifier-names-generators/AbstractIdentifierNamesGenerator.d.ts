import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
export declare abstract class AbstractIdentifierNamesGenerator implements IIdentifierNamesGenerator {
    protected readonly options: IOptions;
    protected readonly randomGenerator: IRandomGenerator;
    protected readonly preservedNamesSet: Set<string>;
    protected readonly lexicalScopesPreservedNamesMap: WeakMap<TNodeWithLexicalScope, Set<string>>;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    generate(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;
    preserveName(name: string): void;
    preserveNameForLexicalScope(name: string, lexicalScopeNode: TNodeWithLexicalScope): void;
    isValidIdentifierName(name: string): boolean;
    isValidIdentifierNameInLexicalScopes(name: string, lexicalScopeNodes: TNodeWithLexicalScope[]): boolean;
    private isReservedName;
    abstract generateForGlobalScope(nameLength?: number): string;
    abstract generateForLexicalScope(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;
    abstract generateForLabel(label: string, nameLength?: number): string;
    abstract generateNext(nameLength?: number): string;
}
