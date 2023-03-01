import * as ESTree from 'estree';
import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';
export declare class BlackListObfuscatingGuard implements IObfuscatingGuard {
    private static readonly blackListGuards;
    private readonly blackListGuardsLength;
    constructor();
    check(node: ESTree.Node): ObfuscatingGuardResult;
}
