"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const axios_1 = __importDefault(require("axios"));
class utils {
    constructor() {
        /**
         * Returns Anime query searching URL
         * @param {string} url The url of the API
         * @param {string} query The query of the Anime
         * @param {IAnimeSearchOptions} options The options to use for searching
         */
        this.getAnimeQuerySearchUrl = (url, query, options) => {
            let result = url;
            const i = options;
            result += `?q=${query}`;
            if (options === null || options === void 0 ? void 0 : options.sfw)
                result += '&sfw';
            if (i === null || i === void 0 ? void 0 : i.page)
                result += `&page=${i.page}`;
            if (i === null || i === void 0 ? void 0 : i.limit)
                result += `&limit=${i.limit}`;
            if (i === null || i === void 0 ? void 0 : i.genres)
                result += `&genres=${i.genres}`;
            if (i === null || i === void 0 ? void 0 : i.type)
                result += `&type=${i.type}`;
            if (i === null || i === void 0 ? void 0 : i.score)
                result += `&score=${i.score}`;
            if (i === null || i === void 0 ? void 0 : i.min_score)
                result += `&min_score=${i.min_score}`;
            if (i === null || i === void 0 ? void 0 : i.max_score)
                result += `&max_score=${i.max_score}`;
            if (i === null || i === void 0 ? void 0 : i.status)
                result += `&status=${i.status}`;
            if (i === null || i === void 0 ? void 0 : i.rating)
                result += `&rating=${i.rating}`;
            if (i === null || i === void 0 ? void 0 : i.genres_exclude)
                result += `&genres_exclude=${i.genres_exclude}`;
            if (i === null || i === void 0 ? void 0 : i.order_by)
                result += `&order_by=${i.order_by}`;
            if (i === null || i === void 0 ? void 0 : i.sort)
                result += `&sort=${i.sort}`;
            if (i === null || i === void 0 ? void 0 : i.letter)
                result += `&letter=${i.letter}`;
            if (i === null || i === void 0 ? void 0 : i.producer)
                result += `&producer=${i.producer}`;
            return result;
        };
        /**
         * Returns Manga query searching URL
         * @param {string} url The url of the API
         * @param {string} query The query of the Manga
         * @param {IMangaSearchOptions} options The options to use for searching
         */
        this.getMangaQuerySearchUrl = (url, query, options) => {
            let result = url;
            const i = options;
            result += `?q=${query}`;
            if (options === null || options === void 0 ? void 0 : options.sfw)
                result += '&sfw';
            if (i === null || i === void 0 ? void 0 : i.page)
                result += `&page=${i === null || i === void 0 ? void 0 : i.page}}`;
            if (i === null || i === void 0 ? void 0 : i.limit)
                result += `&limit=${i.limit}`;
            if (i === null || i === void 0 ? void 0 : i.genres)
                result += `&genres=${i.genres}`;
            if (i === null || i === void 0 ? void 0 : i.type)
                result += `&type=${i.type}`;
            if (i === null || i === void 0 ? void 0 : i.score)
                result += `&score=${i.score}`;
            if (i === null || i === void 0 ? void 0 : i.min_score)
                result += `&min_score=${i.min_score}`;
            if (i === null || i === void 0 ? void 0 : i.max_score)
                result += `&max_score=${i.max_score}`;
            if (i === null || i === void 0 ? void 0 : i.status)
                result += `&status=${i.status}`;
            if (i === null || i === void 0 ? void 0 : i.genres_exclude)
                result += `&genres_exclude=${i.genres_exclude}`;
            if (i === null || i === void 0 ? void 0 : i.order_by)
                result += `&order_by=${i.order_by}`;
            if (i === null || i === void 0 ? void 0 : i.sort)
                result += `&sort=${i.sort}`;
            if (i === null || i === void 0 ? void 0 : i.letter)
                result += `&letter=${i.letter}`;
            if (i === null || i === void 0 ? void 0 : i.magazine)
                result += `&magazine=${i.magazine}`;
            return result;
        };
        /**
         * Returns Character query searching URL
         * @param {string} url The url of the API
         * @param {string} query The query of the Character
         * @param {IAnimeSearchOptions} options The options to use for searching
         */
        this.getCharacterQuerySearchUrl = (url, query, options) => {
            let result = url;
            const i = options;
            result += `?q=${query}`;
            if (i === null || i === void 0 ? void 0 : i.page)
                result += `&page=${i.page}`;
            if (i === null || i === void 0 ? void 0 : i.limit)
                result += `&limit=${i.limit}`;
            if (i === null || i === void 0 ? void 0 : i.order_by)
                result += `&order_by=${i.order_by}`;
            if (i === null || i === void 0 ? void 0 : i.sort)
                result += `&sort=${i.sort}`;
            if (i === null || i === void 0 ? void 0 : i.letter)
                result += `&letter=${i.letter}`;
            return result;
        };
        /**
         * Returns URL of the API according to the method
         * @param {TMethods} method The method to be used
         */
        this.getUrl = (method) => {
            let result = 'https://api.jikan.moe/v4/';
            result += method;
            return result;
        };
        this.fetch = (url) => __awaiter(this, void 0, void 0, function* () { return yield (yield axios_1.default.get(url)).data; });
    }
}
exports.utils = utils;
