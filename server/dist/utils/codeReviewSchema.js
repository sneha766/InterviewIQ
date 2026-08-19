"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeReviewSchema = void 0;
const zod_1 = require("zod");
exports.CodeReviewSchema = zod_1.z.object({
    score: zod_1.z.number(),
    readability: zod_1.z.number(),
    maintainability: zod_1.z.number(),
    bugs: zod_1.z.number(),
    complexity: zod_1.z.string(),
    spaceComplexity: zod_1.z.string(),
    security: zod_1.z.string(),
    strengths: zod_1.z.array(zod_1.z.string()),
    improvements: zod_1.z.array(zod_1.z.string()),
    recommendations: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(["success", "warning", "info"]),
        title: zod_1.z.string(),
        description: zod_1.z.string(),
    })),
});
