/// <reference types="node" />
import { AuthenticationCreds, Contact, CurveKeyPair, LegacyAuthenticationCreds, WATag } from '../Types';
export declare const newLegacyAuthCreds: () => LegacyAuthenticationCreds;
export declare const decodeWAMessage: (message: Buffer | string, auth: {
    macKey: Buffer;
    encKey: Buffer;
}, fromMe?: boolean) => readonly [string, any, WATag | undefined];
/**
* Once the QR code is scanned and we can validate our connection, or we resolved the challenge when logging back in
* @private
* @param json
*/
export declare const validateNewConnection: (json: {
    [_: string]: any;
}, auth: LegacyAuthenticationCreds, curveKeys: CurveKeyPair) => {
    user: Contact;
    auth: LegacyAuthenticationCreds;
    phone: any;
};
export declare const computeChallengeResponse: (challenge: string, auth: LegacyAuthenticationCreds) => string[];
export declare const useSingleFileLegacyAuthState: (file: string) => {
    state: LegacyAuthenticationCreds;
    saveState: () => void;
};
export declare const getAuthenticationCredsType: (creds: LegacyAuthenticationCreds | AuthenticationCreds) => "legacy" | "md" | undefined;
