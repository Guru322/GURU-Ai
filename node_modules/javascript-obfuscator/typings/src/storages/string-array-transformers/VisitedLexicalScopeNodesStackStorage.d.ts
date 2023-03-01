import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';
import { ArrayStorage } from '../ArrayStorage';
export declare class VisitedLexicalScopeNodesStackStorage extends ArrayStorage<TNodeWithLexicalScopeStatements> implements IVisitedLexicalScopeNodesStackStorage {
    private readonly arrayUtils;
    constructor(randomGenerator: IRandomGenerator, options: IOptions, arrayUtils: IArrayUtils);
    getLastElement(): TNodeWithLexicalScopeStatements | undefined;
    getPenultimateElement(): TNodeWithLexicalScopeStatements | undefined;
    push(nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements): void;
    pop(): TNodeWithLexicalScopeStatements | undefined;
}
