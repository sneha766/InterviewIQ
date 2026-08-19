"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
class DashboardService {
    async getOverview(userId) {
        const [totalResumes, aggregate, latestResume] = await Promise.all([
            prisma_1.default.resumeAnalysis.count({
                where: { userId },
            }),
            prisma_1.default.resumeAnalysis.aggregate({
                where: { userId },
                _avg: {
                    overallScore: true,
                },
                _max: {
                    overallScore: true,
                },
                _min: {
                    overallScore: true,
                },
            }),
            prisma_1.default.resumeAnalysis.findFirst({
                where: {
                    userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    overallScore: true,
                },
            }),
        ]);
        return {
            totalResumes,
            averageATS: totalResumes === 0
                ? 0
                : Number((aggregate._avg.overallScore ?? 0).toFixed(2)),
            highestATS: aggregate._max.overallScore ?? 0,
            lowestATS: aggregate._min.overallScore ?? 0,
            latestATS: latestResume?.overallScore ?? 0,
        };
    }
    async getRecentResumes(userId) {
        return prisma_1.default.resumeAnalysis.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            select: {
                id: true,
                fileName: true,
                overallScore: true,
                createdAt: true,
            },
        });
    }
    async getRecentInterviews(userId) {
        return prisma_1.default.interview.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            select: {
                id: true,
                role: true,
                type: true,
                difficulty: true,
                score: true,
                completed: true,
                createdAt: true,
            },
        });
    }
    async getScoreDistribution(userId) {
        const resumes = await prisma_1.default.resumeAnalysis.findMany({
            where: {
                userId,
            },
            select: {
                overallScore: true,
            },
        });
        return resumes.reduce((distribution, resume) => {
            const score = resume.overallScore;
            if (score >= 90) {
                distribution.excellent++;
            }
            else if (score >= 75) {
                distribution.good++;
            }
            else if (score >= 60) {
                distribution.average++;
            }
            else {
                distribution.poor++;
            }
            return distribution;
        }, {
            excellent: 0,
            good: 0,
            average: 0,
            poor: 0,
        });
    }
    async getCodingStats(userId) {
        const submissions = await prisma_1.default.codingSubmission.findMany({
            where: { userId },
            select: { problemId: true, status: true, createdAt: true },
        });
        const solvedSet = new Set();
        let acceptedCount = 0;
        for (const sub of submissions) {
            if (sub.status === "Accepted") {
                solvedSet.add(sub.problemId);
                acceptedCount++;
            }
        }
        const acceptanceRate = submissions.length > 0
            ? Number(((acceptedCount / submissions.length) * 100).toFixed(1))
            : 0;
        return {
            problemsSolved: solvedSet.size,
            acceptanceRate,
            streak: submissions.length > 0 ? 1 : 0,
        };
    }
    async getDashboard(userId) {
        const [overview, recentResumes, recentInterviews, scoreDistribution, codingStats,] = await Promise.all([
            this.getOverview(userId),
            this.getRecentResumes(userId),
            this.getRecentInterviews(userId),
            this.getScoreDistribution(userId),
            this.getCodingStats(userId),
        ]);
        return {
            overview,
            recentResumes,
            recentInterviews,
            scoreDistribution,
            codingStats,
        };
    }
}
exports.default = new DashboardService();
