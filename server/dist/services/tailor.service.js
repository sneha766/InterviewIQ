"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailorResumeService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const pdfExtractor_1 = require("../utils/pdfExtractor");
const tailorResume_1 = require("../ai/tailorResume");
const usage_1 = require("../utils/usage");
const usageGuard_service_1 = require("./usageGuard.service");
const tailorResumeService = async (input) => {
    if (!input.file) {
        throw new AppError_1.default("Resume is required.", 400);
    }
    await (0, usageGuard_service_1.checkTailorLimit)(input.userId);
    const { jobDescription } = input.jobDescription ? { jobDescription: input.jobDescription } : {};
    if (!jobDescription) {
        throw new AppError_1.default("Job description is required.", 400);
    }
    try {
        const resume = await (0, pdfExtractor_1.extractPdfText)(input.file.path);
        const result = await (0, tailorResume_1.tailorResume)(resume, jobDescription);
        await (0, usage_1.incrementTailorUsage)(input.userId);
        return result;
    }
    finally {
        if (input.file?.path) {
            await promises_1.default.unlink(input.file.path).catch(() => { });
        }
    }
};
exports.tailorResumeService = tailorResumeService;
