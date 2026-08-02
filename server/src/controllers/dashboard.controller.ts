import { NextFunction, Request, Response } from "express";
import dashboardService from "../services/dashboard.service";

class DashboardController {
  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dashboard = await dashboardService.getDashboard(
        req.user!.id
      );

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