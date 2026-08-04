import { Router } from "express";

import { getUsage, verifyCheckoutSession } from "../controllers/billing.controller";
import { requireAuth } from "../middleware/clerk.middleware";
import { createCheckout, createCheckoutSession } from "../controllers/billing.controller";

const router = Router();

router.get(
  "/usage",
  requireAuth(),
  getUsage
);
router.post(
  "/checkout",
  requireAuth(),
  createCheckout
);
router.post(
  "/checkout",
  requireAuth(),
  createCheckoutSession
);

router.get(
  "/verify",
  requireAuth(),
  verifyCheckoutSession
);

export default router;