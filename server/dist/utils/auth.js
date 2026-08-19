"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = getAuthenticatedUser;
const express_1 = require("@clerk/express");
const AppError_1 = __importDefault(require("./AppError"));
const user_service_1 = require("../services/user.service");
async function getAuthenticatedUser(req) {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        throw new AppError_1.default("Unauthorized", 401);
    }
    return (0, user_service_1.getOrCreateUser)(userId);
}
