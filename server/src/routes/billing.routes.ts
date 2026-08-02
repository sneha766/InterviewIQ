import { Router } from "express";

import { getUsage } from "../controllers/billing.controller";
import { requireAuth } from "../middleware/clerk.middleware";

const router = Router();

router.get(
  "/usage",
  requireAuth(),
  getUsage
);

export default router;