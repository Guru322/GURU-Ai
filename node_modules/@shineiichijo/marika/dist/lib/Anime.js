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
exports.Anime = void 0;
const _1 = require("./");
class Anime {
    constructor() {
        /**
         * Method for getting the info of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnime}
         */
        this.getAnimeById = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime.');
            let url = this.utils.getUrl('anime');
            url += `/${id}`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the complete info of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnime}
         */
        this.getAnimeFullById = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime.');
            let url = this.utils.getUrl('anime');
            url += `/${id}/full`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the characters of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeCharacters}
         */
        this.getAnimeCharacters = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime.');
            let url = this.utils.getUrl('anime');
            url += `/${id}/characters`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the staffs of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeStaff}
         */
        this.getAnimeStaff = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime.');
            let url = this.utils.getUrl('anime');
            url += `/${id}/staff`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting the list of episodes of the given Anime ID
         * @param {number} id The ID of the Anime
         * @param {ISimpleOption} page The page of the list
         * @returns {IAnimeEpisodes}
         */
        this.getAnimeEpisodes = (id, page) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime.');
            let url = this.utils.getUrl('anime');
            url += `/${id}/episodes`;
            const i = page === null || page === void 0 ? void 0 : page.query;
            let q = 1;
            if (i)
                q = i;
            url += `?query=${q}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting an episode of the given Anime ID
         * @param {number} id The ID of the Anime
         * @param {ISimpleOption} episode The episode of the Anime
         * @returns {IAnimeEpisodeById}
         */
        this.getAnimeEpisodeById = (id, episode) => __awaiter(this, void 0, void 0, function* () {
            if (!id || !episode.query)
                throw new TypeError('Make sure you have provided the required fields');
            let url = this.utils.getUrl('anime');
            url += `/${id}/episodes/${episode.query}`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting news of the given Anime ID
         * @param {number} id The ID of the Anime
         * @param {ISimpleOption} page The page of the news
         * @returns {IAnimeNews}
         */
        this.getAnimeNews = (id, options) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError(`Provide the id of the Anime`);
            let url = this.utils.getUrl('anime');
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
         * Method for getting forum of the given Anime ID
         * @param {number} id The ID of the Anime
         * @param {TAnimeFilter} filter The filter for search
         * @returns {IAnimeForum}
         */
        this.getAnimeForum = (id, filter) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/forum`;
            if (!filter)
                url += '';
            else
                url += `?filter=${filter}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting videos of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeVideos}
         */
        this.getAnimeVideos = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime.');
            let url = this.utils.getUrl('anime');
            url += `/${id}/videos`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting pictures of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimePictures}
         */
        this.getAnimePictures = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/pictures`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting statistics of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeStats}
         */
        this.getAnimeStats = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/statistics`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting more info of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeMoreInfo}
         */
        this.getAnimeMoreInfo = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/moreinfo`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting recommendations of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeRecommendations}
         */
        this.getAnimeRecommendations = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/recommendations`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting user updates of the given Anime ID
         * @param {number} id The ID of the Anime
         * @param {ISimpleOption} page The page of the updates
         * @returns {IAnimeUserUpdates}
         */
        this.getAnimeUserUpdates = (id, options) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
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
         * Method for getting reviews of the given Anime ID
         * @param {number} id The ID of the Anime
         * @param {ISimpleOption} page The page of the reviews
         * @returns {IAnimeReviews}
         */
        this.getAnimeReviews = (id, options) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
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
         * Method for getting relations of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeRelations}
         */
        this.getAnimeRelations = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/relations`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting themes of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeThemes}
         */
        this.getAnimeThemes = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/themes`;
            return yield this.utils
                .fetch(url)
                .then((res) => res.data)
                .catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting externals of the given Anime ID
         * @param {number} id The ID of the Anime
         * @returns {IAnimeExternal}
         */
        this.getAnimeExternals = (id) => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new TypeError('Provide the id of the Anime');
            let url = this.utils.getUrl('anime');
            url += `/${id}/external`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for searching Anime
         * @param {string} query The Anime title that you wanna search
         * @param {IAnimeSearchOptions} options The options for searching
         * @returns {IAnimeSearch}
         */
        this.searchAnime = (query, options) => __awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new TypeError('Provide the query of the Anime');
            const baseUrl = this.utils.getUrl('anime');
            const url = this.utils.getAnimeQuerySearchUrl(baseUrl, query, options);
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting top Anime list
         * @param {ISimpleOption} page The page of the list
         * @returns {ITopAnime}
         */
        this.getTopAnime = (options) => __awaiter(this, void 0, void 0, function* () {
            let url = this.utils.getUrl('top');
            url += '/anime';
            if (!(options === null || options === void 0 ? void 0 : options.query))
                url += '';
            else
                url += `?page=${options === null || options === void 0 ? void 0 : options.query}`;
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        /**
         * Method for getting random Anime with info
         * @returns {IAnime}
         */
        this.getRandomAnime = () => __awaiter(this, void 0, void 0, function* () {
            let url = this.utils.getUrl('random');
            url += '/anime';
            return yield this.utils.fetch(url).catch((err) => {
                throw new Error(err);
            });
        });
        this.utils = new _1.utils();
    }
}
exports.Anime = Anime;
