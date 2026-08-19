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
exports.deleteInterview = exports.getInterviewById = exports.getInterviewHistory = exports.submitInterview = exports.createInterview = void 0;
const auth_1 = require("../utils/auth");
const InterviewService = __importStar(require("../services/interview.service"));
const interview_schema_1 = require("../schemas/interview.schema");
const createInterview = async (req, res, next) => {
    try {
        const body = interview_schema_1.CreateInterviewSchema.parse(req.body);
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const interview = await InterviewService.createInterview(user.id, body);
        res.status(201).json({
            success: true,
            data: interview,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createInterview = createInterview;
const submitInterview = async (req, res, next) => {
    try {
        const body = interview_schema_1.SubmitInterviewSchema.parse(req.body);
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const interview = await InterviewService.submitInterview(req.params.id, user.id, body);
        res.json({
            success: true,
            data: interview,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.submitInterview = submitInterview;
const getInterviewHistory = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const interviews = await InterviewService.getInterviewHistory(user.id);
        res.json({
            success: true,
            data: interviews,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getInterviewHistory = getInterviewHistory;
const getInterviewById = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const interview = await InterviewService.getInterviewById(req.params.id, user.id);
        res.json({
            success: true,
            data: interview,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getInterviewById = getInterviewById;
const deleteInterview = async (req, res, next) => {
    try {
        const user = await (0, auth_1.getAuthenticatedUser)(req);
        const result = await InterviewService.deleteInterview(req.params.id, user.id);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteInterview = deleteInterview;
