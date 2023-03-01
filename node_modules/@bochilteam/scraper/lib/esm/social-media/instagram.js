/* eslint-disable no-mixed-spaces-and-tabs */
import cheerio from 'cheerio';
import got from 'got';
import Form from 'form-data';
import { InstagramDownloaderArgsSchema, InstagramDownloaderSchema, InstagramDownloaderV2Schema, InstagramStoryArgsSchema, IinstagramStorySchema, InstagramStoryV2Schema, InstagramStalkArgsSchema, InstagramStalkSchema, InstagramDownloaderV3Schema } from './types.js';
import { ScraperError, decodeSnapApp, getEncodedSnapApp, stringifyCookies
// stringifyCookies,
// parseCookies
 } from '../utils.js';
import { snapsave } from './index.js';
export async function instagramdl(url) {
    var _a, _b;
    InstagramDownloaderArgsSchema.parse(arguments);
    if (!/https?:\/\/www\.instagram\.com\/(reel|tv|p)\//i.test(url)) {
        throw new ScraperError('Invalid url!!');
    }
    const data = await got
        .post('https://snapinsta.app/action.php', {
        form: {
            url: encodeURI(url),
            action: 'post'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://snapinsta.app',
            referer: 'https://snapinsta.app/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
        }
    })
        .text();
    const params = getEncodedSnapApp(data);
    if (!Array.isArray(params) || params.length !== 6)
        throw new ScraperError(`Can't parse decode parameters!\n${data}`);
    const decode = decodeSnapApp(...params);
    const html = (_b = (_a = decode === null || decode === void 0 ? void 0 : decode.split('("div_download").innerHTML = "')) === null || _a === void 0 ? void 0 : _a[1].split('"; parent.document.getElementById("hero-section").remove();')[0].split('</style> <section class=')[1].split('"> ')[1]) === null || _b === void 0 ? void 0 : _b.split(' </section> ')[0].replace(/\\(\\)?/g, '');
    const $ = cheerio.load(html);
    const results = [];
    $('.row.download-box > div.col-md-4').each(function () {
        let thumbnail = $(this)
            .find('.download-items__thumb > img[src]')
            .attr('src');
        if (!/https?:\/\//i.test(thumbnail))
            thumbnail = 'https://snapinsta.app' + thumbnail;
        let url = $(this).find('.download-items__btn > a[href]').attr('href');
        if (!/https?:\/\//i.test(url || '')) {
            url = encodeURI('https://snapinsta.app' + url);
        }
        if (url)
            results.push({ thumbnail, url });
    });
    if (!results.length)
        throw new ScraperError(`Can't download!\n${decode}`);
    return results;
}
export async function instagramdlv2(url) {
    InstagramDownloaderArgsSchema.parse(arguments);
    const res = await snapsave(url);
    if (!res.length)
        throw new ScraperError(`Can't download!\n${res}`);
    return res.map(v => InstagramDownloaderV2Schema.parse(v));
}
// Inpired by https://github.com/xfar05/xfarr-api/blob/cc0b16819bdecb5351471f81c3de30673d7c657b/lib/downloader.js#L198
export async function instagramdlv3(url) {
    InstagramDownloaderArgsSchema.parse(arguments);
    const resTmp = await got('https://downvideo.quora-wiki.com/instagram-video-downloader');
    const $ = cheerio.load(resTmp.body);
    const token = $('#token').val();
    const cookie = resTmp.headers['set-cookie'] && stringifyCookies(resTmp.headers['set-cookie']);
    const form = new Form();
    form.append('url', url);
    form.append('token', token);
    const json = await got.post('https://downvideo.quora-wiki.com/system/action.php', {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://downvideo.quora-wiki.com',
            referer: 'https://downvideo.quora-wiki.com/instagram-video-downloader',
            cookie: cookie || '__gads=ID=1486982c1c054fed-22e9af1484d30013:T=1657169758:RT=1657169758:S=ALNI_MZmuLRHBE2CSCqpTePuuKgRkzZCYQ; __gpi=UID=0000076ec7622ead:T=1657169758:RT=1657169758:S=ALNI_MYrP2FgjawbEhlJWKhnBeMtgQptoQ; fpestid=5T9wUIsSvP8tUpvF-F1zV-Y5RtY0Z8zuAxoIPdJFTXD56TYw2lATC9l1robj4kb26G0AuQ; PHPSESSID=8ib0bnko459rarg31p8c6v5rpp',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        }
    }).json();
    return InstagramDownloaderV3Schema.parse(json);
}
export async function instagramdlv4(url) {
    var _a, _b;
    InstagramDownloaderArgsSchema.parse(arguments);
    const payload = {
        url: encodeURIComponent(url)
    };
    const data = await got('https://instadownloader.co/insta_downloader.php', {
        headers: {
            cookie: '_ga=GA1.2.1733350350.1642305936; __gads=ID=b4bd840227b997e8-22bf10a0f9cf00c8:T=1642305940:RT=1642305940:S=ALNI_MYAmf2IjxwGlzs5qXm4WFoP5pgocg; PHPSESSID=336eed35f823c84f35a580ae2f326934; _gid=GA1.2.1286454531.1646479747; _gat=1',
            referer: 'https://instadownloader.co/id/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
        },
        searchParams: payload
    }).json();
    const json = JSON.parse(data);
    if (!(((_a = json.images_links) === null || _a === void 0 ? void 0 : _a.length) || ((_b = json.videos_links) === null || _b === void 0 ? void 0 : _b.length)))
        throw new ScraperError(`Can't download!\n${JSON.stringify(json, null, 2)}`);
    return [
        ...json.images_links,
        ...json.videos_links
    ].map((result) => InstagramDownloaderSchema.parse(result));
}
export async function instagramStory(name) {
    var _a;
    InstagramStoryArgsSchema.parse(arguments);
    const resKey = await got('https://storydownloader.app/en');
    const $$ = cheerio.load(resKey.body);
    const _token = $$('input[name="_token"]').attr('value');
    const cookie = (_a = resKey.headers['set-cookie']) === null || _a === void 0 ? void 0 : _a.map(v => v.split('; ')[0]).join('; ').trim();
    const headers = {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        cookie: cookie || 'locale=eyJpdiI6IjE5VUJqZm1DdXl3ODhoQnV2SHJaMFE9PSIsInZhbHVlIjoiUnBqZTMvbDFUTWZLWVkvQy9rVjVhOUdrbjRWTVRCYmp2aTVaUlVsUnZZY0RWN2ZoVkdjMVNhemM1MFl6eWt2dCIsIm1hYyI6IjdlMTc4ZDZkMTYyMDVmMTcwZTc5Nzg3YTBjM2ZkOWEyNjRlODZmZDIwOGY5OTgyYzQzZjE3YTY3MjQ2NGNlYzQiLCJ0YWciOiIifQ%3D%3D; _ga_ZXS0LB5VTY=GS1.1.1647856609.1.0.1647856609.0; _ga=GA1.1.1392191220.1647856609; XSRF-TOKEN=eyJpdiI6IkhjVVdRMmRSZ0tOaklvUHlncWxqeVE9PSIsInZhbHVlIjoiTkZLTnFmUnpjM0Y0KzF3NmpxNnMyMTJQWmNPRXFPVjlKQW9la3poN3kySEN4UUw0TUd3TGIzZ0plT2RUWXJGTEp1bzF1NkN2R3FrQkdLbmJpa0o4cUZUM2EzS2N4QTY2aGVKdFM0ZWNhclZBQVBhMDV1cm4vcEZFMVB5NXRLL1UiLCJtYWMiOiI4MjQ1ZDJhYWE2NjQ1MGUyMmY5ZmQ0OTlkMDFhNjZjOWE2MGVjMTRlNmFjN2VjMmNkYzA0OGY5OTRkMDY3MjI3IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjQ2RHJ3TUtRU1gxblhpbGtsNXRqamc9PSIsInZhbHVlIjoiTFl2bTg5QVhxcHBkZUN2THRPYkxhbnBmWEkyaWdBc0RFbDM0eUhhbGY0RCs2NFFmRXQ2NXBaNktUMkVpYk9wcDF2SE11SUQ0bW9zazJYaUdLQVZFbjJTaXZ3MmREUEJURnczb1c4ZE5uNDJzTVprNytjNzVCT3loS1ovKysyR1oiLCJtYWMiOiIzOTAyMDc5MDg1N2UxZjgwYmExODcwMjQ2ZWQzNGJjODM3YzkxOTI2MTkwMTEzMTFjNjExN2IzZjdkMmY0ODI4IiwidGFnIjoiIn0%3D',
        origin: 'https://storydownloader.app',
        referer: 'https://storydownloader.app/en',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
        'X-CSRF-TOKEN': _token
    };
    const formData = new Form();
    formData.append('username', name);
    formData.append('_token', _token);
    const res = await got('https://storydownloader.app/request', {
        method: 'POST',
        headers: {
            ...headers,
            ...formData.getHeaders()
        },
        body: formData.getBuffer()
    });
    const { html } = JSON.parse(res.body);
    if (!html)
        throw new ScraperError(`Can't download!\n${res.body}`);
    const $ = cheerio.load(html);
    const username = $('h3.card-title').text();
    const profilePicUrl = $('img.card-avatar').attr('src');
    const results = [];
    $('div.row > div').each(function () {
        const $el = $(this);
        const thumbnail = $el.find('img').attr('src');
        const url = $el.find('a').attr('href');
        const type = /video_dashinit\.mp4/i.test(url) ? 'video' : 'image';
        const isVideo = type === 'video';
        if (thumbnail && url) {
            results.push({
                thumbnail,
                url,
                type,
                isVideo
            });
        }
    });
    const data = {
        user: {
            username,
            profilePicUrl
        },
        results
    };
    return IinstagramStorySchema.parse(data);
}
export async function instagramStoryv2(name) {
    InstagramStoryArgsSchema.parse(arguments);
    const form = new Form();
    form.append('instagram_url', name);
    form.append('type', 'story');
    form.append('resource', 'save');
    const html = await got.post(`https://www.instadp.com/instagram-tools/story-downloader/${name}`, {
        headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            Cookie: '_ga=GA1.2.1918010286.1657182726; __gads=ID=a5e195199dcf10ef-22f6fcd613d50055:T=1657182727:RT=1657182727:S=ALNI_MZ1qb2rA7xiR6LmkJQBN5vKLnZmYg; _gid=GA1.2.2050540126.1657428345; __gpi=UID=00000770d2242d3d:T=1657182727:RT=1657428344:S=ALNI_MZbi-jFQXD4uiBEiard7EV8bpeAuQ; PHPSESSID=00ffd97d890fecc407f04b95a8077a4f; history:instagram:story=%5B%7B%22id%22%3A1918078581%2C%22picture%22%3A%22https%3A%5C%2F%5C%2Fscontent-iad3-1.cdninstagram.com%5C%2Fv%5C%2Ft51.2885-19%5C%2F79644808_579618249494254_8417463853742292992_n.jpg%3Fstp%3Ddst-jpg_s150x150%26_nc_ht%3Dscontent-iad3-1.cdninstagram.com%26_nc_cat%3D1%26_nc_ohc%3Dfp3aH1jdbT0AX8xyfRj%26edm%3DAKralEIBAAAA%26ccb%3D7-5%26oh%3D00_AT89aNtYpJBeikdEEdKP3Gcau4oCZ1xa8yxR1m_zm4tgyg%26oe%3D62D104CD%26_nc_sid%3D5e3072%22%2C%22username%22%3A%22raffinagita1717%22%2C%22verified%22%3Atrue%2C%22fullname%22%3A%22Raffi%20Ahmad%20and%20Nagita%20Slavina%22%7D%5D; _gat=1',
            Host: 'www.instadp.com',
            Referer: 'https://www.instadp.com/instagram-tools/story-downloader',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        },
        form
    }).text();
    const $ = cheerio.load(html);
    const $username = $('div.user > div.info > span.username');
    const username = $username.text();
    const fullName = $('div.user > div.info > span.text').text();
    const isVerified = !!$username.find('i.verified').length;
    let profilePicUrl = $('div.user > div.avatar > img.img').attr('src');
    if (profilePicUrl && !profilePicUrl.includes('instadp.com'))
        profilePicUrl = `https://www.instadp.com/${profilePicUrl}`;
    const followersH = $('div.user > div.info > span.followers').text().replace(/Followers/i, '').trim();
    const followers = parseInt(followersH.replace(/,/g, ''));
    const results = [];
    $('div.active-stories > div.story').each((_, el) => {
        const $el = $(el);
        const type = $el.find('a.video-link').length ? 'video' : 'image';
        const url = $el.find('a.video-link').attr('href') || $el.find('a.download-btn').attr('href');
        let thumbnail = $el.find('img.video-thumbnail').attr('src') || $el.find('img.story-image').attr('src');
        if (thumbnail && !thumbnail.includes('instadp.com'))
            thumbnail = `https://www.instadp.com/${thumbnail}`;
        const $timestamp = $el.find('div.timestamp');
        // const timestampH = $timestamp.text().replace(/\s+/g, ' ').trim()
        const timestamp = parseInt($timestamp.attr('data-date'));
        if (url && thumbnail) {
            results.push({
                url,
                thumbnail,
                // timestampH,
                timestamp,
                type,
                isVideo: type === 'video'
            });
        }
    });
    const data = {
        user: {
            username,
            fullName,
            isVerified,
            profilePicUrl,
            followersH,
            followers
        },
        results
    };
    return InstagramStoryV2Schema.parse(data);
}
export async function instagramStalk(username) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    InstagramStalkArgsSchema.parse(arguments);
    const data = await got(`https://dumpor.com/search?query=${encodeURIComponent(username).replace(/%20/g, '+')}`).text();
    const $ = cheerio.load(data);
    const accounts = [];
    $('#nav-profiles > div > div.search-item').each(function () {
        var _a, _b;
        const el = $(this);
        const url = (_a = el.find('.content__img-wrap > a')
            .attr('href')) === null || _a === void 0 ? void 0 : _a.trim();
        if (url) {
            accounts.push({
                url,
                avatar: (_b = el.find('.content__img-wrap > a > img')
                    .attr('src')) === null || _b === void 0 ? void 0 : _b.trim(),
                username: el.find('.content__text > a')
                    .text().trim()
            });
        }
    });
    const html = await got(`https://dumpor.com/${accounts[0].url}`).text();
    const $$ = cheerio.load(html);
    const name = $$('div.user__title > a > h1').text().trim();
    const Uname = $$('div.user__title > h4').text().trim();
    const description = $$('div.user__info-desc').text().trim();
    const row = $$('#user-page > div.container > div > div > div:nth-child(1) > div > a');
    const postsH = (_a = row.eq(0).text().replace(/Posts/i, '')) === null || _a === void 0 ? void 0 : _a.trim();
    const followersH = (_b = row.eq(2).text().replace(/Followers/i, '')) === null || _b === void 0 ? void 0 : _b.trim();
    const followingH = (_c = row.eq(3).text().replace(/Following/i, '')) === null || _c === void 0 ? void 0 : _c.trim();
    const list = $$('ul.list > li.list__item');
    const posts = parseInt((_e = (_d = list.eq(0).text().replace(/Posts/i, '')) === null || _d === void 0 ? void 0 : _d.trim()) === null || _e === void 0 ? void 0 : _e.replace(/\s/g, ''));
    const followers = parseInt((_g = (_f = list.eq(1).text().replace(/Followers/i, '')) === null || _f === void 0 ? void 0 : _f.trim()) === null || _g === void 0 ? void 0 : _g.replace(/\s/g, ''));
    const following = parseInt((_j = (_h = list.eq(2).text().replace(/Following/i, '')) === null || _h === void 0 ? void 0 : _h.trim()) === null || _j === void 0 ? void 0 : _j.replace(/\s/g, ''));
    const res = {
        name,
        username: Uname,
        avatar: accounts[0].avatar,
        description,
        postsH,
        posts,
        followersH,
        followers,
        followingH,
        following
    };
    return InstagramStalkSchema.parse(res);
}
//# sourceMappingURL=instagram.js.map