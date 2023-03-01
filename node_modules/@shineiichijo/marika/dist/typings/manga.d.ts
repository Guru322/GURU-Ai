export interface IManga {
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
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    chapters: number;
    volumes: number;
    status: string;
    publishing: boolean;
    published: {
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
    scored: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    authors: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    serializations: {
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
export interface IMangaCharacters {
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
                };
            };
            name: string;
        };
        role: string;
    }[];
}
export interface IMangaNews {
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
export interface IMangaTopics {
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
export interface IMangaPictures {
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
export interface IMangaStats {
    reading: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_read: number;
    total: number;
    scores: {
        score: number;
        votes: number;
        percentage: number;
    }[];
}
export interface IMangaMoreInfo {
    moreinfo: string;
}
export interface IMangaRecommendations {
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
export interface IMangaUserUpdates {
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
        volumes_read: number;
        volumes_total: number;
        chapters_read: number;
        chapters_total: number;
        date: string;
    }[];
}
export interface IMangaReviews {
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
        chapters_read: number;
        scores: {
            overall: number;
            story: number;
            art: number;
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
export interface IMangaRelations {
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
export interface IMangaExternals {
    data: {
        name: string;
        url: string;
    }[];
}
export interface IMangaSearch {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: IManga[];
}
export interface ITopManga {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: IManga[];
}
