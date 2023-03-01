"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchMessageForMdIfRequired = exports.assertMediaContent = exports.downloadMediaMessage = exports.aggregateMessageKeysNotFromMe = exports.updateMessageWithReaction = exports.updateMessageWithReceipt = exports.getDevice = exports.extractMessageContent = exports.normalizeMessageContent = exports.getContentType = exports.generateWAMessage = exports.generateWAMessageFromContent = exports.generateWAMessageContent = exports.generateForwardMessageContent = exports.prepareDisappearingMessageSettingContent = exports.prepareWAMessageMedia = exports.generateLinkPreviewIfRequired = exports.extractUrlFromText = void 0;
const boom_1 = require("@hapi/boom");
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const WAProto_1 = require("../../WAProto");
const Defaults_1 = require("../Defaults");
const Types_1 = require("../Types");
const WABinary_1 = require("../WABinary");
const generics_1 = require("./generics");
const messages_media_1 = require("./messages-media");
const MIMETYPE_MAP = {
    image: 'image/jpeg',
    video: 'video/mp4',
    document: 'application/pdf',
    audio: 'audio/ogg; codecs=opus',
    sticker: 'image/webp',
    history: 'application/x-protobuf',
    'md-app-state': 'application/x-protobuf',
};
const MessageTypeProto = {
    'image': Types_1.WAProto.Message.ImageMessage,
    'video': Types_1.WAProto.Message.VideoMessage,
    'audio': Types_1.WAProto.Message.AudioMessage,
    'sticker': Types_1.WAProto.Message.StickerMessage,
    'document': Types_1.WAProto.Message.DocumentMessage,
};
const ButtonType = WAProto_1.proto.Message.ButtonsMessage.HeaderType;
/**
 * Uses a regex to test whether the string contains a URL, and returns the URL if it does.
 * @param text eg. hello https://google.com
 * @returns the URL, eg. https://google.com
 */
