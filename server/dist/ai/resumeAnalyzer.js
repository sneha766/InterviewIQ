"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeResumeText = void 0;
const openrouter_1 = __importDefault(require("./openrouter"));
const prompt_1 = require("./prompt");
const parser_1 = require("./parser");
const AppError_1 = __importDefault(require("../utils/AppError"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const analyzeResumeText = async (resumeText) => {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            console.log(`OpenRouter Attempt ${attempt}`);
            const response = await openrouter_1.default.chat.completions.create({
                model: process.env.OPENROUTER_MODEL,
                messages: [
                    {
                        role: "system",
                        content: prompt_1.resumePrompt,
                    },
                    {
                        role: "user",
                        content: resumeText,
                    },
                ],
                response_format: {
                    type: "json_object",
                },
                temperature: 0.2,
            });
            const content = response.choices[0]?.message
                ?.content;
            if (!content) {
                throw new Error("Empty AI response.");
            }
            return (0, parser_1.parseAIResponse)(content);
        }
        catch (error) {
            lastError = error;
            console.error(`Attempt ${attempt} failed`, error);
            if (attempt < 3) {
                await sleep(2000);
            }
        }
    }
    throw new AppError_1.default("Failed to analyze resume after multiple attempts.", 500);
};
exports.analyzeResumeText = analyzeResumeText;
