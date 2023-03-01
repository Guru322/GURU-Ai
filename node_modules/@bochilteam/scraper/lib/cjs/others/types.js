"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZippyShareSchema = exports.ZippyShareArgsSchema = exports.ChordSchema = exports.ChordArgsSchema = exports.BioskopSchema = exports.BioskopArgsSchema = exports.BioskopNowSchema = exports.NameFreeFireSchema = exports.NameFreeFireArgsSchema = exports.MinecraftJavaSchema = exports.IMinecraftResponseSchema = exports.MinecraftJavaArgsSchema = exports.KbbiSchema = exports.KbbiArgsSchema = exports.LyricsSchema = exports.LyricsArgsSchema = exports.TsunamiSchema = exports.GempaNowSchema = exports.GempaSchema = exports.IBMKGSchema = exports.MediafireSchema = exports.MediafireArgsSchema = exports.JadwalTVNOWSchema = exports.JadwalTVSchema = exports.JadwalTVArgsSchema = exports.ResultJadwalTVSchema = exports.WikipediaSchema = exports.WikipediaArgsSchema = void 0;
const zod_1 = require("zod");
const constant_js_1 = require("../constant.js");
exports.WikipediaArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY),
    1: zod_1.z.string()
});
exports.WikipediaSchema = zod_1.z.object({
    title: zod_1.z.string(),
    img: zod_1.z.string().url(),
    articles: zod_1.z.string()
});
exports.ResultJadwalTVSchema = zod_1.z.object({
    date: zod_1.z.string(),
    event: zod_1.z.string()
});
exports.JadwalTVArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.JadwalTVSchema = zod_1.z.object({
    channel: zod_1.z.string(),
    result: exports.ResultJadwalTVSchema.array()
});
exports.JadwalTVNOWSchema = zod_1.z.record(exports.ResultJadwalTVSchema.array());
exports.MediafireArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.MediafireSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    url2: zod_1.z.string().url(),
    filename: zod_1.z.string(),
    filetype: zod_1.z.string(),
    ext: zod_1.z.string(),
    aploud: zod_1.z.string(),
    filesizeH: zod_1.z.string(),
    filesize: zod_1.z.number()
});
exports.IBMKGSchema = zod_1.z.object({
    date: zod_1.z.string(),
    magnitude: zod_1.z.string(),
    depth: zod_1.z.string(),
    location: zod_1.z.string()
});
exports.GempaSchema = zod_1.z.object({
    locate: zod_1.z.string(),
    warning: zod_1.z.string().array()
}).and(exports.IBMKGSchema);
exports.GempaNowSchema = zod_1.z.object({
    latitude: zod_1.z.string(),
    longitude: zod_1.z.string()
}).and(exports.IBMKGSchema);
exports.TsunamiSchema = zod_1.z.object({
    locate: zod_1.z.string()
}).and(exports.IBMKGSchema);
exports.LyricsArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.LyricsSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    lyrics: zod_1.z.string(),
    link: zod_1.z.string()
});
exports.KbbiArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.KbbiSchema = zod_1.z.object({
    index: zod_1.z.number(),
    title: zod_1.z.string(),
    means: zod_1.z.string().array().min(1)
});
exports.MinecraftJavaArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.IP).url(),
    1: zod_1.z.number(constant_js_1.ERROR_ARGS.PORT).min(0).max(65535),
    2: zod_1.z.object({
        timeout: zod_1.z.number()
    }).optional()
});
exports.IMinecraftResponseSchema = zod_1.z.object({
    description: zod_1.z.object({
        extra: zod_1.z.object({
            color: zod_1.z.string(),
            text: zod_1.z.string(),
            bold: zod_1.z.boolean().optional()
        }).array(),
        text: zod_1.z.string()
    }),
    players: zod_1.z.object({
        max: zod_1.z.number(),
        online: zod_1.z.number(),
        sample: zod_1.z.object({
            name: zod_1.z.string(),
            id: zod_1.z.string()
        }).array()
    }),
    version: zod_1.z.object({
        name: zod_1.z.string(),
        protocol: zod_1.z.number()
    }),
    favicon: zod_1.z.string()
});
exports.MinecraftJavaSchema = zod_1.z.object({
    ip: zod_1.z.string(),
    port: zod_1.z.number(),
    description: zod_1.z.string(),
    descriptionText: zod_1.z.string(),
    players: zod_1.z.object({
        max: zod_1.z.number(),
        online: zod_1.z.number(),
        sample: zod_1.z.string().array()
    }),
    version: zod_1.z.object({
        name: zod_1.z.string(),
        protocol: zod_1.z.number()
    }),
    favicon: zod_1.z.string().optional(),
    ping: zod_1.z.number(),
    originalResponse: exports.IMinecraftResponseSchema
});
exports.NameFreeFireArgsSchema = zod_1.z.object({
    0: zod_1.z.string().or(zod_1.z.number())
});
exports.NameFreeFireSchema = zod_1.z.object({
    id: zod_1.z.string(),
    username: zod_1.z.string()
});
exports.BioskopNowSchema = zod_1.z.object({
    title: zod_1.z.string(),
    img: zod_1.z.string().url(),
    url: zod_1.z.string().url(),
    genre: zod_1.z.string(),
    duration: zod_1.z.string(),
    playingAt: zod_1.z.string()
});
exports.BioskopArgsSchema = zod_1.z.object({
    0: zod_1.z.number().or(zod_1.z.string()).optional()
});
exports.BioskopSchema = zod_1.z.object({
    title: zod_1.z.string(),
    img: zod_1.z.string().url(),
    url: zod_1.z.string().url(),
    genre: zod_1.z.string(),
    duration: zod_1.z.string(),
    release: zod_1.z.string(),
    director: zod_1.z.string(),
    cast: zod_1.z.string()
});
exports.ChordArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.ChordSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    artist: zod_1.z.string(),
    artistUrl: zod_1.z.string().url().or(zod_1.z.string()),
    title: zod_1.z.string(),
    chord: zod_1.z.string()
});
exports.ZippyShareArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.ZippyShareSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    // url2: z.string().url(),
    filename: zod_1.z.string(),
    filesizeH: zod_1.z.string(),
    filesize: zod_1.z.number(),
    aploud: zod_1.z.string(),
    lastDownload: zod_1.z.string()
});
//# sourceMappingURL=types.js.map