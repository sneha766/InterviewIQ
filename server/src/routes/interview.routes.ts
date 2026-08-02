import { Router } from "express";


import { checkInterviewLimit } from "../middleware/usage.middleware";
import {

  createInterview,

  submitInterview,

  getInterviewHistory,

  getInterviewById,

  deleteInterview,

} from "../controllers/interview.controller";
import { requireAuth } from "../middleware/clerk.middleware";

const router = Router();

router.post(
  "/",
  requireAuth(),
  checkInterviewLimit,
  createInterview
);

router.post(
  "/:id/submit",
  requireAuth(),
  submitInterview
);

router.get(
  "/",
  requireAuth(),
  getInterviewHistory
);

router.get(
  "/:id",
  requireAuth(),
  getInterviewById
);

router.delete(
  "/:id",
  requireAuth(),
  deleteInterview
);

export default router;