import prisma from "../lib/prisma";
import { getOrCreateUsage } from "../utils/usage";

export const getUsage = async (userId: string) => {
  const usage = await getOrCreateUsage(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      plan: true,
    },
  });

  const isPro = user?.plan === "PRO";

  return {
    plan: user?.plan ?? "FREE",

    resumeAnalyses: usage.resumeAnalyses,
    resumeLimit: isPro ? null : 5,

    interviews: usage.interviews,
    interviewLimit: isPro ? null : 3,

    tailorRequests: usage.tailorRequests,
    tailorLimit: isPro ? null : 5,
  };
};