const extractUrlFromText = (text) => {
    var _a;
    return (!Defaults_1.URL_EXCLUDE_REGEX.test(text) ? (_a = text.match(Defaults_1.URL_REGEX)) === null || _a === void 0 ? void 0 : _a[0] : undefined);
};
exports.extractUrlFromText = extractUrlFromText;
const generateLinkPreviewIfRequired = async (text, getUrlInfo, logger) => {
    const url = (0, exports.extractUrlFromText)(text);
    if (!!getUrlInfo && url) {
        try {
            const urlInfo = await getUrlInfo(url);
            return urlInfo;
        }
        catch (error) { // ignore if fails
            logger === null || logger === void 0 ? void 0 : logger.warn({ trace: error.stack }, 'url generation failed');
        }
    }
};
exports.generateLinkPreviewIfRequired = generateLinkPreviewIfRequired;
const prepareWAMessageMedia = async (message, options) => {
    const logger = options.logger;
    let mediaType;
    for (const key of Defaults_1.MEDIA_KEYS) {
        if (key in message) {
            mediaType = key;
        }
    }
    if (!mediaType) {
        throw new boom_1.Boom('Invalid media type', { statusCode: 400 });
    }
    const uploadData = {
        ...message,
        media: message[mediaType]
    };
    delete uploadData[mediaType];
    // check if cacheable + generate cache key
    const cacheableKey = typeof uploadData.media === 'object' &&
        ('url' in uploadData.media) &&
        !!uploadData.media.url &&
        !!options.mediaCache && (
    // generate the key
    mediaType + ':' + uploadData.media.url.toString());
    if (mediaType === 'document' && !uploadData.fileName) {
        uploadData.fileName = 'file';
    }
    if (!uploadData.mimetype) {
        uploadData.mimetype = MIMETYPE_MAP[mediaType];
    }
    // check for cache hit
    if (cacheableKey) {
        const mediaBuff = options.mediaCache.get(cacheableKey);
        if (mediaBuff) {
            logger === null || logger === void 0 ? void 0 : logger.debug({ cacheableKey }, 'got media cache hit');
            const obj = Types_1.WAProto.Message.decode(mediaBuff);
            const key = `${mediaType}Message`;
            Object.assign(obj[key], { ...uploadData, media: undefined });
            return obj;
        }
    }
    const requiresDurationComputation = mediaType === 'audio' && typeof uploadData.seconds === 'undefined';
    const requiresThumbnailComputation = (mediaType === 'image' || mediaType === 'video') &&
        (typeof uploadData['jpegThumbnail'] === 'undefined');
    const requiresOriginalForSomeProcessing = requiresDurationComputation || requiresThumbnailComputation;
    const { mediaKey, encWriteStream, bodyPath, fileEncSha256, fileSha256, fileLength, didSaveToTmpPath } = await (0, messages_media_1.encryptedStream)(uploadData.media, mediaType, requiresOriginalForSomeProcessing);
    // url safe Base64 encode the SHA256 hash of the body
    const fileEncSha256B64 = encodeURIComponent(fileEncSha256.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=+$/, ''));
    const [{ mediaUrl, directPath }] = await Promise.all([
        (async () => {
            const result = await options.upload(encWriteStream, { fileEncSha256B64, mediaType, timeoutMs: options.mediaUploadTimeoutMs });
            logger === null || logger === void 0 ? void 0 : logger.debug({ mediaType, cacheableKey }, 'uploaded media');
            return result;
        })(),
        (async () => {
            try {
                if (requiresThumbnailComputation) {
                    uploadData.jpegThumbnail = await (0, messages_media_1.generateThumbnail)(bodyPath, mediaType, options);
                    logger === null || logger === void 0 ? void 0 : logger.debug('generated thumbnail');
                }
                if (requiresDurationComputation) {
                    uploadData.seconds = await (0, messages_media_1.getAudioDuration)(bodyPath);
                    logger === null || logger === void 0 ? void 0 : logger.debug('computed audio duration');
                }
            }
            catch (error) {
                logger === null || logger === void 0 ? void 0 : logger.warn({ trace: error.stack }, 'failed to obtain extra info');
            }
        })(),
    ])
        .finally(async () => {
        encWriteStream.destroy();
        // remove tmp files
        if (didSaveToTmpPath && bodyPath) {
            await fs_1.promises.unlink(bodyPath);
            logger === null || logger === void 0 ? void 0 : logger.debug('removed tmp files');
        }
    });
    const obj = Types_1.WAProto.Message.fromObject({
        [`${mediaType}Message`]: MessageTypeProto[mediaType].fromObject({
            url: mediaUrl,
            directPath,
            mediaKey,
            fileEncSha256,
            fileSha256,
            fileLength,
            mediaKeyTimestamp: (0, generics_1.unixTimestampSeconds)(),
            ...uploadData,
            media: undefined
        })
    });
    if (cacheableKey) {
        logger === null || logger === void 0 ? void 0 : logger.debug({ cacheableKey }, 'set cache');
        options.mediaCache.set(cacheableKey, Types_1.WAProto.Message.encode(obj).finish());
    }
    return obj;
};
exports.prepareWAMessageMedia = prepareWAMessageMedia;
const prepareDisappearingMessageSettingContent = (ephemeralExpiration) => {
    ephemeralExpiration = ephemeralExpiration || 0;
    const content = {
        ephemeralMessage: {
            message: {
                protocolMessage: {
                    type: Types_1.WAProto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING,
                    ephemeralExpiration
                }
            }
        }
    };
    return Types_1.WAProto.Message.fromObject(content);
};
exports.prepareDisappearingMessageSettingContent = prepareDisappearingMessageSettingContent;
/**
 * Generate forwarded message content like WA does
 * @param message the message to forward
 * @param options.forceForward will show the message as forwarded even if it is from you
 */
