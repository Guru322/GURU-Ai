"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticationCredsType = exports.useSingleFileLegacyAuthState = exports.computeChallengeResponse = exports.validateNewConnection = exports.decodeWAMessage = exports.newLegacyAuthCreds = void 0;
const boom_1 = require("@hapi/boom");
const crypto_1 = require("crypto");
const Types_1 = require("../Types");
const WABinary_1 = require("../WABinary");
const crypto_2 = require("./crypto");
const generics_1 = require("./generics");
const newLegacyAuthCreds = () => ({
    clientID: (0, crypto_1.randomBytes)(16).toString('base64')
});
exports.newLegacyAuthCreds = newLegacyAuthCreds;
const decodeWAMessage = (message, auth, fromMe = false) => {
    let commaIndex = message.indexOf(','); // all whatsapp messages have a tag and a comma, followed by the actual message
    if (commaIndex < 0) {
        throw new boom_1.Boom('invalid message', { data: message });
    } // if there was no comma, then this message must be not be valid
    if (message[commaIndex + 1] === ',') {
        commaIndex += 1;
    }
    let data = message.slice(commaIndex + 1, message.length);
    // get the message tag.
    // If a query was done, the server will respond with the same message tag we sent the query with
    const messageTag = message.slice(0, commaIndex).toString();
    let json;
    let tags;
    if (data.length) {
        const possiblyEnc = (data.length > 32 && data.length % 16 === 0);
        if (typeof data === 'string' || !possiblyEnc) {
            json = JSON.parse(data.toString()); // parse the JSON
        }
        else {
            try {
                json = JSON.parse(data.toString());
            }
            catch (_a) {
                const { macKey, encKey } = auth || {};
                if (!macKey || !encKey) {
                    throw new boom_1.Boom('recieved encrypted buffer when auth creds unavailable', { data: message, statusCode: Types_1.DisconnectReason.badSession });
                }
                /*
                    If the data recieved was not a JSON, then it must be an encrypted message.
                    Such a message can only be decrypted if we're connected successfully to the servers & have encryption keys
                */
                if (fromMe) {
                    tags = [data[0], data[1]];
                    data = data.slice(2, data.length);
                }
                const checksum = data.slice(0, 32); // the first 32 bytes of the buffer are the HMAC sign of the message
                data = data.slice(32, data.length); // the actual message
                const computedChecksum = (0, crypto_2.hmacSign)(data, macKey); // compute the sign of the message we recieved using our macKey
                if (checksum.equals(computedChecksum)) {
                    // the checksum the server sent, must match the one we computed for the message to be valid
                    const decrypted = (0, crypto_2.aesDecrypt)(data, encKey); // decrypt using AES
                    json = (0, WABinary_1.decodeBinaryNodeLegacy)(decrypted, { index: 0 }); // decode the binary message into a JSON array
                }
                else {
                    throw new boom_1.Boom('Bad checksum', {
                        data: {
                            received: checksum.toString('hex'),
                            computed: computedChecksum.toString('hex'),
                            data: data.slice(0, 80).toString(),
                            tag: messageTag,
                            message: message.slice(0, 80).toString()
                        },
                        statusCode: Types_1.DisconnectReason.badSession
                    });
                }
            }
        }
    }
    return [messageTag, json, tags];
};
exports.decodeWAMessage = decodeWAMessage;
/**
* Once the QR code is scanned and we can validate our connection, or we resolved the challenge when logging back in
* @private
* @param json
*/
const validateNewConnection = (json, auth, curveKeys) => {
    // set metadata: one's WhatsApp ID [cc][number]@s.whatsapp.net, name on WhatsApp, info about the phone
    const onValidationSuccess = () => {
        const user = {
            id: (0, WABinary_1.jidNormalizedUser)(json.wid),
            name: json.pushname
        };
        return { user, auth, phone: json.phone };
    };
    if (!json.secret) {
        // if we didn't get a secret, we don't need it, we're validated
        if (json.clientToken && json.clientToken !== auth.clientToken) {
            auth = { ...auth, clientToken: json.clientToken };
        }
        if (json.serverToken && json.serverToken !== auth.serverToken) {
            auth = { ...auth, serverToken: json.serverToken };
        }
        return onValidationSuccess();
    }
    const secret = Buffer.from(json.secret, 'base64');
    if (secret.length !== 144) {
        throw new Error('incorrect secret length received: ' + secret.length);
    }
    // generate shared key from our private key & the secret shared by the server
    const sharedKey = crypto_2.Curve.sharedKey(curveKeys.private, secret.slice(0, 32));
    // expand the key to 80 bytes using HKDF
    const expandedKey = (0, crypto_2.hkdf)(sharedKey, 80, {});
    // perform HMAC validation.
    const hmacValidationKey = expandedKey.slice(32, 64);
    const hmacValidationMessage = Buffer.concat([secret.slice(0, 32), secret.slice(64, secret.length)]);
    const hmac = (0, crypto_2.hmacSign)(hmacValidationMessage, hmacValidationKey);
    if (!hmac.equals(secret.slice(32, 64))) {
        // if the checksums didn't match
        throw new boom_1.Boom('HMAC validation failed', { statusCode: 400 });
    }
    // computed HMAC should equal secret[32:64]
    // expandedKey[64:] + secret[64:] are the keys, encrypted using AES, that are used to encrypt/decrypt the messages recieved from WhatsApp
    // they are encrypted using key: expandedKey[0:32]
    const encryptedAESKeys = Buffer.concat([
        expandedKey.slice(64, expandedKey.length),
        secret.slice(64, secret.length),
    ]);
    const decryptedKeys = (0, crypto_2.aesDecrypt)(encryptedAESKeys, expandedKey.slice(0, 32));
    // set the credentials
    auth = {
        encKey: decryptedKeys.slice(0, 32),
        macKey: decryptedKeys.slice(32, 64),
        clientToken: json.clientToken,
        serverToken: json.serverToken,
        clientID: auth.clientID,
    };
    return onValidationSuccess();
};
exports.validateNewConnection = validateNewConnection;
const computeChallengeResponse = (challenge, auth) => {
    const bytes = Buffer.from(challenge, 'base64'); // decode the base64 encoded challenge string
    const signed = (0, crypto_2.hmacSign)(bytes, auth.macKey).toString('base64'); // sign the challenge string with our macKey
    return ['admin', 'challenge', signed, auth.serverToken, auth.clientID]; // prepare to send this signed string with the serverToken & clientID
};
exports.computeChallengeResponse = computeChallengeResponse;
const useSingleFileLegacyAuthState = (file) => {
    // require fs here so that in case "fs" is not available -- the app does not crash
    const { readFileSync, writeFileSync, existsSync } = require('fs');
    let state;
    if (existsSync(file)) {
        state = JSON.parse(readFileSync(file, { encoding: 'utf-8' }), generics_1.BufferJSON.reviver);
        if (typeof state.encKey === 'string') {
            state.encKey = Buffer.from(state.encKey, 'base64');
        }
        if (typeof state.macKey === 'string') {
            state.macKey = Buffer.from(state.macKey, 'base64');
        }
    }
    else {
        state = (0, exports.newLegacyAuthCreds)();
    }
    return {
        state,
        saveState: () => {
            const str = JSON.stringify(state, generics_1.BufferJSON.replacer, 2);
            writeFileSync(file, str);
        }
    };
};
exports.useSingleFileLegacyAuthState = useSingleFileLegacyAuthState;
const getAuthenticationCredsType = (creds) => {
    if ('clientID' in creds && !!creds.clientID) {
        return 'legacy';
    }
    if ('noiseKey' in creds && !!creds.noiseKey) {
        return 'md';
    }
};
exports.getAuthenticationCredsType = getAuthenticationCredsType;
