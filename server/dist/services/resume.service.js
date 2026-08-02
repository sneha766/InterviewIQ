"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.getResumeById = exports.getResumeHistory = exports.analyzeResume = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const cloudinary_service_1 = require("./cloudinary.service");
const resume_schema_1 = require("../schemas/resume.schema");
const pdfExtractor_1 = require("../utils/pdfExtractor");
const resumeAnalyzer_1 = require("../ai/resumeAnalyzer");
const buildPrompt = () => `
You are an expert ATS Resume Reviewer and Senior Technical Recruiter.

Analyze the uploaded resume thoroughly.

Return ONLY valid JSON.

Return the response in exactly this format:

{
  "overallScore": 87,

  "summary": "",

  "sectionScores": {
    "contactInfo": 0,
    "summary": 0,
    "skills": 0,
    "experience": 0,
    "projects": 0,
    "education": 0,
    "certifications": 0
  },

  "strengths": [],

  "weaknesses": [],

  "missingKeywords": [],

  "technicalSkills": [],

  "softSkills": [],

  "projects": [
    {
      "name": "",
      "feedback": ""
    }
  ],

  "experience": [
    {
      "company": "",
      "feedback": ""
    }
  ],

  "atsIssues": [],

  "formattingSuggestions": [],

  "improvementSuggestions": [],

  "finalVerdict": ""
}

IMPORTANT:

- Return ONLY valid JSON.
- Do NOT wrap the JSON in markdown code fences.
- Do NOT include the word "json" before the response.
- Every key must exist.
- Never return null.
- If any value is unavailable:
  - use "" for strings
  - use 0 for numbers
  - use [] for arrays
`;
const parseGeminiResponse = (text) => {
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    try {
        return JSON.parse(cleaned);
    }
    catch {
        console.error("Invalid Gemini Response:\n", cleaned);
        throw new AppError_1.default("Gemini returned an invalid JSON response.", 500);
    }
};
/**
 * Analyze Resume
 */
const analyzeResume = async (req) => {
    if (!req.file) {
        throw new AppError_1.default("Please upload a resume.", 400);
    }
    try {
        /**
         * Extract text from PDF
         */
        const resumeText = await (0, pdfExtractor_1.extractPdfText)(req.file.path);
        if (!resumeText.trim()) {
            throw new AppError_1.default("Unable to extract text from the uploaded resume.", 400);
        }
        /**
         * Analyze Resume
         */
        const analysis = resume_schema_1.ResumeAnalysisSchema.parse(await (0, resumeAnalyzer_1.analyzeResumeText)(resumeText));
        /**
         * Upload original PDF
         */
        const cloudinaryFile = await (0, cloudinary_service_1.uploadPdfToCloudinary)(req.file.path);
        /**
         * Save Analysis
         */
        const savedResume = await prisma_1.default.resumeAnalysis.create({
            data: {
                fileName: req.file.originalname,
                fileUrl: cloudinaryFile.secure_url,
                overallScore: analysis.overallScore,
                analysis,
                userId: req.user.id,
            },
        });
        return {
            success: true,
            message: "Resume analyzed successfully.",
            data: savedResume,
        };
    }
    finally {
        if (req.file?.path) {
            try {
                await promises_1.default.unlink(req.file.path);
            }
            catch (error) {
                console.error("Failed to delete temporary file:", error);
            }
        }
    }
};
exports.analyzeResume = analyzeResume;
/**
 * Resume History
 */
const getResumeHistory = async (userId, query) => {
    const { page, limit, search, sortBy, order, minScore, maxScore, } = query;
    const where = {
        userId,
    };
    if (search) {
        where.fileName = {
            contains: search,
            mode: "insensitive",
        };
    }
    if (minScore !== undefined ||
        maxScore !== undefined) {
        where.overallScore = {};
        if (minScore !== undefined) {
            where.overallScore.gte = minScore;
        }
        if (maxScore !== undefined) {
            where.overallScore.lte = maxScore;
        }
    }
    const [totalItems, resumes] = await Promise.all([
        prisma_1.default.resumeAnalysis.count({
            where,
        }),
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
            },
        }),
    ]);
    return {
        resumes,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        },
    };
};
exports.getResumeHistory = getResumeHistory;
/**
 * Get Resume By Id
 */
const getResumeById = async (id, userId) => {
    const resume = await prisma_1.default.resumeAnalysis.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!resume) {
        throw new AppError_1.default("Resume not found.", 404);
    }
    return {
        success: true,
        message: "Resume fetched successfully.",
        data: resume,
    };
};
exports.getResumeById = getResumeById;
/**
 * Delete Resume
 */
const deleteResume = async (id, userId) => {
    const resume = await prisma_1.default.resumeAnalysis.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!resume) {
        throw new AppError_1.default("Resume not found.", 404);
    }
    await prisma_1.default.resumeAnalysis.delete({
        where: {
            id,
        },
    });
    return {
        success: true,
        message: "Resume deleted successfully.",
    };
};
exports.deleteResume = deleteResume;
