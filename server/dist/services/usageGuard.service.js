"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResumeLimit = checkResumeLimit;
exports.checkInterviewLimit = checkInterviewLimit;
exports.checkTailorLimit = checkTailorLimit;
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const usage_1 = require("../utils/usage");
async function checkResumeLimit(userId) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            plan: true,
        },
    });
    if (!user) {
        throw new AppError_1.default("User not found.", 404);
    }
    if (user.plan === "PRO") {
        return;
    }
    const usage = await (0, usage_1.getOrCreateUsage)(userId);
    if (usage.resumeAnalyses >= 5) {
        throw new AppError_1.default("Monthly resume analysis limit reached. Upgrade to Pro.", 403);
    }
}
async function checkInterviewLimit(userId) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            plan: true,
        },
    });
    if (!user) {
        throw new AppError_1.default("User not found.", 404);
    }
    if (user.plan === "PRO") {
        return;
    }
    const usage = await (0, usage_1.getOrCreateUsage)(userId);
    if (usage.interviews >= 3) {
        throw new AppError_1.default("Monthly interview limit reached. Upgrade to Pro.", 403);
    }
}
async function checkTailorLimit(userId) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            plan: true,
        },
    });
    if (!user) {
        throw new AppError_1.default("User not found.", 404);
    }
    if (user.plan === "PRO") {
        return;
    }
    const usage = await (0, usage_1.getOrCreateUsage)(userId);
    if (usage.tailorRequests >= 5) {
        throw new AppError_1.default("Monthly tailor resume limit reached. Upgrade to Pro.", 403);
    }
}
