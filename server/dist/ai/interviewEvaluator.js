"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateInterview = void 0;
const openrouter_1 = __importDefault(require("./openrouter"));
const interviewEvaluationPrompt_1 = require("./interviewEvaluationPrompt");
const evaluateInterview = async (questions, answers) => {
    const completion = await openrouter_1.default.chat.completions.create({
        model: process.env.OPENROUTER_MODEL,
        messages: [
            {
                role: "user",
                content: (0, interviewEvaluationPrompt_1.buildEvaluationPrompt)(questions, answers),
            },
        ],
    });
    const text = completion.choices[0].message.content ?? "";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
};
exports.evaluateInterview = evaluateInterview;
