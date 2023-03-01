import { z } from 'zod';
import { ERROR_ARGS } from '../constant.js';
export const WikipediaArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY),
    1: z.string()
});
export const WikipediaSchema = z.object({
    title: z.string(),
    img: z.string().url(),
    articles: z.string()
});
export const ResultJadwalTVSchema = z.object({
    date: z.string(),
    event: z.string()
});
export const JadwalTVArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY)
});
export const JadwalTVSchema = z.object({
    channel: z.string(),
    result: ResultJadwalTVSchema.array()
});
export const JadwalTVNOWSchema = z.record(ResultJadwalTVSchema.array());
export const MediafireArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const MediafireSchema = z.object({
    url: z.string().url(),
    url2: z.string().url(),
    filename: z.string(),
    filetype: z.string(),
    ext: z.string(),
    aploud: z.string(),
    filesizeH: z.string(),
    filesize: z.number()
});
export const IBMKGSchema = z.object({
    date: z.string(),
    magnitude: z.string(),
    depth: z.string(),
    location: z.string()
});
export const GempaSchema = z.object({
    locate: z.string(),
    warning: z.string().array()
}).and(IBMKGSchema);
export const GempaNowSchema = z.object({
    latitude: z.string(),
    longitude: z.string()
}).and(IBMKGSchema);
export const TsunamiSchema = z.object({
    locate: z.string()
}).and(IBMKGSchema);
export const LyricsArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY)
});
export const LyricsSchema = z.object({
    title: z.string(),
    author: z.string(),
    lyrics: z.string(),
    link: z.string()
});
export const KbbiArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY)
});
export const KbbiSchema = z.object({
    index: z.number(),
    title: z.string(),
    means: z.string().array().min(1)
});
export const MinecraftJavaArgsSchema = z.object({
    0: z.string(ERROR_ARGS.IP).url(),
    1: z.number(ERROR_ARGS.PORT).min(0).max(65535),
    2: z.object({
        timeout: z.number()
    }).optional()
});
export const IMinecraftResponseSchema = z.object({
    description: z.object({
        extra: z.object({
            color: z.string(),
            text: z.string(),
            bold: z.boolean().optional()
        }).array(),
        text: z.string()
    }),
    players: z.object({
        max: z.number(),
        online: z.number(),
        sample: z.object({
            name: z.string(),
            id: z.string()
        }).array()
    }),
    version: z.object({
        name: z.string(),
        protocol: z.number()
    }),
    favicon: z.string()
});
export const MinecraftJavaSchema = z.object({
    ip: z.string(),
    port: z.number(),
    description: z.string(),
    descriptionText: z.string(),
    players: z.object({
        max: z.number(),
        online: z.number(),
        sample: z.string().array()
    }),
    version: z.object({
        name: z.string(),
        protocol: z.number()
    }),
    favicon: z.string().optional(),
    ping: z.number(),
    originalResponse: IMinecraftResponseSchema
});
export const NameFreeFireArgsSchema = z.object({
    0: z.string().or(z.number())
});
export const NameFreeFireSchema = z.object({
    id: z.string(),
    username: z.string()
});
export const BioskopNowSchema = z.object({
    title: z.string(),
    img: z.string().url(),
    url: z.string().url(),
    genre: z.string(),
    duration: z.string(),
    playingAt: z.string()
});
export const BioskopArgsSchema = z.object({
    0: z.number().or(z.string()).optional()
});
export const BioskopSchema = z.object({
    title: z.string(),
    img: z.string().url(),
    url: z.string().url(),
    genre: z.string(),
    duration: z.string(),
    release: z.string(),
    director: z.string(),
    cast: z.string()
});
export const ChordArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY)
});
export const ChordSchema = z.object({
    url: z.string().url(),
    artist: z.string(),
    artistUrl: z.string().url().or(z.string()),
    title: z.string(),
    chord: z.string()
});
export const ZippyShareArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const ZippyShareSchema = z.object({
    url: z.string().url(),
    // url2: z.string().url(),
    filename: z.string(),
    filesizeH: z.string(),
    filesize: z.number(),
    aploud: z.string(),
    lastDownload: z.string()
});
export const SfileMobiSearchArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY),
    1: z.number().min(0).optional()
});
export const SfileMobiSearchSchema = z.object({
    url: z.string().url(),
    filename: z.string(),
    icon: z.string().url(),
    type: z.string(),
    filesizeH: z.string(),
    filesize: z.number()
});
export const SfileMobiArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const SfileMobiSchema = z.object({
    url: z.string().url(),
    filename: z.string(),
    icon: z.string(),
    type: z.string(),
    mimetype: z.string(),
    aploud: z.string(),
    aploudby: z.string(),
    aploudbyUrl: z.string().url(),
    aploudon: z.string(),
    aploudonUrl: z.string().url(),
    downloads: z.number(),
    filesizeH: z.string(),
    filesize: z.number()
});
//# sourceMappingURL=types.js.map