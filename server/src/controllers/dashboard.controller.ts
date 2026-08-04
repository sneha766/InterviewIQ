import {
  NextFunction,
  Request,
  Response,
} from "express";
import { getAuth } from "@clerk/express";

import dashboardService from "../services/dashboard.service";
import AppError from "../utils/AppError";

class DashboardController {
  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = getAuth(req);

      if (!userId) {
        throw new AppError(
          "Authentication required.",
          401
        );
      }

      const dashboard =
        await dashboardService.getDashboard(userId);

      return res.status(200).json({
        success: true,
        message: "Dashboard fetched successfully.",
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();