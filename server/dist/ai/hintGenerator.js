"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHints = void 0;
const ai_service_1 = require("../services/ai.service");
const hintPrompt_1 = require("./hintPrompt");
const generateHints = async (input) => {
    return (0, ai_service_1.callAIForJSON)((0, hintPrompt_1.buildHintPrompt)(input));
};
exports.generateHints = generateHints;
