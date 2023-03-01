import { IAnime, IAnimeFull, IAnimeCharacters, IAnimeStaff, IAnimeEpisodes, IAnimeEpisodeById, IAnimeNews, IAnimeForum, IAnimeVideos, IAnimePictures, IAnimeStats, IAnimeMoreInfo, IAnimeRecommendations, IAnimeUserUpdates, IAnimeReviews, IAnimeRelations, IAnimeThemes, IAnimeExternal, IAnimeSearch, ITopAnime, IAnimeSearchOptions, ISimpleOption, TAnimeFilter } from '../typings';
export declare class Anime {
    constructor();
    /**
     * Method for getting the info of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnime}
     */
    getAnimeById: (id: number) => Promise<IAnime>;
    /**
     * Method for getting the complete info of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnime}
     */
    getAnimeFullById: (id: number) => Promise<IAnimeFull>;
    /**
     * Method for getting the characters of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeCharacters}
     */
    getAnimeCharacters: (id: number) => Promise<IAnimeCharacters>;
    /**
     * Method for getting the staffs of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeStaff}
     */
    getAnimeStaff: (id: number) => Promise<IAnimeStaff>;
    /**
     * Method for getting the list of episodes of the given Anime ID
     * @param {number} id The ID of the Anime
     * @param {ISimpleOption} page The page of the list
     * @returns {IAnimeEpisodes}
     */
    getAnimeEpisodes: (id: number, page?: ISimpleOption | undefined) => Promise<IAnimeEpisodes>;
    /**
     * Method for getting an episode of the given Anime ID
     * @param {number} id The ID of the Anime
     * @param {ISimpleOption} episode The episode of the Anime
     * @returns {IAnimeEpisodeById}
     */
    getAnimeEpisodeById: (id: number, episode: ISimpleOption) => Promise<IAnimeEpisodeById>;
    /**
     * Method for getting news of the given Anime ID
     * @param {number} id The ID of the Anime
     * @param {ISimpleOption} page The page of the news
     * @returns {IAnimeNews}
     */
    getAnimeNews: (id: number, options?: ISimpleOption | undefined) => Promise<IAnimeNews>;
    /**
     * Method for getting forum of the given Anime ID
     * @param {number} id The ID of the Anime
     * @param {TAnimeFilter} filter The filter for search
     * @returns {IAnimeForum}
     */
    getAnimeForum: (id: number, filter?: TAnimeFilter | undefined) => Promise<IAnimeForum>;
    /**
     * Method for getting videos of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeVideos}
     */
    getAnimeVideos: (id: number) => Promise<IAnimeVideos>;
    /**
     * Method for getting pictures of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimePictures}
     */
    getAnimePictures: (id: number) => Promise<IAnimePictures>;
    /**
     * Method for getting statistics of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeStats}
     */
    getAnimeStats: (id: number) => Promise<IAnimeStats>;
    /**
     * Method for getting more info of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeMoreInfo}
     */
    getAnimeMoreInfo: (id: number) => Promise<IAnimeMoreInfo>;
    /**
     * Method for getting recommendations of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeRecommendations}
     */
    getAnimeRecommendations: (id: number) => Promise<IAnimeRecommendations>;
    /**
     * Method for getting user updates of the given Anime ID
     * @param {number} id The ID of the Anime
     * @param {ISimpleOption} page The page of the updates
     * @returns {IAnimeUserUpdates}
     */
    getAnimeUserUpdates: (id: number, options?: ISimpleOption | undefined) => Promise<IAnimeUserUpdates>;
    /**
     * Method for getting reviews of the given Anime ID
     * @param {number} id The ID of the Anime
     * @param {ISimpleOption} page The page of the reviews
     * @returns {IAnimeReviews}
     */
    getAnimeReviews: (id: number, options?: ISimpleOption | undefined) => Promise<IAnimeReviews>;
    /**
     * Method for getting relations of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeRelations}
     */
    getAnimeRelations: (id: number) => Promise<IAnimeRelations>;
    /**
     * Method for getting themes of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeThemes}
     */
    getAnimeThemes: (id: number) => Promise<IAnimeThemes>;
    /**
     * Method for getting externals of the given Anime ID
     * @param {number} id The ID of the Anime
     * @returns {IAnimeExternal}
     */
    getAnimeExternals: (id: number) => Promise<IAnimeExternal>;
    /**
     * Method for searching Anime
     * @param {string} query The Anime title that you wanna search
     * @param {IAnimeSearchOptions} options The options for searching
     * @returns {IAnimeSearch}
     */
    searchAnime: (query: string, options?: IAnimeSearchOptions | undefined) => Promise<IAnimeSearch>;
    /**
     * Method for getting top Anime list
     * @param {ISimpleOption} page The page of the list
     * @returns {ITopAnime}
     */
    getTopAnime: (options?: ISimpleOption | undefined) => Promise<ITopAnime>;
    /**
     * Method for getting random Anime with info
     * @returns {IAnime}
     */
    getRandomAnime: () => Promise<IAnime>;
    private utils;
}
