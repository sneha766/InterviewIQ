"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewCode = void 0;
const ai_service_1 = require("../services/ai.service");
const codeReviewPrompt_1 = require("./codeReviewPrompt");
const reviewCode = async (input) => {
    return (0, ai_service_1.callAIForJSON)((0, codeReviewPrompt_1.buildCodeReviewPrompt)(input));
};
exports.reviewCode = reviewCode;
