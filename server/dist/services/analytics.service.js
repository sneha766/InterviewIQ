"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getAnalytics = async (userId) => {
    const [resumes, interviews,] = await Promise.all([
        prisma_1.default.resumeAnalysis.findMany({
            where: { userId },
            orderBy: { createdAt: "asc" },
        }),
        prisma_1.default.interview.findMany({
            where: { userId },
            orderBy: { createdAt: "asc" },
        }),
    ]);
    const resumeScores = resumes.map(r => r.overallScore);
    const interviewScores = interviews
        .filter(i => i.score !== null)
        .map(i => i.score);
    const resume = {
        total: resumes.length,
        averageScore: resumeScores.length
            ? Math.round(resumeScores.reduce((a, b) => a + b, 0) /
                resumeScores.length)
            : 0,
        highestScore: resumeScores.length
            ? Math.max(...resumeScores)
            : 0,
        lowestScore: resumeScores.length
            ? Math.min(...resumeScores)
            : 0,
    };
    const interview = {
        total: interviews.length,
        completed: interviews.filter(i => i.completed).length,
        averageScore: interviewScores.length
            ? Math.round(interviewScores.reduce((a, b) => a + b, 0) /
                interviewScores.length)
            : 0,
        highestScore: interviewScores.length
            ? Math.max(...interviewScores)
            : 0,
    };
    const resumeTrend = resumes.map(r => ({
        date: r.createdAt.toISOString().split("T")[0],
        score: r.overallScore,
    }));
    const interviewTrend = interviews
        .filter(i => i.score !== null)
        .map(i => ({
        date: i.createdAt.toISOString().split("T")[0],
        score: i.score,
    }));
    const scoreDistribution = {
        excellent: resumes.filter(r => r.overallScore >= 90).length,
        good: resumes.filter(r => r.overallScore >= 75 &&
            r.overallScore < 90).length,
        average: resumes.filter(r => r.overallScore >= 60 &&
            r.overallScore < 75).length,
        poor: resumes.filter(r => r.overallScore < 60).length,
    };
    const monthlyMap = new Map();
    resumes.forEach(r => {
        const month = r.createdAt.toLocaleString("default", {
            month: "short",
        });
        if (!monthlyMap.has(month))
            monthlyMap.set(month, {
                resumes: 0,
                interviews: 0,
            });
        monthlyMap.get(month).resumes++;
    });
    interviews.forEach(i => {
        const month = i.createdAt.toLocaleString("default", {
            month: "short",
        });
        if (!monthlyMap.has(month))
            monthlyMap.set(month, {
                resumes: 0,
                interviews: 0,
            });
        monthlyMap.get(month).interviews++;
    });
    const monthlyActivity = [...monthlyMap.entries()].map(([month, value]) => ({
        month,
        resumes: value.resumes,
        interviews: value.interviews,
    }));
    return {
        resume,
        interview,
        resumeTrend,
        interviewTrend,
        monthlyActivity,
        scoreDistribution,
    };
};
exports.getAnalytics = getAnalytics;
