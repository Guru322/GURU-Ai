import * as ESTree from 'estree';
import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../../interfaces/options/IOptions';
import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';
export declare class ForceTransformStringObfuscatingGuard implements IObfuscatingGuard {
    private readonly options;
    constructor(options: IOptions);
    check(node: ESTree.Node): ObfuscatingGuardResult;
    private isForceTransformString;
}
