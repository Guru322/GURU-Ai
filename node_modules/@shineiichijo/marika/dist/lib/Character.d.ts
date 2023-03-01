import { ICharacter, ICharacterAnime, ICharacterManga, ICharacterVoices, ICharacterPictures, ICharacterSearch, ITopCharacter, ICharacterSearchOptions, ISimpleOption } from '../typings';
export declare class Character {
    constructor();
    /**
     * Method for getting random Character with info
     * @returns {ICharacter}
     */
    getRandomCharacter: () => Promise<ICharacter>;
    /**
     * Method for getting the info of the given Character ID
     * @param {number} id the ID of the Character
     * @returns {ICharacter}
     */
    getCharacterById: (id: number) => Promise<ICharacter>;
    /**
     * Method for getting the Anime of the given Character ID
     * @param {number} id The ID of the Character
     * @returns {ICharacterAnime}
     */
    getCharacterAnime: (id: number) => Promise<ICharacterAnime>;
    /**
     * Method for getting the Manga of the given Character ID
     * @param {number} id The ID of the Character
     * @returns {ICharacterManga}
     */
    getCharacterManga: (id: string) => Promise<ICharacterManga>;
    /**
     * Method for getting the Voice Actors of the given Character ID
     * @param {number} id The ID of the Character
     * @returns {ICharacterVoices}
     */
    getCharacterVoiceActors: (id: number) => Promise<ICharacterVoices>;
    /**
     * Method for getting pictures of the given Character ID
     * @param {number} id The ID of the Character
     * @returns {ICharacterPictures}
     */
    getCharacterPictures: (id: number) => Promise<ICharacterPictures>;
    /**
     * Method for searching Character
     * @param {string} query The Character name that you wanna search
     * @param {ICharacterSearchOptions} options The options for searching
     * @returns {ICharacterSearch}
     */
    searchCharacter: (query: string, options?: ICharacterSearchOptions | undefined) => Promise<ICharacterSearch>;
    /**
     * Method for getting top Characters in MyAnimeList
     * @param {ISimpleOption} page The page of the list
     * @returns {ITopCharacter}
     */
    getTopCharacters: (options?: ISimpleOption | undefined) => Promise<ITopCharacter>;
    private utils;
}
