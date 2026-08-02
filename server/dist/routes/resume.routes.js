"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resume_controller_1 = require("../controllers/resume.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
/**
 * POST /api/resume/analyze
 */
router.post("/analyze", auth_middleware_1.authenticate, upload_middleware_1.upload.single("resume"), resume_controller_1.analyzeResume);
/**
 * GET /api/resume/history
 */
router.get("/history", auth_middleware_1.authenticate, resume_controller_1.getResumeHistory);
/**
 * GET /api/resume/:id
 */
router.get("/:id", auth_middleware_1.authenticate, resume_controller_1.getResumeById);
/**
 * DELETE /api/resume/:id
 */
router.delete("/:id", auth_middleware_1.authenticate, resume_controller_1.deleteResume);
exports.default = router;
