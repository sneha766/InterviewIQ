"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterview = void 0;
const openrouter_1 = __importDefault(require("./openrouter"));
const interviewPrompt_1 = require("./interviewPrompt");
const generateInterview = async (role, type, difficulty) => {
    const completion = await openrouter_1.default.chat.completions.create({
        model: process.env.OPENROUTER_MODEL,
        messages: [
            {
                role: "user",
                content: (0, interviewPrompt_1.buildInterviewPrompt)(role, type, difficulty),
            },
        ],
    });
    const text = completion.choices[0].message.content ?? "";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
};
exports.generateInterview = generateInterview;
