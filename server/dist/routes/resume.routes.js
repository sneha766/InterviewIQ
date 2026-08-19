"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resume_controller_1 = require("../controllers/resume.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
const usage_middleware_1 = require("../middleware/usage.middleware");
const clerk_middleware_1 = require("../middleware/clerk.middleware");
const router = (0, express_1.Router)();
/**
 * POST /api/resume/analyze
 */
router.post("/analyze", (0, clerk_middleware_1.requireAuth)(), usage_middleware_1.checkResumeLimit, upload_middleware_1.upload.single("resume"), resume_controller_1.analyzeResume);
/**
 * GET /api/resume/history
 */
router.get("/history", (0, clerk_middleware_1.requireAuth)(), resume_controller_1.getResumeHistory);
/**
 * GET /api/resume/:id
 */
router.get("/:id", (0, clerk_middleware_1.requireAuth)(), resume_controller_1.getResumeById);
/**
 * DELETE /api/resume/:id
 */
router.delete("/:id", (0, clerk_middleware_1.requireAuth)(), resume_controller_1.deleteResume);
exports.default = router;
