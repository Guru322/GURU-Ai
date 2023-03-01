/* eslint-disable no-undef */
import { expect } from 'chai';
import { googleIt, tiktokdl, tiktokdlv2, tiktokdlv3, 
// tiktokfyp,
instagramdl, instagramdlv2, instagramdlv3, instagramdlv4, instagramStory, instagramStoryv2, instagramStalk, facebookdl, facebookdlv2, facebookdlv3, twitterdl, twitterdlv2, youtubedl, youtubedlv2, youtubedlv3, youtubeSearch, groupWA, aiovideodl, savefrom, snapsave } from './index.js';
describe('Social media', () => {
    describe('Tiktok scraper', function () {
        it('tiktokdl', function (done) {
            tiktokdl('https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226').then(function (res) {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.author).to.be.an('object');
                expect(res.author.nickname).to.be.a('string');
                expect(res.description).to.be.a('string');
                expect(res.video).to.be.an('object');
                expect(res.video.no_watermark).to.be.a('string');
                expect(res.video.no_watermark2).to.be.a('string');
                expect(res.video.no_watermark_raw).to.be.a('string');
                return done();
            }).catch(done);
        });
        it('tiktokdl v2', function (done) {
            tiktokdlv2('https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226').then(function (res) {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.author).to.be.an('object');
                expect(res.author.unique_id).to.be.a('string');
                expect(res.author.nickname).to.be.a('string');
                expect(res.author.avatar).to.be.a('string');
                expect(res.video).to.be.an('object');
                expect(res.video.no_watermark).to.be.a('string');
                expect(res.video.no_watermark_hd).to.be.a('string');
                return done();
            }).catch(done);
        });
        it('tiktokdl v3', function (done) {
            tiktokdlv3('https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226').then(function (res) {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.author).to.be.an('object');
                expect(res.author.nickname).to.be.a('string');
                expect(res.author.avatar).to.be.a('string');
                expect(res.description).to.be.a('string');
                expect(res.video).to.be.an('object');
                expect(res.video.no_watermark).to.be.a('string');
                expect(res.video.no_watermark2).to.be.a('string');
                expect(res.music).to.be.a('string');
                return done();
            }).catch(done);
        });
        // it('tiktokfyp', function (done) {
        //   tiktokfyp().then(function (res) {
        //     expect(res).to.be.an('array')
        //     expect(res.length).to.be.above(0)
        //     return done()
        //   }).catch(done)
        // })
        // it('tiktokstalk', function (done) {
        //     tiktokstalk('Tiktok').then(function (res) {
        //         expect(res).to.be.an('object')
        //         // expect(res.username).to.be.a('string')
        //         // expect(res.profile).to.be.a('string')
        //         // expect(res.avatar).to.be.a('string')
        //         // expect(res.verified).to.be.a('boolean')   Github action error!
        //         // expect(res.following).to.be.a('string')
        //         // expect(res.followers).to.be.a('string')
        //         // expect(res.likes).to.be.a('string')
        //         // expect(res.description).to.be.a('string')
        //         return done()
        //     }).catch(done)
        // })
    });
    describe('Instagram', () => {
        it('Instagram downloader', done => {
            // https://www.instagram.com/p/CaHpoweBjmx/?utm_source=ig_web_copy_link
            instagramdl('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                // console.log(res)
                return done();
            }).catch(done);
        });
        it('Instagram downloader v2', done => {
            instagramdlv2('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                // console.log(res)
                return done();
            }).catch(done);
        });
        it('Instagram downloader v3', done => {
            instagramdlv3('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                // console.log(res)
                return done();
            }).catch(done);
        });
        it('Instagram downloader v4', done => {
            instagramdlv4('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                // console.log(res)
                expect(res).to.be.an('array');
                expect(res).to.have.lengthOf.at.least(1);
                res.forEach(({ thumbnail, url }) => {
                    expect(thumbnail).to.be.a('string');
                    expect(url).to.be.a('string');
                });
                return done();
            }).catch(done);
        });
        it('Instagram story', function (done) {
            instagramStory('raffinagita1717').then(res => {
                // console.log(res)
                return done();
            }).catch(done);
        });
        it('Instagram story v2', function (done) {
            instagramStoryv2('raffinagita1717').then(res => {
                // console.log(res)
                return done();
            }).catch(done);
        });
        it('Instagram stalk', done => {
            instagramStalk('freefirebgid').then(res => {
                // console.log(res)
                return done();
            }).catch(done);
        });
    });
    describe('Facebook (Metaverse :V)', function () {
        it('Facebook downloader', done => {
            facebookdl('https://fb.watch/9WktuN9j-z/').then(res => {
                // console.log(res)
                expect(res.result).to.be.an('array');
                expect(res.result).to.have.lengthOf.at.least(1);
                res.result.forEach(({ ext, url, isVideo, isAudio }) => {
                    expect(ext).to.be.a('string');
                    expect(url).to.be.a('string');
                    expect(isVideo).to.be.a('boolean');
                    expect(isAudio).to.be.a('boolean');
                });
                return done();
            }).catch(done);
        });
        it('Facebook downloader v2', done => {
            facebookdlv2('https://fb.watch/9WktuN9j-z/').then(res => {
                // console.log(res)
                expect(res.id).to.be.a('string');
                return done();
            }).catch(done);
        });
        it('Facebook downloader v3', done => {
            facebookdlv3('https://fb.watch/9WktuN9j-z/').then(res => {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.thumbnail).to.be.a('string');
                res.result.forEach(({ 
                // url,
                quality
                // isAudio,
                // isVideo
                 }) => {
                    // expect(url).to.be.a('string')
                    expect(quality).to.be.a('string');
                    // expect(isAudio).to.be.a('boolean')
                    // expect(isVideo).to.be.a('boolean')
                });
                return done();
            }).catch(done);
        });
    });
    describe('Twitter', () => {
        it('Twitter downloader', done => {
            twitterdl('https://twitter.com/jen_degen/status/1458167531869458440?s=20').then(res => {
                // console.log(res)
                expect(res).to.be.an('array');
                res.forEach(({ quality, type, url, isVideo }) => {
                    expect(quality).to.be.a('string');
                    expect(type).to.be.a('string');
                    expect(url).to.be.a('string');
                    expect(isVideo).to.be.a('boolean');
                });
                return done();
            }).catch(done);
        });
        it('Twitter downloader v2', done => {
            twitterdlv2('https://twitter.com/jen_degen/status/1458167531869458440?s=20').then(res => {
                // console.log(res)
                expect(res).to.be.an('array');
                res.forEach(({ quality, type, url }) => {
                    expect(quality).to.be.a('string');
                    expect(type).to.be.a('string');
                    expect(url).to.be.a('string');
                });
                return done();
            }).catch(done);
        });
    });
    describe('Youtube', function () {
        it('Youtube downloader', done => {
            // https://youtu.be/JFC3tYYW_UI https://youtu.be/iik25wqIuFo
            youtubedl('https://youtu.be/iik25wqIuFo').then(res => {
                // console.log(res)
                res.video['360p'].download().catch(done);
                expect(res).to.be.an('object');
                expect(res.thumbnail).to.be.a('string');
                expect(res.title).to.be.a('string');
                expect(res.video).to.be.an('object');
                expect(res.audio).to.be.an('object');
                return done();
            }).catch(done);
        });
        it('Youtube downloader v2', done => {
            youtubedlv2('https://youtu.be/iik25wqIuFo').then(res => {
                // console.log(res)
                res.video['240p'].download().catch(done);
                expect(res).to.be.an('object');
                expect(res.thumbnail).to.be.a('string');
                expect(res.title).to.be.a('string');
                expect(res.video).to.be.an('object');
                expect(res.audio).to.be.an('object');
                return done();
            }).catch(done);
        });
        it('Youtube downloader v3', done => {
            youtubedlv3('https://youtu.be/iik25wqIuFo').then(res => {
                // console.log(res)
                res.video['360'].download().catch(done);
                expect(res).to.be.an('object');
                expect(res.thumbnail).to.be.a('string');
                expect(res.title).to.be.a('string');
                expect(res.video).to.be.an('object');
                expect(res.audio).to.be.an('object');
                return done();
            }).catch(done);
        });
        it('Youtube search', done => {
            youtubeSearch('Minecraft').then(res => {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.video).to.be.an('array');
                expect(res.video).to.have.lengthOf.at.least(1);
                expect(res.channel).to.be.an('array');
                expect(res.playlist).to.be.an('array');
                return done();
            }).catch(done);
        });
    });
    it('Google It', done => {
        googleIt('Minecraft').then(res => {
            // console.log(res)
            expect(res).to.be.an('object');
            expect(res.info).to.be.an('object');
            expect(res.articles).to.be.an('array');
            expect(res.articles).to.have.lengthOf.at.least(1);
            return done();
        }).catch(done);
    });
    it('Group WhatsApp', done => {
        groupWA('A').then(res => {
            // console.log(res)
            expect(res).to.be.an('array');
            expect(res).to.have.lengthOf.at.least(1);
            res.forEach(({ url, subject }) => {
                expect(url).to.be.a('string');
                expect(subject).to.be.a('string');
            });
            return done();
        }).catch(done);
    });
    describe('aiovideodl', () => {
        it('Tiktok download', done => {
            aiovideodl('https://www.tiktok.com/@omagadsus/video/7025456384175017243').then(res => {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.medias).to.be.an('array');
                expect(res.medias).to.have.lengthOf.at.least(1);
                expect(res.source).to.be.eq('tiktok');
                return done();
            }).catch(done);
        });
        it('Facebook download', done => {
            aiovideodl('https://fb.watch/9WktuN9j-z/').then(res => {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.medias).to.be.an('array');
                expect(res.medias).to.have.lengthOf.at.least(1);
                expect(res.source).to.be.eq('facebook');
                return done();
            }).catch(done);
        });
        it('Twitter download', done => {
            aiovideodl('https://twitter.com/jen_degen/status/1458167531869458440?s=20').then(res => {
                // console.log(res)
                expect(res).to.be.an('object');
                expect(res.medias).to.be.an('array');
                expect(res.medias).to.have.lengthOf.at.least(1);
                expect(res.source).to.be.eq('twitter');
                return done();
            }).catch(done);
        });
    });
    describe('Savefrom', () => {
        it('Tiktok download', done => {
            savefrom('https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226').then(res => {
                // console.log(res)
                expect(res).to.be.an('array');
                for (const { hosting } of res) {
                    expect(hosting).to.be.eq('tiktok.com');
                }
                return done();
            }).catch(done);
        });
        it('Facebook download', done => {
            savefrom('https://fb.watch/9WktuN9j-z/').then(res => {
                // console.log(res)
                expect(res).to.be.an('array');
                for (const { hosting } of res) {
                    expect(hosting).to.be.eq('facebook.com');
                }
                return done();
            }).catch(done);
        });
        it('Twitter download', done => {
            savefrom('https://twitter.com/jen_degen/status/1458167531869458440?s=20').then(res => {
                // console.log(res)
                expect(res).to.be.an('array');
                for (const { hosting } of res) {
                    expect(hosting).to.be.eq('twitter.com');
                }
                return done();
            }).catch(done);
        });
        it('Instagram download', done => {
            savefrom('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                // console.log(res)
                expect(res).to.be.an('array');
                for (const { hosting } of res) {
                    expect(hosting).to.be.eq('instagram.com');
                }
                return done();
            }).catch(done);
        });
    });
    describe('SnapSave', () => {
        it('Instagram download', done => {
            snapsave('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                // console.log(res)
                for (const { thumbnail, url } of res) {
                    expect(thumbnail).to.be.a('string');
                    expect(url).to.be.a('string');
                }
                return done();
            }).catch(done);
        });
        it('Facebook download', done => {
            snapsave('https://fb.watch/9WktuN9j-z/').then(res => {
                // console.log(res)
                for (const { resolution, url } of res) {
                    expect(resolution).to.be.a('string');
                    expect(url).to.be.a('string');
                }
                return done();
            }).catch(done);
        });
    });
});
//# sourceMappingURL=test.js.map