import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';
export declare class HexadecimalIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    private static readonly baseIdentifierNameLength;
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    generateNext(nameLength?: number): string;
    generateForGlobalScope(nameLength?: number): string;
    generateForLexicalScope(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;
    generateForLabel(label: string, nameLength?: number): string;
}