const generateForwardMessageContent = (message, forceForward) => {
    var _a;
    let content = message.message;
    if (!content) {
        throw new boom_1.Boom('no content in message', { statusCode: 400 });
    }
    // hacky copy
    content = (0, exports.normalizeMessageContent)(content);
    content = WAProto_1.proto.Message.decode(WAProto_1.proto.Message.encode(content).finish());
    let key = Object.keys(content)[0];
    let score = ((_a = content[key].contextInfo) === null || _a === void 0 ? void 0 : _a.forwardingScore) || 0;
    score += message.key.fromMe && !forceForward ? 0 : 1;
    if (key === 'conversation') {
        content.extendedTextMessage = { text: content[key] };
        delete content.conversation;
        key = 'extendedTextMessage';
    }
    if (score > 0) {
        content[key].contextInfo = { forwardingScore: score, isForwarded: true };
    }
    else {
        content[key].contextInfo = {};
    }
    return content;
};
exports.generateForwardMessageContent = generateForwardMessageContent;
const generateWAMessageContent = async (message, options) => {
    var _a;
    let m = {};
    if ('text' in message) {
        const extContent = { text: message.text };
        let urlInfo = message.linkPreview;
        if (typeof urlInfo === 'undefined') {
            urlInfo = await (0, exports.generateLinkPreviewIfRequired)(message.text, options.getUrlInfo, options.logger);
        }
        if (urlInfo) {
            extContent.canonicalUrl = urlInfo['canonical-url'];
            extContent.matchedText = urlInfo['matched-text'];
            extContent.jpegThumbnail = urlInfo.jpegThumbnail;
            extContent.description = urlInfo.description;
            extContent.title = urlInfo.title;
            extContent.previewType = 0;
        }
        m.extendedTextMessage = extContent;
    }
    else if ('contacts' in message) {
        const contactLen = message.contacts.contacts.length;
        if (!contactLen) {
            throw new boom_1.Boom('require atleast 1 contact', { statusCode: 400 });
        }
        if (contactLen === 1) {
            m.contactMessage = Types_1.WAProto.Message.ContactMessage.fromObject(message.contacts.contacts[0]);
        }
        else {
            m.contactsArrayMessage = Types_1.WAProto.Message.ContactsArrayMessage.fromObject(message.contacts);
        }
    }
    else if ('location' in message) {
        m.locationMessage = Types_1.WAProto.Message.LocationMessage.fromObject(message.location);
    }
    else if ('react' in message) {
        if (!message.react.senderTimestampMs) {
            message.react.senderTimestampMs = Date.now();
        }
        m.reactionMessage = Types_1.WAProto.Message.ReactionMessage.fromObject(message.react);
    }
    else if ('delete' in message) {
        m.protocolMessage = {
            key: message.delete,
            type: Types_1.WAProto.Message.ProtocolMessage.Type.REVOKE
        };
    }
    else if ('forward' in message) {
        m = (0, exports.generateForwardMessageContent)(message.forward, message.force);
    }
    else if ('disappearingMessagesInChat' in message) {
        const exp = typeof message.disappearingMessagesInChat === 'boolean' ?
            (message.disappearingMessagesInChat ? Defaults_1.WA_DEFAULT_EPHEMERAL : 0) :
            message.disappearingMessagesInChat;
        m = (0, exports.prepareDisappearingMessageSettingContent)(exp);
    }
    else if ('buttonReply' in message) {
        switch (message.type) {
            case 'template':
                m.templateButtonReplyMessage = {
                    selectedDisplayText: message.buttonReply.displayText,
                    selectedId: message.buttonReply.id,
                    selectedIndex: message.buttonReply.index,
                };
                break;
            case 'plain':
                m.buttonsResponseMessage = {
                    selectedButtonId: message.buttonReply.id,
                    selectedDisplayText: message.buttonReply.displayText,
                    type: WAProto_1.proto.Message.ButtonsResponseMessage.Type.DISPLAY_TEXT,
                };
                break;
        }
    }
    else if ('product' in message) {
        const { imageMessage } = await (0, exports.prepareWAMessageMedia)({ image: message.product.productImage }, options);
        m.productMessage = Types_1.WAProto.Message.ProductMessage.fromObject({
            ...message,
            product: {
                ...message.product,
                productImage: imageMessage,
            }
        });
    }
    else {
        m = await (0, exports.prepareWAMessageMedia)(message, options);
    }
    if ('buttons' in message && !!message.buttons) {
        const buttonsMessage = {
            buttons: message.buttons.map(b => ({ ...b, type: WAProto_1.proto.Message.ButtonsMessage.Button.Type.RESPONSE }))
        };
        if ('text' in message) {
            buttonsMessage.contentText = message.text;
            buttonsMessage.headerType = ButtonType.EMPTY;
        }
        else {
            if ('caption' in message) {
                buttonsMessage.contentText = message.caption;
            }
            const type = Object.keys(m)[0].replace('Message', '').toUpperCase();
            buttonsMessage.headerType = ButtonType[type];
            Object.assign(buttonsMessage, m);
        }
        if ('footer' in message && !!message.footer) {
            buttonsMessage.footerText = message.footer;
        }
        m = { buttonsMessage };
    }
    else if ('templateButtons' in message && !!message.templateButtons) {
        const msg = {
            hydratedButtons: message.templateButtons
        };
        if ('text' in message) {
            msg.hydratedContentText = message.text;
        }
        else {
            if ('caption' in message) {
                msg.hydratedContentText = message.caption;
            }
            Object.assign(msg, m);
        }
        if ('footer' in message && !!message.footer) {
            msg.hydratedFooterText = message.footer;
        }
        m = {
            templateMessage: {
                fourRowTemplate: msg,
                hydratedTemplate: msg
            }
        };
    }
    if ('sections' in message && !!message.sections) {
        const listMessage = {
            sections: message.sections,
            buttonText: message.buttonText,
            title: message.title,
            footerText: message.footer,
            description: message.text,
            listType: WAProto_1.proto.Message.ListMessage.ListType.SINGLE_SELECT
        };
        m = { listMessage };
    }
    if ('viewOnce' in message && !!message.viewOnce) {
        m = { viewOnceMessage: { message: m } };
    }
    if ('mentions' in message && ((_a = message.mentions) === null || _a === void 0 ? void 0 : _a.length)) {
        const [messageType] = Object.keys(m);
        m[messageType].contextInfo = m[messageType] || {};
        m[messageType].contextInfo.mentionedJid = message.mentions;
    }
    return Types_1.WAProto.Message.fromObject(m);
};
exports.generateWAMessageContent = generateWAMessageContent;
const generateWAMessageFromContent = (jid, message, options) => {
    if (!options.timestamp) {
        options.timestamp = new Date();
    } // set timestamp to now
    const key = Object.keys(message)[0];
    const timestamp = (0, generics_1.unixTimestampSeconds)(options.timestamp);
    const { quoted, userJid } = options;
    if (quoted) {
        const participant = quoted.key.fromMe ? userJid : (quoted.participant || quoted.key.participant || quoted.key.remoteJid);
        let quotedMsg = (0, exports.normalizeMessageContent)(quoted.message);
        const msgType = (0, exports.getContentType)(quotedMsg);
        // strip any redundant properties
        quotedMsg = WAProto_1.proto.Message.fromObject({ [msgType]: quotedMsg[msgType] });
        const quotedContent = quotedMsg[msgType];
        if (typeof quotedContent === 'object' && quotedContent && 'contextInfo' in quotedContent) {
            delete quotedContent.contextInfo;
        }
        const contextInfo = message[key].contextInfo || {};
        contextInfo.participant = (0, WABinary_1.jidNormalizedUser)(participant);
        contextInfo.stanzaId = quoted.key.id;
        contextInfo.quotedMessage = quotedMsg;
        // if a participant is quoted, then it must be a group
        // hence, remoteJid of group must also be entered
        if (quoted.key.participant || quoted.participant) {
            contextInfo.remoteJid = quoted.key.remoteJid;
        }
        message[key].contextInfo = contextInfo;
    }
    if (
    // if we want to send a disappearing message
    !!(options === null || options === void 0 ? void 0 : options.ephemeralExpiration) &&
        // and it's not a protocol message -- delete, toggle disappear message
        key !== 'protocolMessage' &&
        // already not converted to disappearing message
        key !== 'ephemeralMessage') {
        message[key].contextInfo = {
            ...(message[key].contextInfo || {}),
            expiration: options.ephemeralExpiration || Defaults_1.WA_DEFAULT_EPHEMERAL,
            //ephemeralSettingTimestamp: options.ephemeralOptions.eph_setting_ts?.toString()
        };
        message = {
            ephemeralMessage: {
                message
            }
        };
    }
    message = Types_1.WAProto.Message.fromObject(message);
    const messageJSON = {
        key: {
            remoteJid: jid,
            fromMe: true,
            id: (options === null || options === void 0 ? void 0 : options.messageId) || (0, generics_1.generateMessageID)(),
        },
        message: message,
        messageTimestamp: timestamp,
        messageStubParameters: [],
        participant: (0, WABinary_1.isJidGroup)(jid) ? userJid : undefined,
        status: Types_1.WAMessageStatus.PENDING
    };
    return Types_1.WAProto.WebMessageInfo.fromObject(messageJSON);
};
exports.generateWAMessageFromContent = generateWAMessageFromContent;
const generateWAMessage = async (jid, content, options) => {
    var _a;
    // ensure msg ID is with every log
    options.logger = (_a = options === null || options === void 0 ? void 0 : options.logger) === null || _a === void 0 ? void 0 : _a.child({ msgId: options.messageId });
    return (0, exports.generateWAMessageFromContent)(jid, await (0, exports.generateWAMessageContent)(content, options), options);
};
exports.generateWAMessage = generateWAMessage;
/** Get the key to access the true type of content */
const getContentType = (content) => {
    if (content) {
        const keys = Object.keys(content);
        const key = keys.find(k => (k === 'conversation' || k.endsWith('Message')) && k !== 'senderKeyDistributionMessage');
        return key;
    }
};
exports.getContentType = getContentType;
/**
 * Normalizes ephemeral, view once messages to regular message content
 * Eg. image messages in ephemeral messages, in view once messages etc.
 * @param content
 * @returns
 */
