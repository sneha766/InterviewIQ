"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResume = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createResume = (data) => {
    return prisma_1.default.resumeAnalysis.create({
        data,
    });
};
exports.createResume = createResume;
