import fs from "fs/promises";
import { Prisma } from "@prisma/client";

import prisma from "../lib/prisma";
import AppError from "../utils/AppError";

import { extractPdfText } from "../utils/pdfExtractor";
import { uploadPdfToCloudinary } from "./cloudinary.service";
import { analyzeResumeText } from "../ai/resumeAnalyzer";
import { incrementResumeUsage } from "../utils/usage";

import { ResumeAnalysisSchema } from "../schemas/resume.schema";
import { ResumeHistoryQuery } from "../schemas/resumeHistory";
import { AnalyzeResumeInput } from "../types/resume.types";
import { generateStructuredOutput } from "./ai.service";
import { checkResumeLimit } from "./usageGuard.service";



/**
 * Analyze Resume
 */
export const analyzeResume = async (input: AnalyzeResumeInput) => {
  const { file, userId } = input;
  await checkResumeLimit(userId);
  if (!file) {
    throw new AppError("Please upload a resume.", 400);
  }

  try {
    const resumeText = await extractPdfText(file.path);

    if (!resumeText.trim()) {
      throw new AppError("Unable to extract text from uploaded resume.", 400);
    }

    const analysis = await generateStructuredOutput(
      () => analyzeResumeText(resumeText),
      ResumeAnalysisSchema,
    );

    const uploaded = await uploadPdfToCloudinary(file.path);

    const savedResume = await prisma.resumeAnalysis.create({
      data: {
        fileName: file.originalname,
        fileUrl: uploaded.secure_url,
        overallScore: analysis.overallScore,
        analysis: analysis as Prisma.InputJsonValue,
        userId,
      },
    });

    await incrementResumeUsage(userId);

    return savedResume;
  } finally {
    if (file.path) {
      try {
        await fs.unlink(file.path);
      } catch {
        // Ignore cleanup errors
      }
    }
  }
};

/**
 * Resume History
 */
export const getResumeHistory = async (
  userId: string,
  query: ResumeHistoryQuery,
) => {
  const {
    page,
    limit,
    search,
    sortBy,
    order,
    minScore,
    maxScore,
    startDate,
    endDate,
  } = query;

  const where: Prisma.ResumeAnalysisWhereInput = {
    userId,
  };

  if (search) {
    where.fileName = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (minScore !== undefined || maxScore !== undefined) {
    where.overallScore = {};

    if (minScore !== undefined) {
      where.overallScore.gte = minScore;
    }

    if (maxScore !== undefined) {
      where.overallScore.lte = maxScore;
    }
  }

  if (startDate || endDate) {
    where.createdAt = {};

    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }

    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }
  }

  const [items, totalItems] = await prisma.$transaction([
    prisma.resumeAnalysis.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        overallScore: true,
        createdAt: true,
        updatedAt: true,
      },
    }),

    prisma.resumeAnalysis.count({
      where,
    }),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      hasNextPage: page < Math.ceil(totalItems / limit),
      hasPreviousPage: page > 1,
    },
  };
};

/**
 * Get Resume By Id
 */
export const getResumeById = async (id: string, userId: string) => {
  const resume = await prisma.resumeAnalysis.findUnique({
    where: {
      id,
    },
  });

  if (!resume || resume.userId !== userId) {
    throw new AppError("Resume not found.", 404);
  }

  return resume;
};

/**
 * Delete Resume
 */
export const deleteResume = async (id: string, userId: string) => {
  const deleted = await prisma.resumeAnalysis.deleteMany({
    where: {
      id,
      userId,
    },
  });

  if (deleted.count === 0) {
    throw new AppError("Resume not found.", 404);
  }

  return {
    success: true,
    message: "Resume deleted successfully.",
  };
};
