"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidYouMeanSchema = exports.DidYouMeanArgsSchema = void 0;
const zod_1 = require("zod");
exports.DidYouMeanArgsSchema = zod_1.z.object({
    0: zod_1.z.string(),
    1: zod_1.z.array(zod_1.z.string()),
    2: zod_1.z.object({
        threshold: zod_1.z.number().min(0).max(1).optional(),
        opts: zod_1.z.object({
            sensitive: zod_1.z.boolean()
        }).optional()
    }).optional()
});
exports.DidYouMeanSchema = zod_1.z.object({
    index: zod_1.z.number(),
    query: zod_1.z.string(),
    score: zod_1.z.number().min(0).max(1)
});
//# sourceMappingURL=types.js.map