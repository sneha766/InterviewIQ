"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementTailorUsage = exports.incrementInterviewUsage = exports.incrementResumeUsage = exports.getOrCreateUsage = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}
const getOrCreateUsage = async (userId) => {
    const usageDate = getToday();
    return prisma_1.default.usage.upsert({
        where: {
            userId_usageDate: {
                userId,
                usageDate,
            },
        },
        update: {},
        create: {
            userId,
            usageDate,
        },
    });
};
exports.getOrCreateUsage = getOrCreateUsage;
const incrementResumeUsage = async (userId) => {
    const usage = await (0, exports.getOrCreateUsage)(userId);
    return prisma_1.default.usage.update({
        where: {
            id: usage.id,
        },
        data: {
            resumeAnalyses: {
                increment: 1,
            },
        },
    });
};
exports.incrementResumeUsage = incrementResumeUsage;
const incrementInterviewUsage = async (userId) => {
    const usage = await (0, exports.getOrCreateUsage)(userId);
    return prisma_1.default.usage.update({
        where: {
            id: usage.id,
        },
        data: {
            interviews: {
                increment: 1,
            },
        },
    });
};
exports.incrementInterviewUsage = incrementInterviewUsage;
const incrementTailorUsage = async (userId) => {
    const usage = await (0, exports.getOrCreateUsage)(userId);
    return prisma_1.default.usage.update({
        where: {
            id: usage.id,
        },
        data: {
            tailorRequests: {
                increment: 1,
            },
        },
    });
};
exports.incrementTailorUsage = incrementTailorUsage;
