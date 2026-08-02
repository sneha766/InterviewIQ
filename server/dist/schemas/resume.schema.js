"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeAnalysisSchema = void 0;
const zod_1 = require("zod");
exports.ResumeAnalysisSchema = zod_1.z.object({
    overallScore: zod_1.z.number(),
    summary: zod_1.z.string(),
    sectionScores: zod_1.z.object({
        contactInfo: zod_1.z.number(),
        summary: zod_1.z.number(),
        skills: zod_1.z.number(),
        experience: zod_1.z.number(),
        projects: zod_1.z.number(),
        education: zod_1.z.number(),
        certifications: zod_1.z.number(),
    }),
    strengths: zod_1.z.array(zod_1.z.string()),
    weaknesses: zod_1.z.array(zod_1.z.string()),
    missingKeywords: zod_1.z.array(zod_1.z.string()),
    technicalSkills: zod_1.z.array(zod_1.z.string()),
    softSkills: zod_1.z.array(zod_1.z.string()),
    projects: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        feedback: zod_1.z.string(),
    })),
    experience: zod_1.z.array(zod_1.z.object({
        company: zod_1.z.string(),
        feedback: zod_1.z.string(),
    })),
    atsIssues: zod_1.z.array(zod_1.z.string()),
    formattingSuggestions: zod_1.z.array(zod_1.z.string()),
    improvementSuggestions: zod_1.z.array(zod_1.z.string()),
    finalVerdict: zod_1.z.string(),
});
