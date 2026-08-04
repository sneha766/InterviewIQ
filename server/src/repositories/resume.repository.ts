import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

interface CreateResumeInput {
  fileName: string;
  fileUrl: string;
  overallScore: number;
  analysis: Prisma.InputJsonValue;
  userId: string;
}

export const createResume = (
  data: CreateResumeInput
) => {
  return prisma.resumeAnalysis.create({
    data,
  });
};