const normalizeMessageContent = (content) => {
    var _a, _b, _c, _d, _e;
    content = ((_c = (_b = (_a = content === null || content === void 0 ? void 0 : content.ephemeralMessage) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.viewOnceMessage) === null || _c === void 0 ? void 0 : _c.message) ||
        ((_d = content === null || content === void 0 ? void 0 : content.ephemeralMessage) === null || _d === void 0 ? void 0 : _d.message) ||
        ((_e = content === null || content === void 0 ? void 0 : content.viewOnceMessage) === null || _e === void 0 ? void 0 : _e.message) ||
        content ||
        undefined;
    return content;
};
exports.normalizeMessageContent = normalizeMessageContent;
/**
 * Extract the true message content from a message
 * Eg. extracts the inner message from a disappearing message/view once message
 */
const extractMessageContent = (content) => {
    var _a, _b, _c, _d, _e, _f;
    const extractFromTemplateMessage = (msg) => {
        if (msg.imageMessage) {
            return { imageMessage: msg.imageMessage };
        }
        else if (msg.documentMessage) {
            return { documentMessage: msg.documentMessage };
        }
        else if (msg.videoMessage) {
            return { videoMessage: msg.videoMessage };
        }
        else if (msg.locationMessage) {
            return { locationMessage: msg.locationMessage };
        }
        else {
            return { conversation: 'contentText' in msg ? msg.contentText : ('hydratedContentText' in msg ? msg.hydratedContentText : '') };
        }
    };
    content = (0, exports.normalizeMessageContent)(content);
    if (content === null || content === void 0 ? void 0 : content.buttonsMessage) {
        return extractFromTemplateMessage(content.buttonsMessage);
    }
    if ((_a = content === null || content === void 0 ? void 0 : content.templateMessage) === null || _a === void 0 ? void 0 : _a.hydratedFourRowTemplate) {
        return extractFromTemplateMessage((_b = content === null || content === void 0 ? void 0 : content.templateMessage) === null || _b === void 0 ? void 0 : _b.hydratedFourRowTemplate);
    }
    if ((_c = content === null || content === void 0 ? void 0 : content.templateMessage) === null || _c === void 0 ? void 0 : _c.hydratedTemplate) {
        return extractFromTemplateMessage((_d = content === null || content === void 0 ? void 0 : content.templateMessage) === null || _d === void 0 ? void 0 : _d.hydratedTemplate);
    }
    if ((_e = content === null || content === void 0 ? void 0 : content.templateMessage) === null || _e === void 0 ? void 0 : _e.fourRowTemplate) {
        return extractFromTemplateMessage((_f = content === null || content === void 0 ? void 0 : content.templateMessage) === null || _f === void 0 ? void 0 : _f.fourRowTemplate);
    }
    return content;
};
exports.extractMessageContent = extractMessageContent;
/**
 * Returns the device predicted by message ID
 */
const getDevice = (id) => {
    const deviceType = id.length > 21 ? 'android' : id.substring(0, 2) === '3A' ? 'ios' : 'web';
    return deviceType;
};
exports.getDevice = getDevice;
/** Upserts a receipt in the message */
const updateMessageWithReceipt = (msg, receipt) => {
    msg.userReceipt = msg.userReceipt || [];
    const recp = msg.userReceipt.find(m => m.userJid === receipt.userJid);
    if (recp) {
        Object.assign(recp, receipt);
    }
    else {
        msg.userReceipt.push(receipt);
    }
};
exports.updateMessageWithReceipt = updateMessageWithReceipt;
const getKeyAuthor = (key) => (((key === null || key === void 0 ? void 0 : key.fromMe) ? 'me' : (key === null || key === void 0 ? void 0 : key.participant) || (key === null || key === void 0 ? void 0 : key.remoteJid)) || '');
/** Update the message with a new reaction */
const updateMessageWithReaction = (msg, reaction) => {
    const authorID = getKeyAuthor(reaction.key);
    const reactions = (msg.reactions || [])
        .filter(r => getKeyAuthor(r.key) !== authorID);
    if (reaction.text) {
        reactions.push(reaction);
    }
    msg.reactions = reactions;
};
exports.updateMessageWithReaction = updateMessageWithReaction;
/** Given a list of message keys, aggregates them by chat & sender. Useful for sending read receipts in bulk */
const aggregateMessageKeysNotFromMe = (keys) => {
    const keyMap = {};
    for (const { remoteJid, id, participant, fromMe } of keys) {
        if (!fromMe) {
            const uqKey = `${remoteJid}:${participant || ''}`;
            if (!keyMap[uqKey]) {
                keyMap[uqKey] = {
                    jid: remoteJid,
                    participant: participant,
                    messageIds: []
                };
            }
            keyMap[uqKey].messageIds.push(id);
        }
    }
    return Object.values(keyMap);
};
exports.aggregateMessageKeysNotFromMe = aggregateMessageKeysNotFromMe;
const REUPLOAD_REQUIRED_STATUS = [410, 404];
/**
 * Downloads the given message. Throws an error if it's not a media message
 */
const downloadMediaMessage = async (message, type, options, ctx) => {
    var _a;
    try {
        const result = await downloadMsg();
        return result;
    }
    catch (error) {
        if (ctx) {
            if (axios_1.default.isAxiosError(error)) {
                // check if the message requires a reupload
                if (REUPLOAD_REQUIRED_STATUS.includes((_a = error.response) === null || _a === void 0 ? void 0 : _a.status)) {
                    ctx.logger.info({ key: message.key }, 'sending reupload media request...');
                    // request reupload
                    message = await ctx.reuploadRequest(message);
                    const result = await downloadMsg();
                    return result;
                }
            }
        }
        throw error;
    }
    async function downloadMsg() {
        const mContent = (0, exports.extractMessageContent)(message.message);
        if (!mContent) {
            throw new boom_1.Boom('No message present', { statusCode: 400, data: message });
        }
        const contentType = (0, exports.getContentType)(mContent);
        const mediaType = contentType === null || contentType === void 0 ? void 0 : contentType.replace('Message', '');
        const media = mContent[contentType];
        if (!media || typeof media !== 'object' || !('url' in media)) {
            throw new boom_1.Boom(`"${contentType}" message is not a media message`);
        }
        const stream = await (0, messages_media_1.downloadContentFromMessage)(media, mediaType, options);
        if (type === 'buffer') {
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            return buffer;
        }
        return stream;
    }
};
exports.downloadMediaMessage = downloadMediaMessage;
/** Checks whether the given message is a media message; if it is returns the inner content */
const assertMediaContent = (content) => {
    content = (0, exports.extractMessageContent)(content);
    const mediaContent = (content === null || content === void 0 ? void 0 : content.documentMessage)
        || (content === null || content === void 0 ? void 0 : content.imageMessage)
        || (content === null || content === void 0 ? void 0 : content.videoMessage)
        || (content === null || content === void 0 ? void 0 : content.audioMessage)
        || (content === null || content === void 0 ? void 0 : content.stickerMessage);
    if (!mediaContent) {
        throw new boom_1.Boom('given message is not a media message', { statusCode: 400, data: content });
    }
    return mediaContent;
};
exports.assertMediaContent = assertMediaContent;
const generateContextInfo = () => {
    const info = {
        deviceListMetadataVersion: 2,
        deviceListMetadata: {}
    };
    return info;
};
/**
 * this is an experimental patch to make buttons work
 * Don't know how it works, but it does for now
 */
const patchMessageForMdIfRequired = (message) => {
    const requiresPatch = !!(message.buttonsMessage
        // || message.templateMessage
        || message.listMessage);
    if (requiresPatch) {
        message = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: generateContextInfo(),
                    ...message
                }
            }
        };
    }
    return message;
};
exports.patchMessageForMdIfRequired = patchMessageForMdIfRequired;
