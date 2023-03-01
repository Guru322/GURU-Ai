import * as ESTree from 'estree';
import { IGlobalIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IThroughIdentifierReplacer } from '../../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IThroughIdentifierReplacer';
export declare class ThroughIdentifierReplacer implements IThroughIdentifierReplacer {
    private readonly identifierNamesCacheStorage;
    private readonly options;
    constructor(identifierNamesCacheStorage: IGlobalIdentifierNamesCacheStorage, options: IOptions);
    replace(identifierNode: ESTree.Identifier): ESTree.Identifier;
    private isReservedName;
}
