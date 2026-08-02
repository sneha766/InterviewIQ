import { Router } from "express";

import { upload } from "../middleware/upload.middleware";

import { tailorResume } from "../controllers/tailor.controller";
import { checkTailorLimit } from "../middleware/usage.middleware";
import { requireAuth } from "../middleware/clerk.middleware";

const router = Router();

router.post(
  "/",
  requireAuth(),
  checkTailorLimit,
  upload.single("resume"),
  tailorResume
);

export default router;