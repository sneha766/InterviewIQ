import { Router } from "express";

import {
  getProblems,
  getProblemBySlug,
  runCode,
  submitCode,
  getSubmissionHistory,
  getSubmission,
  getCodingReports,
  generateReview,
  generateHints,
  codingChat,
} from "../controllers/coding.controller";

import { requireAuth } from "../middleware/clerk.middleware";

const router = Router();

/* Public */

router.get("/problems", getProblems);

router.get("/reports", getCodingReports);

router.get("/problems/:slug", getProblemBySlug);

/* Protected */

router.post(
  "/run",
//   requireAuth(),
  runCode
);

router.post(
  "/submit",
//   requireAuth(),
  submitCode
);

router.get(
  "/history",
//   requireAuth(),
  getSubmissionHistory
);

router.get(
  "/submission/:id",
//   requireAuth(),
  getSubmission
);

router.post(
  "/review",
//   requireAuth(),
  generateReview
);

router.post(
  "/hints",
//   requireAuth(),
  generateHints
);

router.post(
  "/chat",
//   requireAuth(),
  codingChat
);

export default router;