"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeHistoryQuerySchema = void 0;
const zod_1 = require("zod");
exports.ResumeHistoryQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(50).default(10),
    search: zod_1.z.preprocess((value) => Array.isArray(value) ? value[0] : value, zod_1.z.string().trim().optional()),
    sortBy: zod_1.z
        .enum(["createdAt", "overallScore"])
        .default("createdAt"),
    order: zod_1.z.enum(["asc", "desc"]).default("desc"),
    minScore: zod_1.z.preprocess((value) => Array.isArray(value) ? value[0] : value, zod_1.z.coerce.number().min(0).max(100).optional()),
    maxScore: zod_1.z.preprocess((value) => Array.isArray(value) ? value[0] : value, zod_1.z.coerce.number().min(0).max(100).optional()),
});
