"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInterview = exports.getInterviewById = exports.getInterviewHistory = exports.submitInterview = exports.createInterview = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const interviewGenerator_1 = require("../ai/interviewGenerator");
const interviewEvaluator_1 = require("../ai/interviewEvaluator");
const usageGuard_service_1 = require("./usageGuard.service");
const premiumGuard_service_1 = require("./premiumGuard.service");
const usage_1 = require("../utils/usage");
const createInterview = async (userId, data) => {
    if (data.type === "CODING") {
        await (0, premiumGuard_service_1.requirePro)(userId);
    }
    await (0, usageGuard_service_1.checkInterviewLimit)(userId);
    const generated = await (0, interviewGenerator_1.generateInterview)(data.role, data.type, data.difficulty);
    const interview = await prisma_1.default.interview.create({
        data: {
            userId,
            role: data.role,
            type: data.type,
            difficulty: data.difficulty,
            questions: generated.questions,
            completed: false,
        },
    });
    await (0, usage_1.incrementInterviewUsage)(userId);
    return interview;
};
exports.createInterview = createInterview;
const submitInterview = async (id, userId, data) => {
    const interview = await prisma_1.default.interview.findUnique({
        where: {
            id,
        },
    });
    if (!interview || interview.userId !== userId) {
        throw new AppError_1.default("Interview not found.", 404);
    }
    if (interview.completed) {
        throw new AppError_1.default("Interview already submitted.", 400);
    }
    const feedback = await (0, interviewEvaluator_1.evaluateInterview)(interview.questions, data.answers);
    return prisma_1.default.interview.update({
        where: {
            id,
        },
        data: {
            answers: data.answers,
            feedback: feedback,
            score: feedback.score,
            completed: true,
        },
    });
};
exports.submitInterview = submitInterview;
const getInterviewHistory = async (userId) => {
    return prisma_1.default.interview.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
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
};
exports.getInterviewHistory = getInterviewHistory;
const getInterviewById = async (id, userId) => {
    const interview = await prisma_1.default.interview.findUnique({
        where: {
            id,
        },
    });
    if (!interview || interview.userId !== userId) {
        throw new AppError_1.default("Interview not found.", 404);
    }
    return interview;
};
exports.getInterviewById = getInterviewById;
const deleteInterview = async (id, userId) => {
    const deleted = await prisma_1.default.interview.deleteMany({
        where: {
            id,
            userId,
        },
    });
    if (deleted.count === 0) {
        throw new AppError_1.default("Interview not found.", 404);
    }
    return {
        success: true,
        message: "Interview deleted successfully.",
    };
};
exports.deleteInterview = deleteInterview;
