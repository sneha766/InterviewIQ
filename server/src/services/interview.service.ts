import { Prisma } from "@prisma/client";

import prisma from "../lib/prisma";
import AppError from "../utils/AppError";

import { generateInterview } from "../ai/interviewGenerator";
import { evaluateInterview } from "../ai/interviewEvaluator";
import { checkInterviewLimit } from "./usageGuard.service";
import {
  CreateInterviewInput,
  SubmitInterviewInput,
} from "../schemas/interview.schema";
import { requirePro } from "./premiumGuard.service";
import { incrementInterviewUsage } from "../utils/usage";
import { generateStructuredOutput } from "./ai.service";

export const createInterview = async (
  userId: string,
  data: CreateInterviewInput
) => {
  if (data.type === "CODING") {
    await requirePro(userId);
  }
  await checkInterviewLimit(userId);
  const generated = await generateInterview(
  data.role,
  data.type,
  data.difficulty
  );
  const interview = await prisma.interview.create({
    data: {
      userId,
      role: data.role,
      type: data.type,
      difficulty: data.difficulty,
      questions: generated.questions as Prisma.InputJsonValue,
      completed: false,
    },
  });

  await incrementInterviewUsage(userId);

  return interview;
};

export const submitInterview = async (
  id: string,
  userId: string,
  data: SubmitInterviewInput
) => {
  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
  });

  if (!interview || interview.userId !== userId) {
    throw new AppError("Interview not found.", 404);
  }

  if (interview.completed) {
    throw new AppError(
      "Interview already submitted.",
      400
    );
  }

  const feedback = await evaluateInterview(
    interview.questions,
    data.answers
  );

  return prisma.interview.update({
    where: {
      id,
    },
    data: {
      answers: data.answers as Prisma.InputJsonValue,
      feedback: feedback as Prisma.InputJsonValue,
      score: feedback.score,
      completed: true,
    },
  });
};

export const getInterviewHistory = async (
  userId: string
) => {
  return prisma.interview.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      role: true,
      type: true,
      difficulty: true,
      score: true,
      completed: true,
      createdAt: true,
    },
  });
};

export const getInterviewById = async (
  id: string,
  userId: string
) => {
  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
  });

  if (!interview || interview.userId !== userId) {
    throw new AppError("Interview not found.", 404);
  }

  return interview;
};

export const deleteInterview = async (
  id: string,
  userId: string
) => {
  const deleted = await prisma.interview.deleteMany({
    where: {
      id,
      userId,
    },
  });

  if (deleted.count === 0) {
    throw new AppError(
      "Interview not found.",
      404
    );
  }

  return {
    success: true,
    message: "Interview deleted successfully.",
  };
};