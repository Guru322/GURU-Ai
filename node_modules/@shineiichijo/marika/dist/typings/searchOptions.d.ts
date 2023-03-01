export interface IAnimeSearchOptions {
    page?: number;
    limit?: number;
    type?: TAnimeType;
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: TAnimeStatus;
    rating?: TAnimeRating;
    sfw?: boolean;
    genres?: number[];
    genres_exclude?: number[];
    order_by?: TAnimeOrder;
    sort?: TSort;
    letter?: string;
    producer?: number[];
}
export interface ICharacterSearchOptions {
    page?: number;
    limit?: number;
    order_by?: TCharacterOrder;
    sort?: TSort;
    letter?: string;
}
export interface IMangaSearchOptions {
    page?: number;
    limit?: number;
    type?: TMangaType;
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: TMangaStatus;
    sfw?: boolean;
    genres?: number[];
    genres_exclude?: number[];
    order_by?: TMangaOrder;
    sort?: TSort;
    letter?: string;
    magazine?: number[];
}
export interface ISimpleOption {
    query?: number;
}
export declare type TAnimeType = 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
export declare type TMangaType = 'manga' | 'novel' | 'doujin' | 'manhwa' | 'manhua' | 'lightnovel' | 'oneshot';
export declare type TAnimeStatus = 'airing' | 'complete' | 'upcoming';
export declare type TMangaStatus = 'publishing' | 'complete' | 'hiatus' | 'discontinued' | 'upcoming';
export declare type TAnimeRating = 'g' | 'pg' | 'pg13' | 'r' | 'r17' | 'r' | 'rx';
export declare type TAnimeOrder = 'mal_id' | 'title' | 'type' | 'rating' | 'start_date' | 'end_date' | 'episodes' | 'score' | 'scored_by' | 'rank' | 'popularity' | 'members' | 'favorites';
export declare type TAnimeFilter = 'all' | 'episode' | 'other';
export declare type TMangaOrder = 'mal_id' | 'title' | 'start_date' | 'end_date' | 'chapters' | 'volumes' | 'score' | 'scored_by' | 'rank' | 'popularity' | 'members' | 'favorites';
export declare type TCharacterOrder = 'mal_id' | 'name' | 'favorites';
export declare type TSort = 'desc' | 'asc';
export declare type TMethods = 'anime' | 'manga' | 'characters' | 'random' | 'top';
