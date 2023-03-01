import * as ESTree from 'estree';
import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../../interfaces/options/IOptions';
import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';
export declare class IgnoredImportObfuscatingGuard implements IObfuscatingGuard {
    private readonly options;
    constructor(options: IOptions);
    private static isDynamicImport;
    private static isRequireImport;
    check(node: ESTree.Node): ObfuscatingGuardResult;
}
