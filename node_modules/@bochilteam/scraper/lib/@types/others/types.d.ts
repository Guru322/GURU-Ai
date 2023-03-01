import { z } from 'zod';
export declare const WikipediaArgsSchema: z.ZodObject<{
    0: z.ZodString;
    1: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
    1: string;
}, {
    0: string;
    1: string;
}>;
export declare const WikipediaSchema: z.ZodObject<{
    title: z.ZodString;
    img: z.ZodString;
    articles: z.ZodString;
}, "strip", z.ZodTypeAny, {
    img: string;
    title: string;
    articles: string;
}, {
    img: string;
    title: string;
    articles: string;
}>;
export declare type WikipediaArgs = z.infer<typeof WikipediaArgsSchema>;
export declare type Wikipedia = z.infer<typeof WikipediaSchema>;
export declare const ResultJadwalTVSchema: z.ZodObject<{
    date: z.ZodString;
    event: z.ZodString;
}, "strip", z.ZodTypeAny, {
    event: string;
    date: string;
}, {
    event: string;
    date: string;
}>;
export declare const JadwalTVArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const JadwalTVSchema: z.ZodObject<{
    channel: z.ZodString;
    result: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        event: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        event: string;
        date: string;
    }, {
        event: string;
        date: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    channel: string;
    result: {
        event: string;
        date: string;
    }[];
}, {
    channel: string;
    result: {
        event: string;
        date: string;
    }[];
}>;
export declare const JadwalTVNOWSchema: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
    date: z.ZodString;
    event: z.ZodString;
}, "strip", z.ZodTypeAny, {
    event: string;
    date: string;
}, {
    event: string;
    date: string;
}>, "many">>;
export declare type ResultJadwalTV = z.infer<typeof ResultJadwalTVSchema>;
export declare type JadwalTVArgs = z.infer<typeof JadwalTVArgsSchema>;
export declare type JadwalTV = z.infer<typeof JadwalTVSchema>;
export declare type JadwalTVNOW = z.infer<typeof JadwalTVNOWSchema>;
export declare const MediafireArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const MediafireSchema: z.ZodObject<{
    url: z.ZodString;
    url2: z.ZodString;
    filename: z.ZodString;
    filetype: z.ZodString;
    ext: z.ZodString;
    aploud: z.ZodString;
    filesizeH: z.ZodString;
    filesize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    filename: string;
    url: string;
    ext: string;
    filesize: number;
    url2: string;
    filetype: string;
    aploud: string;
    filesizeH: string;
}, {
    filename: string;
    url: string;
    ext: string;
    filesize: number;
    url2: string;
    filetype: string;
    aploud: string;
    filesizeH: string;
}>;
export declare type Mediafire = z.infer<typeof MediafireSchema>;
export declare const IBMKGSchema: z.ZodObject<{
    date: z.ZodString;
    magnitude: z.ZodString;
    depth: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}>;
export declare const GempaSchema: z.ZodIntersection<z.ZodObject<{
    locate: z.ZodString;
    warning: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    warning: string[];
    locate: string;
}, {
    warning: string[];
    locate: string;
}>, z.ZodObject<{
    date: z.ZodString;
    magnitude: z.ZodString;
    depth: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}>>;
export declare const GempaNowSchema: z.ZodIntersection<z.ZodObject<{
    latitude: z.ZodString;
    longitude: z.ZodString;
}, "strip", z.ZodTypeAny, {
    latitude: string;
    longitude: string;
}, {
    latitude: string;
    longitude: string;
}>, z.ZodObject<{
    date: z.ZodString;
    magnitude: z.ZodString;
    depth: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}>>;
