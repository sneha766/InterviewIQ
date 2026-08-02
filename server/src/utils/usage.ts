import prisma from "../lib/prisma";

function getToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

export const getOrCreateUsage = async (
  userId: string
) => {
  const usageDate = getToday();

  return prisma.usage.upsert({
    where: {
      userId_usageDate: {
        userId,
        usageDate,
      },
    },

    update: {},

    create: {
      userId,
      usageDate,
    },
  });
};

export const incrementResumeUsage = async (
  userId: string
) => {
  const usage = await getOrCreateUsage(userId);

  return prisma.usage.update({
    where: {
      id: usage.id,
    },

    data: {
      resumeAnalyses: {
        increment: 1,
      },
    },
  });
};

export const incrementInterviewUsage = async (
  userId: string
) => {
  const usage = await getOrCreateUsage(userId);

  return prisma.usage.update({
    where: {
      id: usage.id,
    },

    data: {
      interviews: {
        increment: 1,
      },
    },
  });
};

export const incrementTailorUsage = async (
  userId: string
) => {
  const usage = await getOrCreateUsage(userId);

  return prisma.usage.update({
    where: {
      id: usage.id,
    },

    data: {
      tailorRequests: {
        increment: 1,
      },
    },
  });
};