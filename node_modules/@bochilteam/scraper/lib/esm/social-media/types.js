import { z } from 'zod';
import { ERROR_ARGS } from '../constant.js';
export const FacebookDownloaderArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const FacebookDownloaderSchema = z.object({
    id: z.string(),
    thumbnail: z.string(),
    duration: z.number(),
    result: z.object({
        size: z.string().or(z.number()).optional(),
        ext: z.string(),
        url: z.string(),
        quality: z.string().optional(),
        vcodec: z.string().optional(),
        fid: z.string(),
        isVideo: z.boolean(),
        isAudio: z.boolean()
    }).array().min(1)
});
export const FacebookDownloaderV2Schema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    result: z.object({
        quality: z.string(),
        url: z.string()
    }).array().min(1)
});
export const FacebookDownloaderV3Schema = z.object({
    title: z.string(),
    thumbnail: z.string().optional(),
    result: z.object({
        quality: z.string().optional(),
        url: z.string(),
        isAudio: z.boolean(),
        isVideo: z.boolean()
    }).array().min(1)
});
export const InstagramDownloaderArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const IinstagramDownloaderSchema = z.object({
    url: z.string()
});
export const InstagramDownloaderSchema = z.object({
    thumbnail: z.string()
}).and(IinstagramDownloaderSchema);
export const InstagramDownloaderV2Schema = IinstagramDownloaderSchema.extend({
    thumbnail: z.string().optional(),
    resolution: z.string().optional()
});
export const InstagramDownloaderV3Schema = z.object({
    url: z.string().url(),
    title: z.string(),
    thumbnail: z.string().url(),
    duration: z.string(),
    source: z.string(),
    medias: z.object({
        url: z.string().url(),
        quality: z.string(),
        formattedSize: z.string(),
        extension: z.string(),
        audioAvailable: z.boolean(),
        videoAvailable: z.boolean(),
        cached: z.boolean(),
        chunked: z.boolean()
    }).array().min(1)
});
export const IinstagramStorySchema = z.object({
    user: z.object({
        username: z.string(),
        profilePicUrl: z.string()
    }),
    results: z.object({
        thumbnail: z.string(),
        url: z.string(),
        type: z.string(),
        isVideo: z.boolean()
    }).array().min(1)
});
export const InstagramStoryArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY)
});
export const InstagramStoryV2Schema = z.object({
    user: z.object({
        username: z.string(),
        profilePicUrl: z.string().url(),
        isVerified: z.boolean(),
        fullName: z.string(),
        followersH: z.string(),
        followers: z.number()
    }),
    results: z.object({
        thumbnail: z.string().url(),
        url: z.string().url(),
        type: z.string(),
        isVideo: z.boolean(),
        // timestampH: z.string(),
        timestamp: z.number()
    }).array().min(1)
});
export const InstagramStalkArgsSchema = InstagramStoryArgsSchema;
export const InstagramStalkSchema = z.object({
    name: z.string(),
    username: z.string(),
    avatar: z.string().optional(),
    description: z.string(),
    postsH: z.string(),
    posts: z.number(),
    followersH: z.string(),
    followers: z.number(),
    followingH: z.string(),
    following: z.number()
});
export const TiktokDownloaderArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const TiktokDownloaderSchema = z.object({
    author: z.object({
        nickname: z.string()
    }),
    description: z.string(),
    video: z.object({
        no_watermark: z.string(),
        no_watermark2: z.string(),
        no_watermark_raw: z.string()
    })
});
export const TiktokDownloaderV2Schema = z.object({
    author: z.object({
        nickname: z.string(),
        unique_id: z.string(),
        avatar: z.string()
    }),
    video: z.object({
        no_watermark: z.string(),
        no_watermark_hd: z.string()
    })
});
export const TiktokDownloaderV3Schema = z.object({
    author: z.object({
        nickname: z.string(),
        avatar: z.string()
    }),
    description: z.string(),
    video: z.object({
        no_watermark: z.string(),
        no_watermark2: z.string()
    }),
    music: z.string()
});
export const GoogleItArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY)
});
export const GoogleItSchema = z.object({
    info: z.object({
        title: z.string().optional(),
        type: z.string().optional(),
        description: z.string().optional(),
        image: z.string().array().optional()
    }),
    articles: z.object({
        header: z.string(),
        title: z.string(),
        url: z.string(),
        description: z.string()
    }).array()
});
export const TwitterDownloaderArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const ItwitterDownloaderSchema = z.object({
    quality: z.string(),
    type: z.string(),
    url: z.string().url()
});
export const TwitterDownloaderSchema = z.object({
    isVideo: z.boolean()
}).and(ItwitterDownloaderSchema);
export const TwitterDownloaderV2Schema = ItwitterDownloaderSchema;
export const YoutubeDownloaderArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url(),
    1: z.string(ERROR_ARGS.QUERY).optional()
});
export const YoutubeVideoOrAudioSchema = z.record(z.object({
    quality: z.string(),
    fileSizeH: z.string(),
    fileSize: z.number(),
    download: z.function().returns(z.promise(z.string().url()))
}));
export const YoutubeDonwloaderSchema = z.object({
    id: z.string(),
    v_id: z.string().optional(),
    thumbnail: z.string().url(),
    title: z.string(),
    video: YoutubeVideoOrAudioSchema,
    audio: YoutubeVideoOrAudioSchema
});
export const YoutubeDownloaderV2ArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const YoutubeDownloaderV3ArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const YoutubeVideoOrAudioV3Schema = z.record(z.object({
    quality: z.string(),
    fileSizeH: z.string().optional(),
    fileSize: z.number().optional(),
    download: z.function().returns(z.promise(z.string().url()))
}));
export const YoutubeDonwloaderV3Schema = z.object({
    id: z.string(),
    thumbnail: z.string().url(),
    title: z.string(),
    video: YoutubeVideoOrAudioV3Schema,
    audio: YoutubeVideoOrAudioV3Schema
});
export const GroupWAArgsSchema = z.object({
    0: z.string(ERROR_ARGS.QUERY)
});
export const GroupWASchema = z.object({
    url: z.string().url(),
    subject: z.string()
});
export const AiovideodlArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const AiovideodlSchema = z.object({
    url: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    duration: z.string().optional(),
    source: z.string(),
    medias: z.object({
        url: z.string(),
        quality: z.string(),
        extension: z.string(),
        size: z.number(),
        formattedSize: z.string(),
        videoAvailable: z.boolean(),
        audioAvailable: z.boolean(),
        chunked: z.boolean(),
        cached: z.boolean()
    }).array().optional()
});
export const SaveFromArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const SaveFromSchema = z.object({
    id: z.string().optional(),
    url: z.object({
        url: z.string().url(),
        ext: z.string(),
        type: z.string(),
        name: z.string(),
        quality: z.number().optional(),
        subname: z.string().optional()
    }).array().min(1).optional(),
    meta: z.object({
        title: z.string(),
        source: z.string().url().optional(),
        duration: z.string().optional()
    }),
    video_quality: z.string().array().optional(),
    thumb: z.string(),
    sd: z.object({
        url: z.string().url(),
        format: z.string().optional()
    }).nullable(),
    hd: z.object({
        url: z.string().url(),
        format: z.string().optional()
    }).nullable(),
    hosting: z.string()
});
// TODO: create a schema for function and validate args
export const SnapSaveArgsSchema = z.object({
    0: z.string(ERROR_ARGS.URL).url()
});
export const SnapSaveSchema = z.object({
    resolution: z.string().optional(),
    thumbnail: z.string().url().optional(),
    url: z.string().url()
});
//# sourceMappingURL=types.js.map