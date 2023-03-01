import { InstagramDownloader, InstagramDownloaderV2, InstagramStory, InstagramStoryV2, InstagramStalk, InstagramDownloaderV3 } from './types.js';
export declare function instagramdl(url: string): Promise<InstagramDownloader[]>;
export declare function instagramdlv2(url: string): Promise<InstagramDownloaderV2[]>;
export declare function instagramdlv3(url: string): Promise<InstagramDownloaderV3>;
export declare function instagramdlv4(url: string): Promise<InstagramDownloader[]>;
export declare function instagramStory(name: string): Promise<InstagramStory>;
export declare function instagramStoryv2(name: string): Promise<InstagramStoryV2>;
export declare function instagramStalk(username: string): Promise<InstagramStalk>;
//# sourceMappingURL=instagram.d.ts.map