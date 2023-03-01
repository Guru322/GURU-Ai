"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emoji = exports.Parser = exports.EmojiAPI = void 0;
const Parser_1 = require("./Parser");
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return Parser_1.Parser; } });
const Emoji_1 = require("./Emoji");
Object.defineProperty(exports, "Emoji", { enumerable: true, get: function () { return Emoji_1.Emoji; } });
const Singleton_1 = require("./decorators/Singleton");
const Collection_1 = __importDefault(require("./Collection"));
let EmojiAPI = class EmojiAPI {
    constructor() {
        this.cache = new Collection_1.default();
    }
    async get(emoji, force = false) {
        if (!force) {
            const cached = this.cache.findOne(emoji);
            if (cached)
                return cached;
        }
        const basicInfo = await this.getBasicInfo(emoji);
        if (!basicInfo)
            throw new Error("Emoji not found!");
        const em = new Emoji_1.Emoji(basicInfo);
        this.cache.set(emoji, em);
        return em;
    }
    async getBasicInfo(emoji) {
        try {
            const raw = await Parser_1.Parser.getHTML(emoji);
            if (!raw)
                return null;
            const basicInfo = Parser_1.Parser.fetchData(raw);
            return basicInfo;
        }
        catch {
            return null;
        }
    }
    EmojiToUnicode(emoji) {
        return Parser_1.Parser.emojiUnicode(emoji);
    }
    UnicodeToEmoji(unicode) {
        return String.fromCodePoint(parseInt(unicode, 16));
    }
};
EmojiAPI = __decorate([
    Singleton_1.singleton
], EmojiAPI);
exports.EmojiAPI = EmojiAPI;
exports.default = EmojiAPI;
