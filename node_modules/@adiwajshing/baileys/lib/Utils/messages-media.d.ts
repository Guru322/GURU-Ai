/// <reference types="node" />
/// <reference types="node" />
import { Boom } from '@hapi/boom';
import { AxiosRequestConfig } from 'axios';
import type { Logger } from 'pino';
import { Readable, Transform } from 'stream';
import { URL } from 'url';
import { proto } from '../../WAProto';
import { CommonSocketConfig, DownloadableMessage, MediaConnInfo, MediaDecryptionKeyInfo, MediaType, WAMediaUpload, WAMediaUploadFunction, WAMessageContent } from '../Types';
import { BinaryNode } from '../WABinary';
export declare const hkdfInfoKey: (type: MediaType) => string;
/** generates all the keys required to encrypt/decrypt & sign a media message */
export declare function getMediaKeys(buffer: Uint8Array | string | null | undefined, mediaType: MediaType): MediaDecryptionKeyInfo;
export declare const extractImageThumb: (bufferOrFilePath: Readable | Buffer | string, width?: number) => Promise<Buffer>;
export declare const generateProfilePicture: (mediaUpload: WAMediaUpload) => Promise<{
    img: Buffer;
}>;
/** gets the SHA256 of the given media message */
export declare const mediaMessageSHA256B64: (message: WAMessageContent) => string | null | undefined;
export declare function getAudioDuration(buffer: Buffer | string | Readable): Promise<number | undefined>;
export declare const toReadable: (buffer: Buffer) => Readable;
export declare const toBuffer: (stream: Readable) => Promise<Buffer>;
export declare const getStream: (item: WAMediaUpload) => Promise<{
    stream: Readable;
    type: string;
}>;
/** generates a thumbnail for a given media, if required */
export declare function generateThumbnail(file: string, mediaType: 'video' | 'image', options: {
    logger?: Logger;
}): Promise<string | undefined>;
export declare const getHttpStream: (url: string | URL, options?: AxiosRequestConfig & {
    isStream?: true;
}) => Promise<Readable>;
export declare const encryptedStream: (media: WAMediaUpload, mediaType: MediaType, saveOriginalFileIfRequired?: boolean, logger?: Logger) => Promise<{
    mediaKey: Buffer;
    encWriteStream: Readable;
    bodyPath: string | undefined;
    mac: Buffer;
    fileEncSha256: Buffer;
    fileSha256: Buffer;
    fileLength: number;
    didSaveToTmpPath: boolean;
}>;
export declare type MediaDownloadOptions = {
    startByte?: number;
    endByte?: number;
};
export declare const getUrlFromDirectPath: (directPath: string) => string;
export declare const downloadContentFromMessage: ({ mediaKey, directPath, url }: DownloadableMessage, type: MediaType, opts?: MediaDownloadOptions) => Promise<Transform>;
/**
 * Decrypts and downloads an AES256-CBC encrypted file given the keys.
 * Assumes the SHA256 of the plaintext is appended to the end of the ciphertext
 * */
export declare const downloadEncryptedContent: (downloadUrl: string, { cipherKey, iv }: MediaDecryptionKeyInfo, { startByte, endByte }?: MediaDownloadOptions) => Promise<Transform>;
export declare function extensionForMediaMessage(message: WAMessageContent): string;
export declare const getWAUploadToServer: ({ customUploadHosts, fetchAgent, logger }: CommonSocketConfig, refreshMediaConn: (force: boolean) => Promise<MediaConnInfo>) => WAMediaUploadFunction;
/**
 * Generate a binary node that will request the phone to re-upload the media & return the newly uploaded URL
 */
export declare const encryptMediaRetryRequest: (key: proto.IMessageKey, mediaKey: Buffer | Uint8Array, meId: string) => BinaryNode;
export declare const decodeMediaRetryNode: (node: BinaryNode) => {
    key: proto.IMessageKey;
    media?: {
        ciphertext: Uint8Array;
        iv: Uint8Array;
    } | undefined;
    error?: Boom<any> | undefined;
};
export declare const decryptMediaRetryData: ({ ciphertext, iv }: {
    ciphertext: Uint8Array;
    iv: Uint8Array;
}, mediaKey: Uint8Array, msgId: string) => proto.MediaRetryNotification;
export declare const getStatusCodeForMediaRetry: (code: number) => any;
