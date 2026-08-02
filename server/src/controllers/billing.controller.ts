import { Request, Response, NextFunction } from "express";
import * as BillingService from "../services/billing.services";

export const getUsage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const usage = await BillingService.getUsage(req.user!.id);

    res.status(200).json({
      success: true,
      data: usage,
    });
  } catch (error) {
    next(error);
  }
};