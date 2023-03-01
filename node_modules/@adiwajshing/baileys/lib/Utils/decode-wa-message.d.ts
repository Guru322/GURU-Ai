import { proto } from '../../WAProto';
import { AuthenticationState } from '../Types';
import { BinaryNode } from '../WABinary';
export declare const decodeMessageStanza: (stanza: BinaryNode, auth: AuthenticationState) => {
    fullMessage: proto.IWebMessageInfo;
    category: string;
    author: string;
    decryptionTask: Promise<void>;
};
