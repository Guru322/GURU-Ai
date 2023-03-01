"use strict";
/**
 *
 * Generated from https://translate.google.com
 *
 * The languages that Google Translate supports (as of 5/15/16) alongside with their ISO 639-1 codes
 * See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */
Object.defineProperty(exports, "__esModule", { value: true });
var langs = {
    Automatic: "auto",
    Afrikaans: "af",
    Albanian: "sq",
    Amharic: "am",
    Arabic: "ar",
    Armenian: "hy",
    Azerbaijani: "az",
    Basque: "eu",
    Belarusian: "be",
    Bengali: "bn",
    Bosnian: "bs",
    Bulgarian: "bg",
    Catalan: "ca",
    Cebuano: "ceb",
    Chichewa: "ny",
    "Chinese Simplified": "zh-cn",
    "Chinese Traditional": "zh-tw",
    Corsican: "co",
    Croatian: "hr",
    Czech: "cs",
    Danish: "da",
    Dutch: "nl",
    English: "en",
    Esperanto: "eo",
    Estonian: "et",
    Filipino: "tl",
    Finnish: "fi",
    French: "fr",
    Frisian: "fy",
    Galician: "gl",
    Georgian: "ka",
    German: "de",
    Greek: "el",
    Gujarati: "gu",
    "Haitian Creole": "ht",
    Hausa: "ha",
    Hawaiian: "haw",
    Hebrew: "iw",
    Hindi: "hi",
    Hmong: "hmn",
    Hungarian: "hu",
    Icelandic: "is",
    Igbo: "ig",
    Indonesian: "id",
    Irish: "ga",
    Italian: "it",
    Japanese: "ja",
    Javanese: "jw",
    Kannada: "kn",
    Kazakh: "kk",
    Khmer: "km",
    Korean: "ko",
    "Kurdish (Kurmanji)": "ku",
    Kyrgyz: "ky",
    Lao: "lo",
    Latin: "la",
    Latvian: "lv",
    Lithuanian: "lt",
    Luxembourgish: "lb",
    Macedonian: "mk",
    Malagasy: "mg",
    Malay: "ms",
    Malayalam: "ml",
    Maltese: "mt",
    Maori: "mi",
    Marathi: "mr",
    Mongolian: "mn",
    "Myanmar (Burmese)": "my",
    Nepali: "ne",
    Norwegian: "no",
    Pashto: "ps",
    Persian: "fa",
    Polish: "pl",
    Portuguese: "pt",
    Punjabi: "ma",
    Romanian: "ro",
    Russian: "ru",
    Samoan: "sm",
    "Scots Gaelic": "gd",
    Serbian: "sr",
    Sesotho: "st",
    Shona: "sn",
    Sindhi: "sd",
    Sinhala: "si",
    Slovak: "sk",
    Slovenian: "sl",
    Somali: "so",
    Spanish: "es",
    Sundanese: "su",
    Swahili: "sw",
    Swedish: "sv",
    Tajik: "tg",
    Tamil: "ta",
    Telugu: "te",
    Thai: "th",
    Turkish: "tr",
    Ukrainian: "uk",
    Urdu: "ur",
    Uyghur: "ug",
    Uzbek: "uz",
    Vietnamese: "vi",
    Welsh: "cy",
    Xhosa: "xh",
    Yiddish: "yi",
    Yoruba: "yo",
    Zulu: "zu"
};
function isSupport(language) {
    return Boolean(getCode(language));
}
exports.isSupport = isSupport;
function getCode(language) {
    if (!language) {
        return false;
    }
    if (langs[language]) {
        return langs[language];
    }
    var keys = Object.keys(langs).filter(function (item) {
        var lowerLan = language.toLowerCase();
        return langs[item] === lowerLan;
    });
    if (keys[0]) {
        return langs[keys[0]];
    }
    return false;
}
exports.getCode = getCode;
function getAllLanguage() {
    return Object.keys(langs);
}
exports.getAllLanguage = getAllLanguage;
function getAllCode() {
    return Object.keys(langs).map(function (item) { return (langs[item]); });
}
exports.getAllCode = getAllCode;
exports.default = langs;
