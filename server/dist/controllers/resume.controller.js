"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.getResumeById = exports.getResumeHistory = exports.analyzeResume = void 0;
const ResumeService = __importStar(require("../services/resume.service"));
const resumeHistory_1 = require("../schemas/resumeHistory");
const auth_1 = require("../utils/auth");
const AppError_1 = __importDefault(require("../utils/AppError"));
const analyzeResume = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        if (!req.file) {
            throw new AppError_1.default("Resume is required.", 400);
        }
        const result = await ResumeService.analyzeResume({
            userId: user.id,
            file: req.file,
        });
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.analyzeResume = analyzeResume;
const getResumeHistory = async (req, res, next) => {
    try {
        const query = resumeHistory_1.ResumeHistoryQuerySchema.parse(req.query);
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const result = await ResumeService.getResumeHistory(user.id, query);
        res.status(200).json({
            success: true,
            message: "Resume history fetched successfully.",
            ...result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getResumeHistory = getResumeHistory;
const getResumeById = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const result = await ResumeService.getResumeById(req.params.id, user.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getResumeById = getResumeById;
const deleteResume = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const result = await ResumeService.deleteResume(req.params.id, user.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteResume = deleteResume;
