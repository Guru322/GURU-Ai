export declare const TAGS: {
    LIST_EMPTY: number;
    STREAM_END: number;
    DICTIONARY_0: number;
    DICTIONARY_1: number;
    DICTIONARY_2: number;
    DICTIONARY_3: number;
    LIST_8: number;
    LIST_16: number;
    JID_PAIR: number;
    HEX_8: number;
    BINARY_8: number;
    BINARY_20: number;
    BINARY_32: number;
    NIBBLE_8: number;
    SINGLE_BYTE_MAX: number;
    PACKED_MAX: number;
    AD_JID: number;
};
export declare const DOUBLE_BYTE_TOKENS: never[];
export declare const SINGLE_BYTE_TOKENS: (string | null)[];
export declare const TOKEN_MAP: {
    [token: string]: {
        dict?: number;
        index: number;
    };
};
