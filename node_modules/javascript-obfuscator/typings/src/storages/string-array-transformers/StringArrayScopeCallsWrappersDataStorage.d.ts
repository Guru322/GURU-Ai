import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayScopeCallsWrappersDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrappersDataByEncoding';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrappersDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrappersDataStorage';
import { WeakMapStorage } from '../WeakMapStorage';
export declare class StringArrayScopeCallsWrappersDataStorage extends WeakMapStorage<TNodeWithLexicalScopeStatements, TStringArrayScopeCallsWrappersDataByEncoding> implements IStringArrayScopeCallsWrappersDataStorage {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
}
