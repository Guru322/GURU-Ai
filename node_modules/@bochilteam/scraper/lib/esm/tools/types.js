import { z } from 'zod';
export const DidYouMeanArgsSchema = z.object({
    0: z.string(),
    1: z.array(z.string()),
    2: z.object({
        threshold: z.number().min(0).max(1).optional(),
        opts: z.object({
            sensitive: z.boolean()
        }).optional()
    }).optional()
});
export const DidYouMeanSchema = z.object({
    index: z.number(),
    query: z.string(),
    score: z.number().min(0).max(1)
});
//# sourceMappingURL=types.js.map