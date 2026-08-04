import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { getOrCreateUsage } from "../utils/usage";

export async function checkResumeLimit(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      plan: true,
    },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.plan === "PRO") {
    return;
  }

  const usage = await getOrCreateUsage(userId);

  if (usage.resumeAnalyses >= 5) {
    throw new AppError(
      "Monthly resume analysis limit reached. Upgrade to Pro.",
      403
    );
  }
}

export async function checkInterviewLimit(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      plan: true,
    },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.plan === "PRO") {
    return;
  }

  const usage = await getOrCreateUsage(userId);

  if (usage.interviews >= 3) {
    throw new AppError(
      "Monthly interview limit reached. Upgrade to Pro.",
      403
    );
  }
}

export async function checkTailorLimit(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      plan: true,
    },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.plan === "PRO") {
    return;
  }

  const usage = await getOrCreateUsage(userId);

  if (usage.tailorRequests >= 5) {
    throw new AppError(
      "Monthly tailor resume limit reached. Upgrade to Pro.",
      403
    );
  }
}