import { Router } from "express";
import resumeRoutes from "./resume.routes";

import dashboardRoutes from "./dashboard.routes";
import tailorRoutes from "./tailor.routes";
import interviewRoutes from "./interview.routes";
import analyticsRoutes from "./analytics.routes";
import billingRoutes from "./billing.routes";
import codingRoutes from "./coding.routes";
const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "InterviewIQ API v1",
  });
});

router.use("/resume", resumeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/tailor", tailorRoutes);
router.use("/interview", interviewRoutes);
router.use(
  "/analytics",
  analyticsRoutes
);
router.use("/coding",codingRoutes);
router.use("/billing", billingRoutes);
export default router;