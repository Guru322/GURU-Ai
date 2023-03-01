import * as ESTree from 'estree';
import { TStringLiteralNode } from '../../types/node/TStringLiteralNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';
export declare class StringArrayStorageAnalyzer implements IStringArrayStorageAnalyzer {
    private static readonly minimumLengthForStringArray;
    private readonly options;
    private readonly randomGenerator;
    private readonly stringArrayStorage;
    private readonly stringArrayStorageData;
    constructor(stringArrayStorage: IStringArrayStorage, randomGenerator: IRandomGenerator, options: IOptions);
    analyze(astTree: ESTree.Program): void;
    analyzeLiteralNode(literalNode: ESTree.Literal, parentNode: ESTree.Node): void;
    addItemDataForLiteralNode(literalNode: TStringLiteralNode): void;
    getItemDataForLiteralNode(literalNode: ESTree.Literal): IStringArrayStorageItemData | undefined;
    private shouldAddValueToStringArray;
}
