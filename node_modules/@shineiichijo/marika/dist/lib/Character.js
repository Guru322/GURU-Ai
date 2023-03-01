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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const _1 = require("./");
class Character {
    constructor() {
        /**
         * Method for getting random Character with info
         * @returns {ICharacter}
         */
        this.getRandomCharacter = () => __awaiter(this, void 0, void 0, function* () {
            let url = this.utils.getUrl('random');
            url += '/characters';
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the info of the given Character ID
         * @param {number} id the ID of the Character
         * @returns {ICharacter}
         */
        this.getCharacterById = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Character.');
            let url = this.utils.getUrl('characters');
            url += `/${id}`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the Anime of the given Character ID
         * @param {number} id The ID of the Character
         * @returns {ICharacterAnime}
         */
        this.getCharacterAnime = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Character.');
            let url = this.utils.getUrl('characters');
            url += `/${id}/anime`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the Manga of the given Character ID
         * @param {number} id The ID of the Character
         * @returns {ICharacterManga}
         */
        this.getCharacterManga = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Character.');
            let url = this.utils.getUrl('characters');
            url += `/${id}/manga`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the Voice Actors of the given Character ID
         * @param {number} id The ID of the Character
         * @returns {ICharacterVoices}
         */
        this.getCharacterVoiceActors = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Character.');
            let url = this.utils.getUrl('characters');
            url += `/${id}/voices`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting pictures of the given Character ID
         * @param {number} id The ID of the Character
         * @returns {ICharacterPictures}
         */
        this.getCharacterPictures = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Character.');
            let url = this.utils.getUrl('characters');
            url += `/${id}/pictures`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for searching Character
         * @param {string} query The Character name that you wanna search
         * @param {ICharacterSearchOptions} options The options for searching
         * @returns {ICharacterSearch}
         */
        this.searchCharacter = (query, options) => __awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new TypeError('Provide the query of the Character');
            const baseUrl = this.utils.getUrl('characters');
            const url = this.utils.getCharacterQuerySearchUrl(baseUrl, query, options);
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting top Characters in MyAnimeList
         * @param {ISimpleOption} page The page of the list
         * @returns {ITopCharacter}
         */
        this.getTopCharacters = (options) => __awaiter(this, void 0, void 0, function* () {
            let url = this.utils.getUrl('top');
            url += '/characters';
            if (options === null || options === void 0 ? void 0 : options.query)
                url += `?page=${options === null || options === void 0 ? void 0 : options.query}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        this.utils = new _1.utils();
    }
}
exports.Character = Character;
