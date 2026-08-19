"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePro = requirePro;
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
async function requirePro(userId) {
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
    if (user.plan !== "PRO") {
        throw new AppError_1.default("This feature requires InterviewIQ Pro.", 403);
    }
}
