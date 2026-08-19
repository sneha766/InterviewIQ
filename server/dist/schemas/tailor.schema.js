"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailorResponseSchema = void 0;
const zod_1 = require("zod");
exports.TailorResponseSchema = zod_1.z.object({
    matchScore: zod_1.z.number(),
    missingKeywords: zod_1.z.array(zod_1.z.string()),
    atsSuggestions: zod_1.z.array(zod_1.z.string()),
    tailoredSummary: zod_1.z.string(),
    tailoredSkills: zod_1.z.array(zod_1.z.string()),
    projectSuggestions: zod_1.z.array(zod_1.z.string()),
    experienceSuggestions: zod_1.z.array(zod_1.z.string()),
    finalResume: zod_1.z.string(),
});
