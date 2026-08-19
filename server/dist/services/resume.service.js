"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.getResumeById = exports.getResumeHistory = exports.analyzeResume = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const pdfExtractor_1 = require("../utils/pdfExtractor");
const cloudinary_service_1 = require("./cloudinary.service");
const resumeAnalyzer_1 = require("../ai/resumeAnalyzer");
const usage_1 = require("../utils/usage");
const resume_schema_1 = require("../schemas/resume.schema");
const ai_service_1 = require("./ai.service");
const usageGuard_service_1 = require("./usageGuard.service");
/**
 * Analyze Resume
 */
const analyzeResume = async (input) => {
    const { file, userId } = input;
    await (0, usageGuard_service_1.checkResumeLimit)(userId);
    if (!file) {
        throw new AppError_1.default("Please upload a resume.", 400);
    }
    try {
        const resumeText = await (0, pdfExtractor_1.extractPdfText)(file.path);
        if (!resumeText.trim()) {
            throw new AppError_1.default("Unable to extract text from uploaded resume.", 400);
        }
        const analysis = await (0, ai_service_1.generateStructuredOutput)(() => (0, resumeAnalyzer_1.analyzeResumeText)(resumeText), resume_schema_1.ResumeAnalysisSchema);
        const uploaded = await (0, cloudinary_service_1.uploadPdfToCloudinary)(file.path);
        const savedResume = await prisma_1.default.resumeAnalysis.create({
            data: {
                fileName: file.originalname,
                fileUrl: uploaded.secure_url,
                overallScore: analysis.overallScore,
                analysis: analysis,
                userId,
            },
        });
        await (0, usage_1.incrementResumeUsage)(userId);
        return savedResume;
    }
    finally {
        if (file.path) {
            try {
                await promises_1.default.unlink(file.path);
            }
            catch {
                // Ignore cleanup errors
            }
        }
    }
};
exports.analyzeResume = analyzeResume;
/**
 * Resume History
 */
const getResumeHistory = async (userId, query) => {
    const { page, limit, search, sortBy, order, minScore, maxScore, startDate, endDate, } = query;
    const where = {
        userId,
    };
    if (search) {
        where.fileName = {
            contains: search,
            mode: "insensitive",
        };
    }
    if (minScore !== undefined || maxScore !== undefined) {
        where.overallScore = {};
        if (minScore !== undefined) {
            where.overallScore.gte = minScore;
        }
        if (maxScore !== undefined) {
            where.overallScore.lte = maxScore;
        }
    }
    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) {
            where.createdAt.gte = new Date(startDate);
        }
        if (endDate) {
            where.createdAt.lte = new Date(endDate);
        }
    }
    const [items, totalItems] = await prisma_1.default.$transaction([
        prisma_1.default.resumeAnalysis.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
            select: {
                id: true,
                fileName: true,
                fileUrl: true,
                overallScore: true,
                createdAt: true,
                updatedAt: true,
            },
        }),
        prisma_1.default.resumeAnalysis.count({
            where,
        }),
    ]);
    return {
        items,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            hasNextPage: page < Math.ceil(totalItems / limit),
            hasPreviousPage: page > 1,
        },
    };
};
exports.getResumeHistory = getResumeHistory;
/**
 * Get Resume By Id
 */
const getResumeById = async (id, userId) => {
    const resume = await prisma_1.default.resumeAnalysis.findUnique({
        where: {
            id,
        },
    });
    if (!resume || resume.userId !== userId) {
        throw new AppError_1.default("Resume not found.", 404);
    }
    return resume;
};
exports.getResumeById = getResumeById;
/**
 * Delete Resume
 */
const deleteResume = async (id, userId) => {
    const deleted = await prisma_1.default.resumeAnalysis.deleteMany({
        where: {
            id,
            userId,
        },
    });
    if (deleted.count === 0) {
        throw new AppError_1.default("Resume not found.", 404);
    }
    return {
        success: true,
        message: "Resume deleted successfully.",
    };
};
exports.deleteResume = deleteResume;
