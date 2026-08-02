import { Router } from "express";
import {
  analyzeResume,
  deleteResume,
  getResumeById,
  getResumeHistory,
} from "../controllers/resume.controller";
import {upload} from "../middleware/upload.middleware";
import { checkResumeLimit } from "../middleware/usage.middleware";
import { requireAuth } from "../middleware/clerk.middleware";

const router = Router();

/**
 * POST /api/resume/analyze
 */


router.post(
  "/analyze",
  requireAuth(),
  checkResumeLimit,
  upload.single("resume"),
  analyzeResume
);

/**
 * GET /api/resume/history
 */
router.get("/history",requireAuth(), getResumeHistory);

/**
 * GET /api/resume/:id
 */
router.get("/:id",requireAuth(), getResumeById);

/**
 * DELETE /api/resume/:id
 */
router.delete("/:id",requireAuth(), deleteResume);

export default router;