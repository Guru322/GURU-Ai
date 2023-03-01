"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapSaveSchema = exports.SnapSaveArgsSchema = exports.SaveFromSchema = exports.SaveFromArgsSchema = exports.AiovideodlSchema = exports.AiovideodlArgsSchema = exports.GroupWASchema = exports.GroupWAArgsSchema = exports.YoutubeDonwloaderV3Schema = exports.YoutubeVideoOrAudioV3Schema = exports.YoutubeDownloaderV3ArgsSchema = exports.YoutubeDownloaderV2ArgsSchema = exports.YoutubeDonwloaderSchema = exports.YoutubeVideoOrAudioSchema = exports.YoutubeDownloaderArgsSchema = exports.TwitterDownloaderV2Schema = exports.TwitterDownloaderSchema = exports.ItwitterDownloaderSchema = exports.TwitterDownloaderArgsSchema = exports.GoogleItSchema = exports.GoogleItArgsSchema = exports.TiktokDownloaderV3Schema = exports.TiktokDownloaderV2Schema = exports.TiktokDownloaderSchema = exports.TiktokDownloaderArgsSchema = exports.InstagramStalkSchema = exports.InstagramStalkArgsSchema = exports.InstagramStoryV2Schema = exports.InstagramStoryArgsSchema = exports.IinstagramStorySchema = exports.InstagramDownloaderV3Schema = exports.InstagramDownloaderV2Schema = exports.InstagramDownloaderSchema = exports.IinstagramDownloaderSchema = exports.InstagramDownloaderArgsSchema = exports.FacebookDownloaderV3Schema = exports.FacebookDownloaderV2Schema = exports.FacebookDownloaderSchema = exports.FacebookDownloaderArgsSchema = void 0;
const zod_1 = require("zod");
const constant_js_1 = require("../constant.js");
exports.FacebookDownloaderArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.FacebookDownloaderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    thumbnail: zod_1.z.string(),
    duration: zod_1.z.number(),
    result: zod_1.z.object({
        size: zod_1.z.string().or(zod_1.z.number()).optional(),
        ext: zod_1.z.string(),
        url: zod_1.z.string(),
        quality: zod_1.z.string().optional(),
        vcodec: zod_1.z.string().optional(),
        fid: zod_1.z.string(),
        isVideo: zod_1.z.boolean(),
        isAudio: zod_1.z.boolean()
    }).array().min(1)
});
exports.FacebookDownloaderV2Schema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    thumbnail: zod_1.z.string(),
    result: zod_1.z.object({
        quality: zod_1.z.string(),
        url: zod_1.z.string()
    }).array().min(1)
});
exports.FacebookDownloaderV3Schema = zod_1.z.object({
    title: zod_1.z.string(),
    thumbnail: zod_1.z.string().optional(),
    result: zod_1.z.object({
        quality: zod_1.z.string().optional(),
        url: zod_1.z.string(),
        isAudio: zod_1.z.boolean(),
        isVideo: zod_1.z.boolean()
    }).array().min(1)
});
exports.InstagramDownloaderArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.IinstagramDownloaderSchema = zod_1.z.object({
    url: zod_1.z.string()
});
exports.InstagramDownloaderSchema = zod_1.z.object({
    thumbnail: zod_1.z.string()
}).and(exports.IinstagramDownloaderSchema);
exports.InstagramDownloaderV2Schema = exports.IinstagramDownloaderSchema.extend({
    thumbnail: zod_1.z.string().optional(),
    resolution: zod_1.z.string().optional()
});
exports.InstagramDownloaderV3Schema = zod_1.z.object({
    url: zod_1.z.string().url(),
    title: zod_1.z.string(),
    thumbnail: zod_1.z.string().url(),
    duration: zod_1.z.string(),
    source: zod_1.z.string(),
    medias: zod_1.z.object({
        url: zod_1.z.string().url(),
        quality: zod_1.z.string(),
        formattedSize: zod_1.z.string(),
        extension: zod_1.z.string(),
        audioAvailable: zod_1.z.boolean(),
        videoAvailable: zod_1.z.boolean(),
        cached: zod_1.z.boolean(),
        chunked: zod_1.z.boolean()
    }).array().min(1)
});
exports.IinstagramStorySchema = zod_1.z.object({
    user: zod_1.z.object({
        username: zod_1.z.string(),
        profilePicUrl: zod_1.z.string()
    }),
    results: zod_1.z.object({
        thumbnail: zod_1.z.string(),
        url: zod_1.z.string(),
        type: zod_1.z.string(),
        isVideo: zod_1.z.boolean()
    }).array().min(1)
});
exports.InstagramStoryArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.InstagramStoryV2Schema = zod_1.z.object({
    user: zod_1.z.object({
        username: zod_1.z.string(),
        profilePicUrl: zod_1.z.string().url(),
        isVerified: zod_1.z.boolean(),
        fullName: zod_1.z.string(),
        followersH: zod_1.z.string(),
        followers: zod_1.z.number()
    }),
    results: zod_1.z.object({
        thumbnail: zod_1.z.string().url(),
        url: zod_1.z.string().url(),
        type: zod_1.z.string(),
        isVideo: zod_1.z.boolean(),
        // timestampH: z.string(),
        timestamp: zod_1.z.number()
    }).array().min(1)
});
exports.InstagramStalkArgsSchema = exports.InstagramStoryArgsSchema;
exports.InstagramStalkSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    avatar: zod_1.z.string().optional(),
    description: zod_1.z.string(),
    postsH: zod_1.z.string(),
    posts: zod_1.z.number(),
    followersH: zod_1.z.string(),
    followers: zod_1.z.number(),
    followingH: zod_1.z.string(),
    following: zod_1.z.number()
});
exports.TiktokDownloaderArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.TiktokDownloaderSchema = zod_1.z.object({
    author: zod_1.z.object({
        nickname: zod_1.z.string()
    }),
    description: zod_1.z.string(),
    video: zod_1.z.object({
        no_watermark: zod_1.z.string(),
        no_watermark2: zod_1.z.string(),
        no_watermark_raw: zod_1.z.string()
    })
});
exports.TiktokDownloaderV2Schema = zod_1.z.object({
    author: zod_1.z.object({
        nickname: zod_1.z.string(),
        unique_id: zod_1.z.string(),
        avatar: zod_1.z.string()
    }),
    video: zod_1.z.object({
        no_watermark: zod_1.z.string(),
        no_watermark_hd: zod_1.z.string()
    })
});
exports.TiktokDownloaderV3Schema = zod_1.z.object({
    author: zod_1.z.object({
        nickname: zod_1.z.string(),
        avatar: zod_1.z.string()
    }),
    description: zod_1.z.string(),
    video: zod_1.z.object({
        no_watermark: zod_1.z.string(),
        no_watermark2: zod_1.z.string()
    }),
    music: zod_1.z.string()
});
exports.GoogleItArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.GoogleItSchema = zod_1.z.object({
    info: zod_1.z.object({
        title: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().array().optional()
    }),
    articles: zod_1.z.object({
        header: zod_1.z.string(),
        title: zod_1.z.string(),
        url: zod_1.z.string(),
        description: zod_1.z.string()
    }).array()
});
exports.TwitterDownloaderArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.ItwitterDownloaderSchema = zod_1.z.object({
    quality: zod_1.z.string(),
    type: zod_1.z.string(),
    url: zod_1.z.string().url()
});
exports.TwitterDownloaderSchema = zod_1.z.object({
    isVideo: zod_1.z.boolean()
}).and(exports.ItwitterDownloaderSchema);
exports.TwitterDownloaderV2Schema = exports.ItwitterDownloaderSchema;
exports.YoutubeDownloaderArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url(),
    1: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY).optional()
});
exports.YoutubeVideoOrAudioSchema = zod_1.z.record(zod_1.z.object({
    quality: zod_1.z.string(),
    fileSizeH: zod_1.z.string(),
    fileSize: zod_1.z.number(),
    download: zod_1.z.function().returns(zod_1.z.promise(zod_1.z.string().url()))
}));
exports.YoutubeDonwloaderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    v_id: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().url(),
    title: zod_1.z.string(),
    video: exports.YoutubeVideoOrAudioSchema,
    audio: exports.YoutubeVideoOrAudioSchema
});
exports.YoutubeDownloaderV2ArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.YoutubeDownloaderV3ArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.YoutubeVideoOrAudioV3Schema = zod_1.z.record(zod_1.z.object({
    quality: zod_1.z.string(),
    fileSizeH: zod_1.z.string().optional(),
    fileSize: zod_1.z.number().optional(),
    download: zod_1.z.function().returns(zod_1.z.promise(zod_1.z.string().url()))
}));
exports.YoutubeDonwloaderV3Schema = zod_1.z.object({
    id: zod_1.z.string(),
    thumbnail: zod_1.z.string().url(),
    title: zod_1.z.string(),
    video: exports.YoutubeVideoOrAudioV3Schema,
    audio: exports.YoutubeVideoOrAudioV3Schema
});
exports.GroupWAArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.GroupWASchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    subject: zod_1.z.string()
});
exports.AiovideodlArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.AiovideodlSchema = zod_1.z.object({
    url: zod_1.z.string(),
    title: zod_1.z.string(),
    thumbnail: zod_1.z.string(),
    duration: zod_1.z.string().optional(),
    source: zod_1.z.string(),
    medias: zod_1.z.object({
        url: zod_1.z.string(),
        quality: zod_1.z.string(),
        extension: zod_1.z.string(),
        size: zod_1.z.number(),
        formattedSize: zod_1.z.string(),
        videoAvailable: zod_1.z.boolean(),
        audioAvailable: zod_1.z.boolean(),
        chunked: zod_1.z.boolean(),
        cached: zod_1.z.boolean()
    }).array().optional()
});
exports.SaveFromArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.SaveFromSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.object({
        url: zod_1.z.string().url(),
        ext: zod_1.z.string(),
        type: zod_1.z.string(),
        name: zod_1.z.string(),
        quality: zod_1.z.number().optional(),
        subname: zod_1.z.string().optional()
    }).array().min(1).optional(),
    meta: zod_1.z.object({
        title: zod_1.z.string(),
        source: zod_1.z.string().url().optional(),
        duration: zod_1.z.string().optional()
    }),
    video_quality: zod_1.z.string().array().optional(),
    thumb: zod_1.z.string(),
    sd: zod_1.z.object({
        url: zod_1.z.string().url(),
        format: zod_1.z.string().optional()
    }).nullable(),
    hd: zod_1.z.object({
        url: zod_1.z.string().url(),
        format: zod_1.z.string().optional()
    }).nullable(),
    hosting: zod_1.z.string()
});
// TODO: create a schema for function and validate args
exports.SnapSaveArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.URL).url()
});
exports.SnapSaveSchema = zod_1.z.object({
    resolution: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().url().optional(),
    url: zod_1.z.string().url()
});
//# sourceMappingURL=types.js.map