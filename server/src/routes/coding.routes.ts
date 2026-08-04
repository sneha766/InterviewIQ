import { Router } from "express";

import {
  getProblems,
  getProblemBySlug,
  runCode,
  submitCode,
  getSubmissionHistory,
  getSubmission,
} from "../controllers/coding.controller";

import { requireAuth } from "../middleware/clerk.middleware";

const router = Router();

/* Public */

router.get("/problems", getProblems);

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

export default router;