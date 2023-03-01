import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ISetUtils } from '../../interfaces/utils/ISetUtils';
import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';
export declare class MangledIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    private static readonly maxRegenerationAttempts;
    private static readonly initMangledNameCharacter;
    private static readonly nameSequence;
    private static readonly reservedNamesSet;
    private lastMangledName;
    private readonly lastMangledNameForScopeMap;
    private readonly lastMangledNameForLabelMap;
    private readonly setUtils;
    constructor(randomGenerator: IRandomGenerator, options: IOptions, setUtils: ISetUtils);
    generateNext(nameLength?: number): string;
    generateForGlobalScope(nameLength?: number): string;
    generateForLexicalScope(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;
    generateForLabel(label: string, nameLength?: number): string;
    isIncrementedMangledName(nextName: string, prevName: string): boolean;
    isValidIdentifierName(mangledName: string): boolean;
    protected getNameSequence(): string[];
    protected updatePreviousMangledName(name: string): void;
    protected updatePreviousMangledNameForLabel(name: string, label: string, lastMangledNameForLabel: string): void;
    protected generateNewMangledName(previousMangledName: string, validationFunction?: (newIdentifierName: string) => boolean): string;
    private getLastMangledNameForScopes;
    private getLastMangledNameForLabel;
}
