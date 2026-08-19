import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { getAuthenticatedUser } from "../utils/auth";

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

async function getUserUsage(userId: string) {
  const usageDate = getToday();

  const [user, usage] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        plan: true,
      },
    }),

    prisma.usage.findUnique({
      where: {
        userId_usageDate: {
          userId,
          usageDate,
        },
      },
    }),
  ]);

  return {
    plan: user?.plan ?? "FREE",
    usage,
  };
}

export const checkResumeLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);
    const { plan, usage } = await getUserUsage(user.id);

    if (plan === "PRO") {
      return next();
    }

    if ((usage?.resumeAnalyses ?? 0) >= 5) {
      throw new AppError(
        "Daily resume analysis limit reached. Upgrade to Pro.",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkInterviewLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);
    const { plan, usage } = await getUserUsage(user.id);

    if (plan === "PRO") {
      return next();
    }

    if ((usage?.interviews ?? 0) >= 3) {
      throw new AppError(
        "Daily interview limit reached. Upgrade to Pro.",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkTailorLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);
    const { plan, usage } = await getUserUsage(user.id);

    if (plan === "PRO") {
      return next();
    }

    if ((usage?.tailorRequests ?? 0) >= 5) {
      throw new AppError(
        "Daily resume tailoring limit reached. Upgrade to Pro.",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};