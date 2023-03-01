interface EmojiRawData {
    emoji: string;
    unicode: string;
    name: string;
    description: string;
    images: EmojiImage[];
    shortCodes: string[];
}
interface EmojiImage {
    index: number;
    vendor: string;
    url: string;
}
declare class Parser {
    static getHTML(emoji: string): Promise<string>;
    static fetchData(html: string): EmojiRawData;
    static emojiUnicode(emoji: string): string;
}

declare class Emoji {
    emoji?: string;
    unicode?: string;
    name?: string;
    description?: string;
    images: EmojiImage[];
    shortCodes: string[];
    constructor(data: any);
    _patch(data: any): void;
    get encodeURI(): string;
    get Apple(): EmojiImage;
    get Google(): EmojiImage;
    get Samsung(): EmojiImage;
    get Microsoft(): EmojiImage;
    get WhatsApp(): EmojiImage;
    get Twitter(): EmojiImage;
    get Facebook(): EmojiImage;
    get JoyPixels(): EmojiImage;
    get OpenMoji(): EmojiImage;
    get Emojidex(): EmojiImage;
    get Messenger(): EmojiImage;
    get LG(): EmojiImage;
    get HTC(): EmojiImage;
    get Mozilla(): EmojiImage;
    get SoftBank(): EmojiImage;
    get Docomo(): EmojiImage;
    get auByKDDI(): EmojiImage;
    toArray(): EmojiImage[];
    toString(): string;
    toJSON(): {
        emoji: string;
        name: string;
        unicode: string;
        description: string;
        images: EmojiImage[];
        shortCodes: string[];
    };
}

declare class Collection<K, V> extends Map<K, V> {
    find(fn: (data?: V, key?: K) => boolean): V | undefined;
    findOne(arg: string): V;
}

declare class EmojiAPI {
    cache: Collection<string, Emoji>;
    get(emoji: string, force?: boolean): Promise<Emoji>;
    getBasicInfo(emoji: string): Promise<EmojiRawData>;
    EmojiToUnicode(emoji: string): string;
    UnicodeToEmoji(unicode: string): string;
}

export { Emoji, EmojiAPI, EmojiImage, EmojiRawData, Parser, EmojiAPI as default };
