import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

import AppError from "../utils/AppError";
import * as BillingService from "../services/billing.services";
import { getOrCreateUser } from "../services/user.service";
import * as StripeService from "../services/stripe.service";

export const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId)
      throw new AppError("Unauthorized", 401);

    const user = await getOrCreateUser(userId);

    const session =
      await BillingService.createCheckout(
        user.email,
        user.clerkId
      );

    res.json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId =
      req.query.session_id as string;

    if (!sessionId) {
      throw new AppError(
        "Session ID is required.",
        400
      );
    }

    const result =
      await BillingService.verifyCheckout(
        sessionId
      );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createCheckout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await getOrCreateUser(userId);

    const session =
      await StripeService.createCheckoutSession({
        email: user.email,
        clerkId: user.clerkId,
      });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await getOrCreateUser(userId);

    const usage = await BillingService.getUsage(user.id);

    res.status(200).json({
      success: true,
      data: usage,
    });
  } catch (error) {
    next(error);
  }
};