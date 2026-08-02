import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as AnalyticsService from "../services/analytics.service";

import { getAuth } from "@clerk/express";



export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);
    const analytics =
      await AnalyticsService.getAnalytics(
        req.user!.id
      );

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};