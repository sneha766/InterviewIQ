"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodingChatSchema = exports.GenerateHintsSchema = exports.GenerateReviewSchema = exports.SubmitCodeSchema = exports.RunCodeSchema = void 0;
const zod_1 = require("zod");
exports.RunCodeSchema = zod_1.z.object({
    language: zod_1.z.enum([
        "cpp",
        "java",
        "python",
        "javascript",
        "go",
    ]),
    code: zod_1.z.string().min(1, "Code is required."),
    input: zod_1.z.string().optional(),
});
exports.SubmitCodeSchema = exports.RunCodeSchema.extend({
    problemId: zod_1.z.string().min(1, "Problem ID is required."),
});
exports.GenerateReviewSchema = zod_1.z.object({
    language: zod_1.z.enum([
        "cpp",
        "java",
        "python",
        "javascript",
        "go",
    ]),
    code: zod_1.z.string().min(1, "Code is required."),
    problemId: zod_1.z.string().optional(),
});
exports.GenerateHintsSchema = zod_1.z.object({
    problemId: zod_1.z.string().min(1, "Problem ID is required."),
    code: zod_1.z.string().optional(),
});
exports.CodingChatSchema = zod_1.z.object({
    problemId: zod_1.z.string().optional(),
    language: zod_1.z.string().default("cpp"),
    code: zod_1.z.string().default(""),
    messages: zod_1.z.array(zod_1.z.object({
        role: zod_1.z.enum(["user", "assistant"]),
        content: zod_1.z.string(),
    })),
});