export declare const TsunamiSchema: z.ZodIntersection<z.ZodObject<{
    locate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    locate: string;
}, {
    locate: string;
}>, z.ZodObject<{
    date: z.ZodString;
    magnitude: z.ZodString;
    depth: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}, {
    location: string;
    date: string;
    magnitude: string;
    depth: string;
}>>;
export declare type IBMKG = z.infer<typeof IBMKGSchema>;
export declare type Gempa = z.infer<typeof GempaSchema>;
export declare type GempaNow = z.infer<typeof GempaNowSchema>;
export declare type Tsunami = z.infer<typeof TsunamiSchema>;
export declare const LyricsArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const LyricsSchema: z.ZodObject<{
    title: z.ZodString;
    author: z.ZodString;
    lyrics: z.ZodString;
    link: z.ZodString;
}, "strip", z.ZodTypeAny, {
    link: string;
    title: string;
    author: string;
    lyrics: string;
}, {
    link: string;
    title: string;
    author: string;
    lyrics: string;
}>;
export declare type LyricsArgs = z.infer<typeof LyricsArgsSchema>;
export declare type Lyrics = z.infer<typeof LyricsSchema>;
export declare const KbbiArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const KbbiSchema: z.ZodObject<{
    index: z.ZodNumber;
    title: z.ZodString;
    means: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    index: number;
    title: string;
    means: string[];
}, {
    index: number;
    title: string;
    means: string[];
}>;
export declare type KbbiArgs = z.infer<typeof KbbiArgsSchema>;
export declare type Kbbi = z.infer<typeof KbbiSchema>;
export declare const MinecraftJavaArgsSchema: z.ZodObject<{
    0: z.ZodString;
    1: z.ZodNumber;
    2: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        timeout: number;
    }, {
        timeout: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    2?: {
        timeout: number;
    } | undefined;
    0: string;
    1: number;
}, {
    2?: {
        timeout: number;
    } | undefined;
    0: string;
    1: number;
}>;
export declare const IMinecraftResponseSchema: z.ZodObject<{
    description: z.ZodObject<{
        extra: z.ZodArray<z.ZodObject<{
            color: z.ZodString;
            text: z.ZodString;
            bold: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            bold?: boolean | undefined;
            color: string;
            text: string;
        }, {
            bold?: boolean | undefined;
            color: string;
            text: string;
        }>, "many">;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        extra: {
            bold?: boolean | undefined;
            color: string;
            text: string;
        }[];
    }, {
        text: string;
        extra: {
            bold?: boolean | undefined;
            color: string;
            text: string;
        }[];
    }>;
    players: z.ZodObject<{
        max: z.ZodNumber;
        online: z.ZodNumber;
        sample: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
        }, {
            id: string;
            name: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        max: number;
        sample: {
            id: string;
            name: string;
        }[];
        online: number;
    }, {
        max: number;
        sample: {
            id: string;
            name: string;
        }[];
        online: number;
    }>;
    version: z.ZodObject<{
        name: z.ZodString;
        protocol: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        protocol: number;
    }, {
        name: string;
        protocol: number;
    }>;
    favicon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: {
        text: string;
        extra: {
            bold?: boolean | undefined;
            color: string;
            text: string;
        }[];
    };
    players: {
        max: number;
        sample: {
            id: string;
            name: string;
        }[];
        online: number;
    };
    version: {
        name: string;
        protocol: number;
    };
    favicon: string;
}, {
    description: {
        text: string;
        extra: {
            bold?: boolean | undefined;
            color: string;
            text: string;
        }[];
    };
    players: {
        max: number;
        sample: {
            id: string;
            name: string;
        }[];
        online: number;
    };
    version: {
        name: string;
        protocol: number;
    };
    favicon: string;
}>;
export declare const MinecraftJavaSchema: z.ZodObject<{
    ip: z.ZodString;
    port: z.ZodNumber;
    description: z.ZodString;
    descriptionText: z.ZodString;
    players: z.ZodObject<{
        max: z.ZodNumber;
        online: z.ZodNumber;
        sample: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        max: number;
        sample: string[];
        online: number;
    }, {
        max: number;
        sample: string[];
        online: number;
    }>;
    version: z.ZodObject<{
        name: z.ZodString;
        protocol: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        protocol: number;
    }, {
        name: string;
        protocol: number;
    }>;
    favicon: z.ZodOptional<z.ZodString>;
    ping: z.ZodNumber;
    originalResponse: z.ZodObject<{
        description: z.ZodObject<{
            extra: z.ZodArray<z.ZodObject<{
                color: z.ZodString;
                text: z.ZodString;
                bold: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }, {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }>, "many">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            extra: {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }[];
        }, {
            text: string;
            extra: {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }[];
        }>;
        players: z.ZodObject<{
            max: z.ZodNumber;
            online: z.ZodNumber;
            sample: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
            }, {
                id: string;
                name: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            max: number;
            sample: {
                id: string;
                name: string;
            }[];
            online: number;
        }, {
            max: number;
            sample: {
                id: string;
                name: string;
            }[];
            online: number;
        }>;
        version: z.ZodObject<{
            name: z.ZodString;
            protocol: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            protocol: number;
        }, {
            name: string;
            protocol: number;
        }>;
        favicon: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: {
            text: string;
            extra: {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }[];
        };
        players: {
            max: number;
            sample: {
                id: string;
                name: string;
            }[];
            online: number;
        };
        version: {
            name: string;
            protocol: number;
        };
        favicon: string;
    }, {
        description: {
            text: string;
            extra: {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }[];
        };
        players: {
            max: number;
            sample: {
                id: string;
                name: string;
            }[];
            online: number;
        };
        version: {
            name: string;
            protocol: number;
        };
        favicon: string;
    }>;
}, "strip", z.ZodTypeAny, {
    favicon?: string | undefined;
    description: string;
    port: number;
    ping: number;
    players: {
        max: number;
        sample: string[];
        online: number;
    };
    version: {
        name: string;
        protocol: number;
    };
    ip: string;
    descriptionText: string;
    originalResponse: {
        description: {
            text: string;
            extra: {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }[];
        };
        players: {
            max: number;
            sample: {
                id: string;
                name: string;
            }[];
            online: number;
        };
        version: {
            name: string;
            protocol: number;
        };
        favicon: string;
    };
}, {
    favicon?: string | undefined;
    description: string;
    port: number;
    ping: number;
    players: {
        max: number;
        sample: string[];
        online: number;
    };
    version: {
        name: string;
        protocol: number;
    };
    ip: string;
    descriptionText: string;
    originalResponse: {
        description: {
            text: string;
            extra: {
                bold?: boolean | undefined;
                color: string;
                text: string;
            }[];
        };
        players: {
            max: number;
            sample: {
                id: string;
                name: string;
            }[];
            online: number;
        };
        version: {
            name: string;
            protocol: number;
        };
        favicon: string;
    };
}>;
export declare type IMinecraftResponse = z.infer<typeof IMinecraftResponseSchema>;
export declare type MinecraftJava = z.infer<typeof MinecraftJavaSchema>;
export declare const NameFreeFireArgsSchema: z.ZodObject<{
    0: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    0: string | number;
}, {
    0: string | number;
}>;
export declare const NameFreeFireSchema: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    username: string;
}, {
    id: string;
    username: string;
}>;
export declare type NameFreeFireArgs = z.infer<typeof NameFreeFireArgsSchema>;
export declare type NameFreeFire = z.infer<typeof NameFreeFireSchema>;
export declare const BioskopNowSchema: z.ZodObject<{
    title: z.ZodString;
    img: z.ZodString;
    url: z.ZodString;
    genre: z.ZodString;
    duration: z.ZodString;
    playingAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    img: string;
    title: string;
    duration: string;
    genre: string;
    playingAt: string;
}, {
    url: string;
    img: string;
    title: string;
    duration: string;
    genre: string;
    playingAt: string;
}>;
export declare const BioskopArgsSchema: z.ZodObject<{
    0: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
}, "strip", z.ZodTypeAny, {
    0?: string | number | undefined;
}, {
    0?: string | number | undefined;
}>;
export declare const BioskopSchema: z.ZodObject<{
    title: z.ZodString;
    img: z.ZodString;
    url: z.ZodString;
    genre: z.ZodString;
    duration: z.ZodString;
    release: z.ZodString;
    director: z.ZodString;
    cast: z.ZodString;
}, "strip", z.ZodTypeAny, {
    release: string;
    url: string;
    img: string;
    title: string;
    duration: string;
    genre: string;
    director: string;
    cast: string;
}, {
    release: string;
    url: string;
    img: string;
    title: string;
    duration: string;
    genre: string;
    director: string;
    cast: string;
}>;
export declare type BioskopNow = z.infer<typeof BioskopNowSchema>;
export declare type BioskopArgs = z.infer<typeof BioskopArgsSchema>;
export declare type Bioskop = z.infer<typeof BioskopSchema>;
export declare const ChordArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const ChordSchema: z.ZodObject<{
    url: z.ZodString;
    artist: z.ZodString;
    artistUrl: z.ZodUnion<[z.ZodString, z.ZodString]>;
    title: z.ZodString;
    chord: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    title: string;
    artist: string;
    artistUrl: string;
    chord: string;
}, {
    url: string;
    title: string;
    artist: string;
    artistUrl: string;
    chord: string;
}>;
export declare type ChordArgs = z.infer<typeof ChordArgsSchema>;
export declare type Chord = z.infer<typeof ChordSchema>;
export declare const ZippyShareArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const ZippyShareSchema: z.ZodObject<{
    url: z.ZodString;
    filename: z.ZodString;
    filesizeH: z.ZodString;
    filesize: z.ZodNumber;
    aploud: z.ZodString;
    lastDownload: z.ZodString;
}, "strip", z.ZodTypeAny, {
    filename: string;
    url: string;
    filesize: number;
    aploud: string;
    filesizeH: string;
    lastDownload: string;
}, {
    filename: string;
    url: string;
    filesize: number;
    aploud: string;
    filesizeH: string;
    lastDownload: string;
}>;
export declare type ZippyShareArgs = z.infer<typeof ZippyShareArgsSchema>;
export declare type ZippyShare = z.infer<typeof ZippyShareSchema>;
//# sourceMappingURL=types.d.ts.map