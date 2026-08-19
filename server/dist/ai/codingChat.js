"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCodingChatMessage = void 0;
const ai_service_1 = require("../services/ai.service");
const codingChatPrompt_1 = require("./codingChatPrompt");
const sendCodingChatMessage = async ({ language, code, problemTitle, problemDescription, messages, }) => {
    const systemMessage = {
        role: "system",
        content: (0, codingChatPrompt_1.buildCodingChatSystemPrompt)({
            language,
            code,
            problemTitle,
            problemDescription,
        }),
    };
    return (0, ai_service_1.callAIForChat)([systemMessage, ...messages], { temperature: 0.4 });
};
exports.sendCodingChatMessage = sendCodingChatMessage;
