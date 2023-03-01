export interface ICharacter {
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
    nicknames: string[];
    favorites: number;
    about: string;
}
export interface ICharacterAnime {
    data: {
        role: string;
        anime: {
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
    }[];
}
export interface ICharacterManga {
    data: {
        role: string;
        manga: {
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
    }[];
}
export interface ICharacterVoices {
    data: {
        language: string;
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
    }[];
}
export interface ICharacterPictures {
    data: {
        jpg: {
            image_url: string;
        };
    }[];
}
export interface ICharacterSearch {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: ICharacter[];
}
export interface ITopCharacter {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
    data: ICharacter[];
}
