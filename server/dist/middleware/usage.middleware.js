"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTailorLimit = exports.checkInterviewLimit = exports.checkResumeLimit = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const auth_1 = require("../utils/auth");
function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}
async function getUserUsage(userId) {
    const usageDate = getToday();
    const [user, usage] = await Promise.all([
        prisma_1.default.user.findUnique({
            where: { id: userId },
            select: {
                plan: true,
            },
        }),
        prisma_1.default.usage.findUnique({
            where: {
                userId_usageDate: {
                    userId,
                    usageDate,
                },
            },
        }),
    ]);
    return {
        plan: user?.plan ?? "FREE",
        usage,
    };
}
const checkResumeLimit = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const { plan, usage } = await getUserUsage(user.id);
        if (plan === "PRO") {
            return next();
        }
        if ((usage?.resumeAnalyses ?? 0) >= 5) {
            throw new AppError_1.default("Daily resume analysis limit reached. Upgrade to Pro.", 403);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkResumeLimit = checkResumeLimit;
const checkInterviewLimit = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const { plan, usage } = await getUserUsage(user.id);
        if (plan === "PRO") {
            return next();
        }
        if ((usage?.interviews ?? 0) >= 3) {
            throw new AppError_1.default("Daily interview limit reached. Upgrade to Pro.", 403);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkInterviewLimit = checkInterviewLimit;
const checkTailorLimit = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const { plan, usage } = await getUserUsage(user.id);
        if (plan === "PRO") {
            return next();
        }
        if ((usage?.tailorRequests ?? 0) >= 5) {
            throw new AppError_1.default("Daily resume tailoring limit reached. Upgrade to Pro.", 403);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkTailorLimit = checkTailorLimit;
