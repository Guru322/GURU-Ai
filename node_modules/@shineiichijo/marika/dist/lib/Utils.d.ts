import { IAnimeSearchOptions, ICharacterSearchOptions, IMangaSearchOptions, TMethods } from '../typings/searchOptions';
export declare class utils {
    /**
     * Returns Anime query searching URL
     * @param {string} url The url of the API
     * @param {string} query The query of the Anime
     * @param {IAnimeSearchOptions} options The options to use for searching
     */
    getAnimeQuerySearchUrl: (url: string, query: string, options?: IAnimeSearchOptions | undefined) => string;
    /**
     * Returns Manga query searching URL
     * @param {string} url The url of the API
     * @param {string} query The query of the Manga
     * @param {IMangaSearchOptions} options The options to use for searching
     */
    getMangaQuerySearchUrl: (url: string, query: string, options?: IMangaSearchOptions | undefined) => string;
    /**
     * Returns Character query searching URL
     * @param {string} url The url of the API
     * @param {string} query The query of the Character
     * @param {IAnimeSearchOptions} options The options to use for searching
     */
    getCharacterQuerySearchUrl: (url: string, query: string, options?: ICharacterSearchOptions | undefined) => string;
    /**
     * Returns URL of the API according to the method
     * @param {TMethods} method The method to be used
     */
    getUrl: (method: TMethods) => string;
    fetch: <T>(url: string) => Promise<T>;
}
