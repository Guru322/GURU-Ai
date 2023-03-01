"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const utils_js_1 = require("../utils.js");
const cheerio_1 = __importDefault(require("cheerio"));
const types_js_1 = require("./types.js");
async function snapsave(url) {
    types_js_1.SnapSaveArgsSchema.parse(arguments);
    const html = await got_1.default.post('https://snapsave.app/action.php?lang=id', {
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'content-type': 'application/x-www-form-urlencoded',
            // cookie: '_ga=GA1.2.430081394.1657026583; _gid=GA1.2.706849190.1657026583; __gads=ID=86a4700f8371f585-22080b020ad500b0:T=1657026585:RT=1657026585:S=ALNI_MZqzufYDUPXIvFcKgvBGvKGiy2nrA; __gpi=UID=0000076594a4f960:T=1657026585:RT=1657073498:S=ALNI_MbSZmiRZ8YVCA8B07uFu3ZQ1W2lRQ; _gat=1; __atuvc=6%7C27; __atuvs=62c4ef5ab60b5289001',
            origin: 'https://snapsave.app',
            referer: 'https://snapsave.app/id',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        },
        form: { url }
    }).text();
    const decode = (0, utils_js_1.decryptSnapSave)(html);
    const $ = cheerio_1.default.load(decode);
    const results = [];
    if ($('table.table').length) {
        $('table > tbody > tr').each((_, el) => {
            const $el = $(el);
            const $td = $el.find('td');
            if ($td.eq(1).text().includes('Tidak')) {
                const resolution = $td.eq(0).text();
                const _url = $td.eq(2).find('a').attr('href');
                results.push({
                    resolution,
                    url: _url
                });
            }
        });
    }
    else {
        const thumbnail = $('div.download-items__thumb > img').attr('src');
        let _url = $('div.download-items__btn > a').attr('href');
        if (!_url.includes('snapsave.app'))
            _url = `https://snapsave.app${_url}`;
        results.push({
            thumbnail,
            url: _url
        });
    }
    if (results.length === 0)
        throw new utils_js_1.ScraperError(`No results found\n\n${decode}`);
    return results.map(result => types_js_1.SnapSaveSchema.parse(result));
}
exports.default = snapsave;
//# sourceMappingURL=snapsave.js.map