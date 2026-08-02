import fs from "fs/promises";
import { Request } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import {
  ResumeHistoryQuery,
} from "../schemas/resumeHistory";
import AppError from "../utils/AppError";

import { uploadPdfToCloudinary } from "./cloudinary.service";
import { ResumeAnalysisSchema } from "../schemas/resume.schema";

import { extractPdfText } from "../utils/pdfExtractor";
import { analyzeResumeText } from "../ai/resumeAnalyzer";
import { incrementResumeUsage } from "../utils/usage";



/**
 * Analyze Resume
 */
export const analyzeResume = async (
  req: Request
) => {
  if (!req.file) {
    throw new AppError(
      "Please upload a resume.",
      400
    );
  }

  try {
    /**
     * Extract text from PDF
     */

    const resumeText =
      await extractPdfText(req.file.path);

    if (!resumeText.trim()) {
      throw new AppError(
        "Unable to extract text from the uploaded resume.",
        400
      );
    }

    /**
     * Analyze Resume
     */

    const analysis =
      ResumeAnalysisSchema.parse(
        await analyzeResumeText(resumeText)
      );

    /**
     * Upload original PDF
     */

    const cloudinaryFile =
      await uploadPdfToCloudinary(
        req.file.path
      );

    /**
     * Save Analysis
     */

    const savedResume =
      await prisma.resumeAnalysis.create({
        data: {
          fileName: req.file.originalname,

          fileUrl:
            cloudinaryFile.secure_url,

          overallScore:
            analysis.overallScore,

          analysis,

          userId: req.user!.id,
        },
      });
      await incrementResumeUsage(req.user!.id);

    return {
      success: true,

      message:
        "Resume analyzed successfully.",

      data: savedResume,
    };
  } finally {
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (error) {
        console.error(
          "Failed to delete temporary file:",
          error
        );
      }
    }
  }
};

/**
 * Resume History
 */
export const getResumeHistory = async (
  userId: string,
  query: ResumeHistoryQuery
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

    if (minScore !== undefined)
      where.overallScore.gte = minScore;

    if (maxScore !== undefined)
      where.overallScore.lte = maxScore;
  }

  if (startDate || endDate) {
    where.createdAt = {};

    if (startDate)
      where.createdAt.gte = new Date(startDate);

    if (endDate)
      where.createdAt.lte = new Date(endDate);
  }

  const [items, totalItems] = await prisma.$transaction([
    prisma.resumeAnalysis.findMany({
      where,

      skip: (page - 1) * limit,

      take: limit,

      orderBy: {
        [sortBy]: order,
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
  const resume = await prisma.resumeAnalysis.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new AppError("Resume not found.", 404);
  }

  return {
    success: true,
    message: "Resume fetched successfully.",
    data: resume,
  };
};

/**
 * Delete Resume
 */
export const deleteResume = async (id: string, userId: string) => {
  const resume = await prisma.resumeAnalysis.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new AppError("Resume not found.", 404);
  }

  await prisma.resumeAnalysis.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Resume deleted successfully.",
  };
};


