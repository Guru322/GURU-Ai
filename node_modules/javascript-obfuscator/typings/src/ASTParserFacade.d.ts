import * as acorn from 'acorn';
import * as ESTree from 'estree';
export declare class ASTParserFacade {
    private static readonly colorError;
    private static readonly nearestSymbolsCount;
    private static readonly sourceTypes;
    static parse(sourceCode: string, config: acorn.Options): ESTree.Program | never;
    private static parseType;
    private static processParsingError;
}
