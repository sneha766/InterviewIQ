import prisma from "../lib/prisma";
import AppError from "../utils/AppError";

import { generateInterview } from "../ai/interviewGenerator";
import { evaluateInterview } from "../ai/interviewEvaluator";

import {
  CreateInterviewInput,
  SubmitInterviewInput,
} from "../schemas/interview.schema";

import { incrementInterviewUsage } from "../utils/usage";

export const createInterview = async (
  userId: string,
  data: CreateInterviewInput
) => {

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

      questions: generated.questions,

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

  const interview = await prisma.interview.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!interview)
    throw new AppError(
      "Interview not found.",
      404
    );

  if (interview.completed)
    throw new AppError(
      "Interview already submitted.",
      400
    );

  const feedback = await evaluateInterview(
    interview.questions,
    data.answers
  );

  return prisma.interview.update({
    where: {
      id,
    },

    data: {

      answers: data.answers,

      feedback: feedback,

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

  });

};

export const getInterviewById = async (
  id: string,
  userId: string
) => {

  const interview =
    await prisma.interview.findFirst({

      where: {

        id,

        userId,

      },

    });

  if (!interview)
    throw new AppError(
      "Interview not found.",
      404
    );

  return interview;

};

export const deleteInterview = async (
  id: string,
  userId: string
) => {

  const interview =
    await prisma.interview.findFirst({

      where: {

        id,

        userId,

      },

    });

  if (!interview)
    throw new AppError(
      "Interview not found.",
      404
    );

  await prisma.interview.delete({

    where: {

      id,

    },

  });

  return {

    success: true,

    message:
      "Interview deleted successfully.",

  };

};