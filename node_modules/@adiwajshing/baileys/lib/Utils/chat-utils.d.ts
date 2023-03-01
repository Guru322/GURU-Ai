/// <reference types="node" />
import type { Logger } from 'pino';
import { proto } from '../../WAProto';
import { BaileysEventEmitter, ChatModification, ChatMutation, Contact, InitialAppStateSyncOptions, LTHashState, WAPatchCreate, WAPatchName } from '../Types';
import { BinaryNode } from '../WABinary';
declare type FetchAppStateSyncKey = (keyId: string) => Promise<proto.Message.IAppStateSyncKeyData> | proto.Message.IAppStateSyncKeyData;
export declare const newLTHashState: () => LTHashState;
export declare const encodeSyncdPatch: ({ type, index, syncAction, apiVersion, operation }: WAPatchCreate, myAppStateKeyId: string, state: LTHashState, getAppStateSyncKey: FetchAppStateSyncKey) => Promise<{
    patch: proto.ISyncdPatch;
    state: LTHashState;
}>;
export declare const decodeSyncdMutations: (msgMutations: (proto.ISyncdMutation | proto.ISyncdRecord)[], initialState: LTHashState, getAppStateSyncKey: FetchAppStateSyncKey, onMutation: (mutation: ChatMutation) => void, validateMacs: boolean) => Promise<{
    hash: Buffer;
    indexValueMap: {
        [indexMacBase64: string]: {
            valueMac: Buffer | Uint8Array;
        };
    };
}>;
export declare const decodeSyncdPatch: (msg: proto.ISyncdPatch, name: WAPatchName, initialState: LTHashState, getAppStateSyncKey: FetchAppStateSyncKey, onMutation: (mutation: ChatMutation) => void, validateMacs: boolean) => Promise<{
    hash: Buffer;
    indexValueMap: {
        [indexMacBase64: string]: {
            valueMac: Buffer | Uint8Array;
        };
    };
}>;
export declare const extractSyncdPatches: (result: BinaryNode) => Promise<{
    critical_block: {
        patches: proto.ISyncdPatch[];
        hasMorePatches: boolean;
        snapshot?: proto.ISyncdSnapshot | undefined;
    };
    critical_unblock_low: {
        patches: proto.ISyncdPatch[];
        hasMorePatches: boolean;
        snapshot?: proto.ISyncdSnapshot | undefined;
    };
    regular_high: {
        patches: proto.ISyncdPatch[];
        hasMorePatches: boolean;
        snapshot?: proto.ISyncdSnapshot | undefined;
    };
    regular_low: {
        patches: proto.ISyncdPatch[];
        hasMorePatches: boolean;
        snapshot?: proto.ISyncdSnapshot | undefined;
    };
    regular: {
        patches: proto.ISyncdPatch[];
        hasMorePatches: boolean;
        snapshot?: proto.ISyncdSnapshot | undefined;
    };
}>;
export declare const downloadExternalBlob: (blob: proto.IExternalBlobReference) => Promise<Buffer>;
export declare const downloadExternalPatch: (blob: proto.IExternalBlobReference) => Promise<proto.SyncdMutations>;
export declare const decodeSyncdSnapshot: (name: WAPatchName, snapshot: proto.ISyncdSnapshot, getAppStateSyncKey: FetchAppStateSyncKey, minimumVersionNumber: number | undefined, onMutation?: ((mutation: ChatMutation) => void) | undefined, validateMacs?: boolean) => Promise<{
    state: LTHashState;
}>;
export declare const decodePatches: (name: WAPatchName, syncds: proto.ISyncdPatch[], initial: LTHashState, getAppStateSyncKey: FetchAppStateSyncKey, onMutation: (mut: ChatMutation) => void, minimumVersionNumber?: number, logger?: Logger, validateMacs?: boolean) => Promise<{
    newMutations: ChatMutation[];
    state: LTHashState;
}>;
export declare const chatModificationToAppPatch: (mod: ChatModification, jid: string) => WAPatchCreate;
export declare const processSyncAction: (syncAction: ChatMutation, ev: BaileysEventEmitter, me: Contact, initialSyncOpts?: InitialAppStateSyncOptions, logger?: Logger) => void;
export {};
