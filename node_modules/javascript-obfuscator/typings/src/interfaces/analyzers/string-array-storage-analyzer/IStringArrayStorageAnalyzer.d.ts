import * as ESTree from 'estree';
import { TStringLiteralNode } from '../../../types/node/TStringLiteralNode';
import { IAnalyzer } from '../IAnalyzer';
import { IStringArrayStorageItemData } from '../../storages/string-array-transformers/IStringArrayStorageItem';
export interface IStringArrayStorageAnalyzer extends IAnalyzer<[ESTree.Program], void> {
    analyze(astTree: ESTree.Program): void;
    analyzeLiteralNode(literalNode: ESTree.Literal, parentNode: ESTree.Node): void;
    addItemDataForLiteralNode(stringLiteralNode: TStringLiteralNode): void;
    getItemDataForLiteralNode(literalNode: ESTree.Literal): IStringArrayStorageItemData | undefined;
}
