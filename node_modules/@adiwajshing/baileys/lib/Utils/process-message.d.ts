import type { Logger } from 'pino';
import { proto } from '../../WAProto';
import { AuthenticationCreds, BaileysEventEmitter, InitialReceivedChatsState, SignalKeyStoreWithTransaction } from '../Types';
declare type ProcessMessageContext = {
    historyCache: Set<string>;
    recvChats: InitialReceivedChatsState;
    downloadHistory: boolean;
    creds: AuthenticationCreds;
    keyStore: SignalKeyStoreWithTransaction;
    ev: BaileysEventEmitter;
    logger?: Logger;
};
/** Cleans a received message to further processing */
export declare const cleanMessage: (message: proto.IWebMessageInfo, meId: string) => void;
export declare const isRealMessage: (message: proto.IWebMessageInfo) => boolean;
export declare const shouldIncrementChatUnread: (message: proto.IWebMessageInfo) => boolean;
declare const processMessage: (message: proto.IWebMessageInfo, { downloadHistory, ev, historyCache, recvChats, creds, keyStore, logger }: ProcessMessageContext) => Promise<void>;
export default processMessage;
