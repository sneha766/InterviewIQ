"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailorResume = void 0;
const openrouter_1 = __importDefault(require("./openrouter"));
const tailorPrompt_1 = require("./tailorPrompt");
const tailor_schema_1 = require("../schemas/tailor.schema");
const tailorResume = async (resume, jobDescription) => {
    const completion = await openrouter_1.default.chat.completions.create({
        model: process.env.OPENROUTER_MODEL,
        messages: [
            {
                role: "user",
                content: (0, tailorPrompt_1.buildTailorPrompt)(resume, jobDescription),
            },
        ],
    });
    const content = completion.choices[0].message.content ?? "";
    const parsed = JSON.parse(content.replace(/```json|```/g, "").trim());
    return tailor_schema_1.TailorResponseSchema.parse(parsed);
};
exports.tailorResume = tailorResume;
