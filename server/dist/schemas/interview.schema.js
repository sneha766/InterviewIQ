"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitInterviewSchema = exports.CreateInterviewSchema = void 0;
const zod_1 = require("zod");
exports.CreateInterviewSchema = zod_1.z.object({
    type: zod_1.z.enum(["HR", "TECHNICAL", "CODING"]),
    role: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(100),
    difficulty: zod_1.z.enum([
        "EASY",
        "MEDIUM",
        "HARD",
    ]),
});
exports.SubmitInterviewSchema = zod_1.z.object({
    answers: zod_1.z
        .array(zod_1.z.object({
        question: zod_1.z.string(),
        answer: zod_1.z.string().min(1),
    }))
        .min(1),
});
