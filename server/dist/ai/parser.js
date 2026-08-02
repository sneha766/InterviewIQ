"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAIResponse = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const parseAIResponse = (text) => {
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    try {
        return JSON.parse(cleaned);
    }
    catch {
        console.error(cleaned);
        throw new AppError_1.default("AI returned invalid JSON.", 500);
    }
};
exports.parseAIResponse = parseAIResponse;
