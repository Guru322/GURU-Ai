import * as ESTree from 'estree';
import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { ObfuscatingGuardResult } from '../../../enums/node/ObfuscatingGuardResult';
export declare class ConditionalCommentObfuscatingGuard implements IObfuscatingGuard {
    private static readonly obfuscationEnableCommentRegExp;
    private static readonly obfuscationDisableCommentRegExp;
    private obfuscationAllowed;
    static isConditionalComment(comment: ESTree.Comment): boolean;
    check(node: ESTree.Node): ObfuscatingGuardResult;
    private checkComments;
}
