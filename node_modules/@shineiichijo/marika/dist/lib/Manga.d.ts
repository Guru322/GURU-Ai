import { IManga, IMangaCharacters, IMangaNews, IMangaTopics, IMangaPictures, IMangaStats, IMangaMoreInfo, IMangaRecommendations, IMangaUserUpdates, IMangaReviews, IMangaRelations, IMangaExternals, IMangaSearch, ITopManga, IMangaSearchOptions, ISimpleOption } from '../typings';
export declare class Manga {
    constructor();
    /**
     * Method for getting random Manga with info
     *  @returns {IManga}
     */
    getRandomManga: () => Promise<IManga>;
    /**
     * Method for getting the info of the given Manga ID
     * @param {number} id ID of the Manga
     * @returns {IManga}
     */
    getMangaById: (id: number) => Promise<IManga>;
    /**
     * Method for getting Manga characters
     * @param {number} id ID of the Manga
     * @returns {IMangaCharacters}
     */
    getMangaCharacters: (id: number) => Promise<IMangaCharacters>;
    /**
     * Method for getting news of the given Manga ID
     * @param {number} id ID of the Manga
     * @param {ISimpleOption} options The page of the news
     * @returns {IMangaNews}
     */
    getMangaNews: (id: number, options?: ISimpleOption | undefined) => Promise<IMangaNews>;
    /**
     * Method for getting Manga topics
     * @param {number} id ID of the Manga
     * @returns {IMangaTopics}
     */
    getMangaTopics: (id: number) => Promise<IMangaTopics>;
    /**
     * Method for getting pictures of the given Manga ID
     * @param {number} id ID of the Manga
     * @returns {IMangaPictures}
     */
    getMangaPictures: (id: number) => Promise<IMangaPictures>;
    /**
     * Method for getting the statistics of the given Manga ID
     * @param {number} id ID of the Manga
     * @returns {IMangaStats}
     */
    getMangaStats: (id: number) => Promise<IMangaStats>;
    /**
     * Method for getting more info of the given Manga ID
     * @param {number} id ID of the Manga
     * @returns {IMangaMoreInfo}
     */
    getMangaMoreInfo: (id: number) => Promise<IMangaMoreInfo>;
    /**
     * Method for getting recommendations of the given Manga ID
     * @param {number} id ID of the Manga
     * @returns {IMangaRecommendations}
     */
    getMangaRecommendations: (id: number) => Promise<IMangaRecommendations>;
    /**
     * Method for getting user updates of the given Manga ID
     * @param {number} id ID of the Manga
     * @param {ISimpleOption} page Page of the list
     * @returns {IMangaUserUpdates}
     */
    getMangaUserUpdates: (id: number, options?: ISimpleOption | undefined) => Promise<IMangaUserUpdates>;
    /**
     * Method for getting reviews of the given Manga ID
     * @param {number} id ID of the Manga
     * @param {ISimpleOption} options Page of the list
     * @returns {IMangaReviews}
     */
    getMangaReviews: (id: number, options?: ISimpleOption | undefined) => Promise<IMangaReviews>;
    /**
     * Method for getting relations of the given Manga ID
     * @param {number} id ID of the Manga
     * @returns {IMangaRelations}
     */
    getMangaRelations: (id: number) => Promise<IMangaRelations>;
    /**
     * Method for getting external of the given Manga ID
     * @param {number} id ID of the Manga
     * @returns {IMangaExternals}
     */
    getMangaExternal: (id: number) => Promise<IMangaExternals>;
    /**
     * Method for searching Manga
     * @param {string} query of the Manga
     * @param {IMangaSearchOptions} options The options for searching
     * @returns {IMangaSearch}
     */
    searchManga: (query: string, options?: IMangaSearchOptions | undefined) => Promise<IMangaSearch>;
    /**
     * Method for getting the list of top Manga
     * @param {ISimpleOption} page Page of the list
     * @returns {ITopManga}
     */
    getTopManga(options?: ISimpleOption): Promise<ITopManga>;
    private utils;
}
