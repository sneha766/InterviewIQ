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
Object.defineProperty(exports, "__esModule", { value: true });
exports.codingChat = exports.generateHints = exports.generateReview = exports.getCodingReports = exports.getSubmission = exports.getSubmissionHistory = exports.submitCode = exports.runCode = exports.getProblemBySlug = exports.getProblems = void 0;
const CodingService = __importStar(require("../services/coding.service"));
const auth_1 = require("../utils/auth");
const coding_schema_1 = require("../schemas/coding.schema");
const getProblems = async (_req, res, next) => {
    try {
        const problems = await CodingService.getProblems();
        res.status(200).json({
            success: true,
            data: problems,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProblems = getProblems;
const getProblemBySlug = async (req, res, next) => {
    try {
        const problem = await CodingService.getProblemBySlug(req.params.slug);
        res.status(200).json({
            success: true,
            data: problem,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProblemBySlug = getProblemBySlug;
const runCode = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const body = coding_schema_1.RunCodeSchema.parse(req.body);
        const result = await CodingService.runCode({
            userId: user.id,
            ...body,
        });
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.runCode = runCode;
const submitCode = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const body = coding_schema_1.SubmitCodeSchema.parse(req.body);
        const result = await CodingService.submitCode({
            userId: user.id,
            ...body,
        });
        res.status(201).json({
            success: true,
            message: "Submission saved successfully.",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.submitCode = submitCode;
const getSubmissionHistory = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const history = await CodingService.getSubmissionHistory(user.id);
        res.status(200).json({
            success: true,
            data: history,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSubmissionHistory = getSubmissionHistory;
const getSubmission = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const submission = await CodingService.getSubmission(req.params.id, user.id);
        res.status(200).json({
            success: true,
            data: submission,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSubmission = getSubmission;
const getCodingReports = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const reports = await CodingService.getCodingReports(user.id);
        res.status(200).json({
            success: true,
            data: reports,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCodingReports = getCodingReports;
const generateReview = async (req, res, next) => {
    try {
        await (0, auth_1.getAuthenticatedUser)(req);
        const body = coding_schema_1.GenerateReviewSchema.parse(req.body);
        const review = await CodingService.generateReview(body);
        res.status(200).json({
            success: true,
            data: review,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateReview = generateReview;
const generateHints = async (req, res, next) => {
    try {
        await (0, auth_1.getAuthenticatedUser)(req);
        const body = coding_schema_1.GenerateHintsSchema.parse(req.body);
        const hints = await CodingService.generateHints(body);
        res.status(200).json({
            success: true,
            data: hints,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateHints = generateHints;
const codingChat = async (req, res, next) => {
    try {
        await (0, auth_1.getAuthenticatedUser)(req);
        const body = coding_schema_1.CodingChatSchema.parse(req.body);
        const reply = await CodingService.sendChatMessage(body);
        res.status(200).json({
            success: true,
            data: reply,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.codingChat = codingChat;
