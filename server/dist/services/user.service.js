"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateUser = getOrCreateUser;
const express_1 = require("@clerk/express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
async function getOrCreateUser(clerkUserId) {
    let user = await prisma_1.default.user.findUnique({
        where: {
            clerkId: clerkUserId,
        },
    });
    if (user) {
        return user;
    }
    const clerkUser = await express_1.clerkClient.users.getUser(clerkUserId);
    const primaryEmail = clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId)?.emailAddress ??
        clerkUser.emailAddresses[0]?.emailAddress;
    if (!primaryEmail) {
        throw new AppError_1.default("User email not found.", 400);
    }
    user = await prisma_1.default.user.create({
        data: {
            clerkId: clerkUser.id,
            email: primaryEmail,
            name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
                null,
            imageUrl: clerkUser.imageUrl,
        },
    });
    return user;
}
