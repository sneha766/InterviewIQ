"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStructuredOutput = generateStructuredOutput;
exports.callAIForJSON = callAIForJSON;
exports.callAIForChat = callAIForChat;
const openrouter_1 = __importDefault(require("../ai/openrouter"));
const parser_1 = require("../ai/parser");
const AppError_1 = __importDefault(require("../utils/AppError"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function generateStructuredOutput(generator, schema) {
    const response = await generator();
    return schema.parse(response);
}
/**
 * Calls the configured OpenRouter model with a single user prompt, expects
 * a JSON response, and retries transient failures. Shared by any AI feature
 * that needs a one-shot JSON completion (code review, hints, etc.) so the
 * retry/parsing logic isn't duplicated per feature.
 */
async function callAIForJSON(prompt, options = {}) {
    const { attempts = 3, temperature = 0.2 } = options;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const response = await openrouter_1.default.chat.completions.create({
                model: process.env.OPENROUTER_MODEL || "openrouter/free",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" },
                temperature,
            });
            const content = response.choices[0]?.message?.content;
            if (!content) {
                throw new Error("Empty AI response.");
            }
            return (0, parser_1.parseAIResponse)(content);
        }
        catch (error) {
            console.error(`AI call attempt ${attempt} failed`, error);
            if (attempt >= attempts) {
                throw new AppError_1.default("AI request failed after multiple attempts.", 500);
            }
            await sleep(1500);
        }
    }
    // Unreachable — the loop above always returns or throws.
    throw new AppError_1.default("AI request failed.", 500);
}
async function callAIForChat(messages, options = {}) {
    const { temperature = 0.4 } = options;
    try {
        const response = await openrouter_1.default.chat.completions.create({
            model: process.env.OPENROUTER_MODEL || "openrouter/free",
            messages,
            temperature,
        });
        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error("Empty AI chat response.");
        }
        return content;
    }
    catch (error) {
        console.error("AI chat failed", error);
        throw new AppError_1.default(error?.message || "AI chat service unavailable", 500);
    }
}
