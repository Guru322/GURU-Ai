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
exports.Manga = void 0;
const _1 = require("./");
class Manga {
    constructor() {
        /**
         * Method for getting random Manga with info
         *  @returns {IManga}
         */
        this.getRandomManga = () => __awaiter(this, void 0, void 0, function* () {
            let url = this.utils.getUrl('random');
            url += '/manga';
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the info of the given Manga ID
         * @param {number} id ID of the Manga
         * @returns {IManga}
         */
        this.getMangaById = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide ID of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting Manga characters
         * @param {number} id ID of the Manga
         * @returns {IMangaCharacters}
         */
        this.getMangaCharacters = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting news of the given Manga ID
         * @param {number} id ID of the Manga
         * @param {ISimpleOption} options The page of the news
         * @returns {IMangaNews}
         */
        this.getMangaNews = (id, options) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError(`Provide the id of the Manga`);
            let url = this.utils.getUrl('manga');
            url += `/${id}/news`;
            const i = options === null || options === void 0 ? void 0 : options.query;
            let q = 1;
            if (i)
                q = i;
            url += `?page=${q}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting Manga topics
         * @param {number} id ID of the Manga
         * @returns {IMangaTopics}
         */
        this.getMangaTopics = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}/forum`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting pictures of the given Manga ID
         * @param {number} id ID of the Manga
         * @returns {IMangaPictures}
         */
        this.getMangaPictures = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}/pictures`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the statistics of the given Manga ID
         * @param {number} id ID of the Manga
         * @returns {IMangaStats}
         */
        this.getMangaStats = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}/statistics`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting more info of the given Manga ID
         * @param {number} id ID of the Manga
         * @returns {IMangaMoreInfo}
         */
        this.getMangaMoreInfo = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}/moreinfo`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting recommendations of the given Manga ID
         * @param {number} id ID of the Manga
         * @returns {IMangaRecommendations}
         */
        this.getMangaRecommendations = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}/recommendations`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting user updates of the given Manga ID
         * @param {number} id ID of the Manga
         * @param {ISimpleOption} page Page of the list
         * @returns {IMangaUserUpdates}
         */
        this.getMangaUserUpdates = (id, options) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError(`Provide the id of the Manga`);
            let url = this.utils.getUrl('manga');
            url += `/${id}/userupdates`;
            const i = options === null || options === void 0 ? void 0 : options.query;
            let q = 1;
            if (i)
                q = i;
            url += `?page=${q}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting reviews of the given Manga ID
         * @param {number} id ID of the Manga
         * @param {ISimpleOption} options Page of the list
         * @returns {IMangaReviews}
         */
        this.getMangaReviews = (id, options) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError(`Provide the id of the Manga`);
            let url = this.utils.getUrl('manga');
            url += `/${id}/reviews`;
            const i = options === null || options === void 0 ? void 0 : options.query;
            let q = 1;
            if (i)
                q = i;
            url += `?page=${q}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting relations of the given Manga ID
         * @param {number} id ID of the Manga
         * @returns {IMangaRelations}
         */
        this.getMangaRelations = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}/relations`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting external of the given Manga ID
         * @param {number} id ID of the Manga
         * @returns {IMangaExternals}
         */
        this.getMangaExternal = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Manga');
            let url = this.utils.getUrl('manga');
            url += `/${id}/external`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for searching Manga
         * @param {string} query of the Manga
         * @param {IMangaSearchOptions} options The options for searching
         * @returns {IMangaSearch}
         */
        this.searchManga = (query, options) => __awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new TypeError('Provide the query of the Manga');
            const baseUrl = this.utils.getUrl('manga');
            const url = this.utils.getMangaQuerySearchUrl(baseUrl, query, options);
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        this.utils = new _1.utils();
    }
    /**
     * Method for getting the list of top Manga
     * @param {ISimpleOption} page Page of the list
     * @returns {ITopManga}
     */
    getTopManga(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.utils.getUrl('top');
            url += '/manga';
            if (options === null || options === void 0 ? void 0 : options.query)
                url += `?page=${options === null || options === void 0 ? void 0 : options.query}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
    }
}
exports.Manga = Manga;
