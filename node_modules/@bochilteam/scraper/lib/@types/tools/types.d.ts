import { z } from 'zod';
export declare const DidYouMeanArgsSchema: z.ZodObject<{
    0: z.ZodString;
    1: z.ZodArray<z.ZodString, "many">;
    2: z.ZodOptional<z.ZodObject<{
        threshold: z.ZodOptional<z.ZodNumber>;
        opts: z.ZodOptional<z.ZodObject<{
            sensitive: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            sensitive: boolean;
        }, {
            sensitive: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        threshold?: number | undefined;
        opts?: {
            sensitive: boolean;
        } | undefined;
    }, {
        threshold?: number | undefined;
        opts?: {
            sensitive: boolean;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    2?: {
        threshold?: number | undefined;
        opts?: {
            sensitive: boolean;
        } | undefined;
    } | undefined;
    0: string;
    1: string[];
}, {
    2?: {
        threshold?: number | undefined;
        opts?: {
            sensitive: boolean;
        } | undefined;
    } | undefined;
    0: string;
    1: string[];
}>;
export declare const DidYouMeanSchema: z.ZodObject<{
    index: z.ZodNumber;
    query: z.ZodString;
    score: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    index: number;
    query: string;
    score: number;
}, {
    index: number;
    query: string;
    score: number;
}>;
export declare type DidYouMeanArgs = z.infer<typeof DidYouMeanArgsSchema>;
export declare type DidYouMean = z.infer<typeof DidYouMeanSchema>;
//# sourceMappingURL=types.d.ts.map