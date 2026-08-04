import {
  Request,
  Response,
  NextFunction,
} from "express";
import { getAuth } from "@clerk/express";

import * as AnalyticsService from "../services/analytics.service";
import AppError from "../utils/AppError";

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const analytics =
      await AnalyticsService.getAnalytics(userId);

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};