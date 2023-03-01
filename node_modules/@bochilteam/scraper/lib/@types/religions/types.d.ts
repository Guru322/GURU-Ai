import { z } from 'zod';
export declare const AlQuranSchema: z.ZodObject<{
    number: z.ZodNumber;
    ayatCount: z.ZodOptional<z.ZodNumber>;
    sequence: z.ZodNumber;
    asma: z.ZodObject<{
        ar: z.ZodObject<{
            short: z.ZodString;
            long: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            long: string;
            short: string;
        }, {
            long: string;
            short: string;
        }>;
        en: z.ZodObject<{
            short: z.ZodString;
            long: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            long: string;
            short: string;
        }, {
            long: string;
            short: string;
        }>;
        id: z.ZodObject<{
            short: z.ZodString;
            long: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            long: string;
            short: string;
        }, {
            long: string;
            short: string;
        }>;
        translation: z.ZodObject<{
            en: z.ZodString;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            en: string;
        }, {
            id: string;
            en: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: {
            long: string;
            short: string;
        };
        en: {
            long: string;
            short: string;
        };
        ar: {
            long: string;
            short: string;
        };
        translation: {
            id: string;
            en: string;
        };
    }, {
        id: {
            long: string;
            short: string;
        };
        en: {
            long: string;
            short: string;
        };
        ar: {
            long: string;
            short: string;
        };
        translation: {
            id: string;
            en: string;
        };
    }>;
    preBismillah: z.ZodNullable<z.ZodBoolean>;
    type: z.ZodObject<{
        ar: z.ZodString;
        id: z.ZodString;
        en: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        en: string;
        ar: string;
    }, {
        id: string;
        en: string;
        ar: string;
    }>;
    tafsir: z.ZodObject<{
        id: z.ZodString;
        en: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        en: string | null;
    }, {
        id: string;
        en: string | null;
    }>;
    recitation: z.ZodObject<{
        full: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        full: string;
    }, {
        full: string;
    }>;
    ayahs: z.ZodArray<z.ZodObject<{
        number: z.ZodObject<{
            inquran: z.ZodNumber;
            insurah: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            inquran: number;
            insurah: number;
        }, {
            inquran: number;
            insurah: number;
        }>;
        juz: z.ZodNumber;
        manzil: z.ZodNumber;
        page: z.ZodNumber;
        ruku: z.ZodNumber;
        hizbQuarter: z.ZodNumber;
        sajda: z.ZodObject<{
            recomended: z.ZodOptional<z.ZodBoolean>;
            obligatory: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            recomended?: boolean | undefined;
            obligatory: boolean;
        }, {
            recomended?: boolean | undefined;
            obligatory: boolean;
        }>;
        text: z.ZodObject<{
            ar: z.ZodString;
            read: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            read: string;
            ar: string;
        }, {
            read: string;
            ar: string;
        }>;
        translation: z.ZodObject<{
            en: z.ZodString;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            en: string;
        }, {
            id: string;
            en: string;
        }>;
        tafsir: z.ZodObject<{
            id: z.ZodString;
            en: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            en: string | null;
        }, {
            id: string;
            en: string | null;
        }>;
        audio: z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        number: {
            inquran: number;
            insurah: number;
        };
        audio: {
            url: string;
        };
        text: {
            read: string;
            ar: string;
        };
        page: number;
        translation: {
            id: string;
            en: string;
        };
        tafsir: {
            id: string;
            en: string | null;
        };
        juz: number;
        manzil: number;
        ruku: number;
        hizbQuarter: number;
        sajda: {
            recomended?: boolean | undefined;
            obligatory: boolean;
        };
    }, {
        number: {
            inquran: number;
            insurah: number;
        };
        audio: {
            url: string;
        };
        text: {
            read: string;
            ar: string;
        };
        page: number;
        translation: {
            id: string;
            en: string;
        };
        tafsir: {
            id: string;
            en: string | null;
        };
        juz: number;
        manzil: number;
        ruku: number;
        hizbQuarter: number;
        sajda: {
            recomended?: boolean | undefined;
            obligatory: boolean;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    ayatCount?: number | undefined;
    number: number;
    type: {
        id: string;
        en: string;
        ar: string;
    };
    sequence: number;
    asma: {
        id: {
            long: string;
            short: string;
        };
        en: {
            long: string;
            short: string;
        };
        ar: {
            long: string;
            short: string;
        };
        translation: {
            id: string;
            en: string;
        };
    };
    preBismillah: boolean | null;
    tafsir: {
        id: string;
        en: string | null;
    };
    recitation: {
        full: string;
    };
    ayahs: {
        number: {
            inquran: number;
            insurah: number;
        };
        audio: {
            url: string;
        };
        text: {
            read: string;
            ar: string;
        };
        page: number;
        translation: {
            id: string;
            en: string;
        };
        tafsir: {
            id: string;
            en: string | null;
        };
        juz: number;
        manzil: number;
        ruku: number;
        hizbQuarter: number;
        sajda: {
            recomended?: boolean | undefined;
            obligatory: boolean;
        };
    }[];
}, {
    ayatCount?: number | undefined;
    number: number;
    type: {
        id: string;
        en: string;
        ar: string;
    };
    sequence: number;
    asma: {
        id: {
            long: string;
            short: string;
        };
        en: {
            long: string;
            short: string;
        };
        ar: {
            long: string;
            short: string;
        };
        translation: {
            id: string;
            en: string;
        };
    };
    preBismillah: boolean | null;
    tafsir: {
        id: string;
        en: string | null;
    };
    recitation: {
        full: string;
    };
    ayahs: {
        number: {
            inquran: number;
            insurah: number;
        };
        audio: {
            url: string;
        };
        text: {
            read: string;
            ar: string;
        };
        page: number;
        translation: {
            id: string;
            en: string;
        };
        tafsir: {
            id: string;
            en: string | null;
        };
        juz: number;
        manzil: number;
        ruku: number;
        hizbQuarter: number;
        sajda: {
            recomended?: boolean | undefined;
            obligatory: boolean;
        };
    }[];
}>;
export declare type AlQuran = z.infer<typeof AlQuranSchema>;
export declare const AsmaulHusnaArgsSchema: z.ZodObject<{
    0: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    0?: number | undefined;
}, {
    0?: number | undefined;
}>;
export declare const AsmaulHusnaSchema: z.ZodObject<{
    index: z.ZodNumber;
    latin: z.ZodString;
    arabic: z.ZodString;
    translation_id: z.ZodString;
    translation_en: z.ZodString;
}, "strip", z.ZodTypeAny, {
    index: number;
    latin: string;
    arabic: string;
    translation_id: string;
    translation_en: string;
}, {
    index: number;
    latin: string;
    arabic: string;
    translation_id: string;
    translation_en: string;
}>;
export declare type AsmaulHusna = z.infer<typeof AsmaulHusnaSchema>;
export declare const JadwalSholatArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const JadwalSholatItemSchema: z.ZodObject<{
    value: z.ZodString;
    kota: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    kota: string;
}, {
    value: string;
    kota: string;
}>;
export declare const JadwalSholatSchema: z.ZodObject<{
    date: z.ZodString;
    today: z.ZodRecord<z.ZodString, z.ZodString>;
    list: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        imsyak: z.ZodString;
        shubuh: z.ZodString;
        terbit: z.ZodString;
        dhuha: z.ZodString;
        dzuhur: z.ZodString;
        ashr: z.ZodString;
        magrib: z.ZodString;
        isyak: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        date: string;
        imsyak: string;
        shubuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashr: string;
        magrib: string;
        isyak: string;
    }, {
        date: string;
        imsyak: string;
        shubuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashr: string;
        magrib: string;
        isyak: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    date: string;
    today: Record<string, string>;
    list: {
        date: string;
        imsyak: string;
        shubuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashr: string;
        magrib: string;
        isyak: string;
    }[];
}, {
    date: string;
    today: Record<string, string>;
    list: {
        date: string;
        imsyak: string;
        shubuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashr: string;
        magrib: string;
        isyak: string;
    }[];
}>;
export declare type JadwalSholatItem = z.infer<typeof JadwalSholatItemSchema>;
export declare type JadwalSholat = z.infer<typeof JadwalSholatSchema>;
//# sourceMappingURL=types.d.ts.map