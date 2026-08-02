import { Router } from "express";
import dashboardController from "../controllers/dashboard.controller";
import { requireAuth } from "../middleware/clerk.middleware";

const router = Router();

router.get(
    "/",
    requireAuth(),
    dashboardController.getDashboard
);

export default router;