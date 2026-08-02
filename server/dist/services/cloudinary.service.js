"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdfToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploadPdfToCloudinary = async (filePath) => {
    return cloudinary_1.default.uploader.upload(filePath, {
        folder: "InterviewIQ/resumes",
        resource_type: "raw",
        format: "pdf",
    });
};
exports.uploadPdfToCloudinary = uploadPdfToCloudinary;
