"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JadwalSholatSchema = exports.JadwalSholatItemSchema = exports.JadwalSholatArgsSchema = exports.AsmaulHusnaSchema = exports.AsmaulHusnaArgsSchema = exports.AlQuranSchema = void 0;
const zod_1 = require("zod");
const constant_js_1 = require("../constant.js");
const AlQuranTranslationSchema = zod_1.z.object({
    en: zod_1.z.string(),
    id: zod_1.z.string()
});
const AlQuranTafsirSchema = zod_1.z.object({
    id: zod_1.z.string(),
    en: zod_1.z.string().nullable()
});
const AlQuranAsmaSchema = zod_1.z.object({
    short: zod_1.z.string(),
    long: zod_1.z.string()
});
exports.AlQuranSchema = zod_1.z.object({
    number: zod_1.z.number(),
    ayatCount: zod_1.z.number().optional(),
    sequence: zod_1.z.number(),
    asma: zod_1.z.object({
        ar: AlQuranAsmaSchema,
        en: AlQuranAsmaSchema,
        id: AlQuranAsmaSchema,
        translation: AlQuranTranslationSchema
    }),
    preBismillah: zod_1.z.boolean().nullable(),
    type: zod_1.z.object({
        ar: zod_1.z.string(),
        id: zod_1.z.string(),
        en: zod_1.z.string()
    }),
    tafsir: AlQuranTafsirSchema,
    recitation: zod_1.z.object({
        full: zod_1.z.string()
    }),
    ayahs: zod_1.z.array(zod_1.z.object({
        number: zod_1.z.object({
            inquran: zod_1.z.number(),
            insurah: zod_1.z.number()
        }),
        juz: zod_1.z.number(),
        manzil: zod_1.z.number(),
        page: zod_1.z.number(),
        ruku: zod_1.z.number(),
        hizbQuarter: zod_1.z.number(),
        sajda: zod_1.z.object({
            recomended: zod_1.z.boolean().optional(),
            obligatory: zod_1.z.boolean()
        }),
        text: zod_1.z.object({
            ar: zod_1.z.string(),
            read: zod_1.z.string()
        }),
        translation: AlQuranTranslationSchema,
        tafsir: AlQuranTafsirSchema,
        audio: zod_1.z.object({
            url: zod_1.z.string().url()
        })
    }))
});
exports.AsmaulHusnaArgsSchema = zod_1.z.object({
    0: zod_1.z.number().min(1).max(99).optional()
});
exports.AsmaulHusnaSchema = zod_1.z.object({
    index: zod_1.z.number(),
    latin: zod_1.z.string(),
    arabic: zod_1.z.string(),
    translation_id: zod_1.z.string(),
    translation_en: zod_1.z.string()
});
exports.JadwalSholatArgsSchema = zod_1.z.object({
    0: zod_1.z.string(constant_js_1.ERROR_ARGS.QUERY)
});
exports.JadwalSholatItemSchema = zod_1.z.object({
    value: zod_1.z.string(),
    kota: zod_1.z.string()
});
exports.JadwalSholatSchema = zod_1.z.object({
    date: zod_1.z.string(),
    today: zod_1.z.record(zod_1.z.string()),
    list: zod_1.z.object({
        date: zod_1.z.string(),
        imsyak: zod_1.z.string(),
        shubuh: zod_1.z.string(),
        terbit: zod_1.z.string(),
        dhuha: zod_1.z.string(),
        dzuhur: zod_1.z.string(),
        ashr: zod_1.z.string(),
        magrib: zod_1.z.string(),
        isyak: zod_1.z.string()
    }).array()
});
//# sourceMappingURL=types.js.map