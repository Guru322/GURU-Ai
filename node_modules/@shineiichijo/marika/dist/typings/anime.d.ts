export interface IAnime {
    mal_id: number;
    url: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    trailer: {
        youtube_id: string;
        url: string;
        embed_url: string;
        images: {
            image_url: string;
            small_image_url: string;
            medium_image_url: string;
            large_image_url: string;
            maximum_image_url: string;
        };
    };
    approved: boolean;
    titles: {
        type: string;
        title: string;
    }[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: {
        from: string;
        to: string;
        prop: {
            from: {
                day: number;
                month: number;
                year: number;
            };
            to: {
                day: number;
                month: number;
                year: number;
            };
        };
        string: string;
    };
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: {
        day: string;
        time: string;
        timezone: string;
        string: string;
    };
    producers: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    licensors: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    studios: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    explicit_genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    themes: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    demographics: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
}
export interface IAnimeFull extends IAnime {
    relations: IAnimeRelations["data"];
    theme: IAnimeThemes;
    external: IAnimeExternal["data"];
    streaming: IAnimeExternal["data"];
}
export interface IAnimeCharacters {
    data: {
        character: {
            mal_id: number;
            url: string;
            images: {
                jpg: {
                    image_url: string;
                };
                webp: {
                    image_url: string;
                    small_image_url: string;
                };
            };
            name: string;
        };
        role: string;
        voice_actors: {
            person: {
                mal_id: number;
                url: string;
                images: {
                    jpg: {
                        image_url: string;
                    };
                };
                name: string;
            };
            language: string;
        }[];
    }[];
}
export interface IAnimeStaff {
    data: {
        person: {
            mal_id: number;
            url: string;
            images: {
                jpg: {
                    image_url: string;
                };
            };
            name: string;
        };
        positions: string[];
    }[];
}
export interface IAnimeEpisodes {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: {
        mal_id: number;
        url: string;
        title: string;
        title_japanese: string;
        title_romanji: string;
        aired: string;
        filler: boolean;
        recap: boolean;
        forum_url: string;
    }[];
}
export interface IAnimeEpisodeById {
    mal_id: number;
    url: string;
    title: string;
    title_japanese: string;
    title_romanji: string;
    duration: number;
    aired: string;
    filler: boolean;
    recap: boolean;
    synopsis: string;
}
export interface IAnimeNews {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: {
        mal_id: number;
        url: string;
        title: string;
        date: string;
        author_username: string;
        author_url: string;
        forum_url: string;
        images: {
            jpg: {
                image_url: string;
            };
        };
        comments: number;
        excerpt: string;
    }[];
}
export interface IAnimeForum {
    data: {
        mal_id: number;
        url: string;
        title: string;
        date: string;
        author_username: string;
        author_url: string;
        comments: number;
        last_comment: {
            url: string;
            author_username: string;
            author_url: string;
            date: string;
        };
    }[];
}
export interface IAnimeVideos {
    promo: {
        title: string;
        trailer: {
            youtube_id: string;
            url: string;
            embed_url: string;
            images: {
                image_url: string;
                small_image_url: string;
                medium_image_url: string;
                large_image_url: string;
                maximum_image_url: string;
            };
        };
    }[];
    episodes: {
        mal_id: number;
        title: string;
        epiosode: string;
        url: string;
        images: {
            jpg: {
                image_url: string;
            };
        };
    }[];
}
export interface IAnimePictures {
    data: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    }[];
}
export interface IAnimeStats {
    watching: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_watch: number;
    total: number;
    scores: {
        score: number;
        votes: number;
        percentage: number;
    }[];
}
export interface IAnimeMoreInfo {
    moreinfo: string;
}
export interface IAnimeRecommendations {
    data: {
        entry: {
            mal_id: number;
            url: string;
            images: {
                jpg: {
                    image_url: string;
                    small_image_url: string;
                    large_image_url: string;
                };
                webp: {
                    image_url: string;
                    small_image_url: string;
                    large_image_url: string;
                };
            };
            title: string;
        };
        url: string;
        votes: number;
    }[];
}
export interface IAnimeUserUpdates {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: {
        user: {
            username: string;
            url: string;
            images: {
                jpg: {
                    image_url: string;
                };
                webp: {
                    image_url: string;
                };
            };
        };
        score: number;
        status: string;
        episodes_seen: number;
        episodes_total: number;
        date: string;
    }[];
}
export interface IAnimeReviews {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: {
        mal_id: number;
        url: string;
        type: string;
        votes: number;
        date: string;
        review: string;
        episodes_watch: number;
        scores: {
            overall: number;
            story: number;
            animation: number;
            sound: number;
            character: number;
            enjoyment: number;
        };
        user: {
            url: string;
            username: string;
            images: {
                jpg: {
                    image_url: string;
                };
                webp: {
                    image_url: string;
                };
            };
        };
    }[];
}
export interface IAnimeRelations {
    data: {
        relation: string;
        entry: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
    }[];
}
export interface IAnimeThemes {
    openings: string[];
    endings: string[];
}
export interface IAnimeExternal {
    data: {
        name: string;
        url: string;
    }[];
}
export interface IAnimeSearch {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: IAnime[];
}
export interface ITopAnime {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: IAnime[];
}
