const Canvas = require("canvas");
const { fillTextWithTwemoji } = require("node-canvas-with-twemoji-and-discord-emoji");
const moment = require("moment");
require("moment-duration-format");

class CanvasUtil {
    constructor() {
        throw new Error(`Class ${this.constructor.name} may not be instantiated!`);
    }

    static getLines({ text, ctx, maxWidth }) {
        if (!text) return [];
        if (!ctx) throw new Error("Canvas context was not provided!");
        if (!maxWidth) throw new Error("No max-width provided!");
        const lines = [];

        while (text.length) {
            let i;
            for (i = text.length; ctx.measureText(text.substr(0, i)).width > maxWidth; i -= 1);
            const result = text.substr(0, i);
            let j;
            if (i !== text.length) for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);
            lines.push(result.substr(0, j || result.length));
            text = text.substr(lines[lines.length - 1].length, text.length);
        }

        return lines;
    }

    static twitterTimeFormat(date = new Date()) {
        if (typeof date === "number") date = new Date(date);
        if (!date instanceof Date) date = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        let month = date.getMonth();
        const year = date.getFullYear();
        month = months[month];
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutes} ${ampm} - ${day} ${month} ${year}`;
    }

    static grain(image) {
        const pixels = image.data;

        for (let idx = 0; idx < pixels.length; idx++) {
            if (Math.random() > 0.98) {
                pixels[idx] = Math.max(128, Math.floor(Math.random() * 255));
                pixels[idx + 1] = Math.max(128, Math.floor(Math.random() * 255));
            }

            if (Math.random() > 0.98) {
                const v = Math.random() * 60;
                pixels[idx] = Math.max(pixels[idx] - v, 0);
            }
        }

        return image;
    }

    static brightnessContrastPhotoshop(image, brightness, contrast) {
        const pixels = image.data;
        const data = Canvas.createImageData(image.width, image.height);
        const dataPixels = data.data;

        brightness = (brightness + 100) / 100;
        contrast = (contrast + 100) / 100;

        this.mapRGB(pixels, dataPixels, (value) => {
            value *= brightness;
            value = (value - 127.5) * contrast + 127.5;
            return (value + 0.5) | 0;
        });
        return data;
    }

    static buildMap(f) {
        const m = [];
        for (let k = 0, v; k < 256; k += 1) {
            m[k] = (v = f(k)) > 255 ? 255 : v < 0 ? 0 : v | 0;
        }
        return m;
    }

    static applyMap(src, dst, map) {
        for (let i = 0, l = src.length; i < l; i += 4) {
            dst[i] = map[src[i]];
            dst[i + 1] = map[src[i + 1]];
            dst[i + 2] = map[src[i + 2]];
            dst[i + 3] = src[i + 3];
        }
    }

    static mapRGB(src, dst, func) {
        this.applyMap(src, dst, this.buildMap(func));
    }

    static toAbbrev(num) {
        if (!num) return "NaN";
        if (typeof num === "string") num = parseInt(num);
        let decPlaces = Math.pow(10, 1);
        var abbrev = ["K", "M", "B", "T"];
        for (var i = abbrev.length - 1; i >= 0; i--) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= num) {
                num = Math.round((num * decPlaces) / size) / decPlaces;
                if (num == 1000 && i < abbrev.length - 1) {
                    num = 1;
                    i++;
                }
                num += abbrev[i];
                break;
            }
        }
        return num;
    }

    static async toEmojiMessage(ctx, text, x, y) {
        return fillTextWithTwemoji(ctx, text, x, y);
    }

    static toDiscordTime() {
        let date = new Date();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `Today at ${hours}:${minutes}`;
    }

    static formatTime(time) {
        if (!time) return "00:00";
        const fmt = moment.duration(time).format("dd:hh:mm:ss");

        const chunk = fmt.split(":");
        if (chunk.length < 2) chunk.unshift("00");
        return chunk.join(":");
    }

    static shorten(text, len) {
        if (typeof text !== "string") return "";
        if (text.length <= len) return text;
        return text.substr(0, len).trim() + "...";
    }
    static fromNow(date) {
        if (!date) {
            return false;
        }
    
        const ms = new Date().getTime() - date.getTime();
    
        if (ms >= 86400000) {
            const days = Math.floor(ms / 86400000);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    
        return `${humanizeDuration(ms, 1, false, false)} ago`;
    }
    
    static MarryTime(date) {
        if (!date) {
            return false;
        }
    
        const ms = new Date().getTime() - date.getTime();
    
        return `${this.humanizeDuration(ms, 1, true, false)}`;
    }
    
    static humanizeDuration(ms, maxUnits, short = false, fraction = true) {
        const round = ms > 0 ? Math.floor : Math.ceil
        const parsed = [{
                int: round(ms / 3.1536E+10),
                sin: 'year',
                plu: 'Yr',
                sho: 'Yr'
            },{
                int: round(ms / 604800000),
                sin: 'week',
                plu: 'w',
                sho: 'w'
            },
            {
                int: round(ms / 86400000) % 7,
                sin: 'day',
                plu: 'd\'s',
                sho: 'd'
            },
            {
                int: round(ms / 3600000) % 24,
                sin: 'hour',
                plu: 'hrs',
                sho: 'hr'
            },
            {
                int: round(ms / 60000) % 60,
                sin: 'minute',
                plu: 'min',
                sho: 'min'
            },
            {
                int: (round(ms / 1000) % 60) + (round(ms) % 1000 / 1000),
                sin: 'second',
                plu: 's',
                sho: 's'
            }
        ]
    
        const result = []
        for (let i = 0; i < parsed.length; i++) {
            if (!result.length && parsed[i].int === 0) {
                continue
            }
    
            if (result.length >= maxUnits) {
                break
            }
    
            let int = parsed[i].int
            if (!result.length && fraction && i === parsed.length - 1) {
                int = int.toFixed(1)
            } else {
                int = int.toFixed(0)
            }
    
            result.push(`${int}${short ? parsed[i].sho : ' ' + (parseFloat(int) !== 1 ? parsed[i].plu : parsed[i].sin)}`)
        }
    
        return result.map((res, i) => {
            if (!short) {
                if (i === result.length - 2) {
                    return res + ' and'
                } else if (i !== result.length - 1) {
                    return res + ','
                }
            }
            return res
        }).join(' ')
    }
    
}

module.exports = CanvasUtil;