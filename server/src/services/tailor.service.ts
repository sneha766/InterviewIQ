import fs from "fs/promises";
import { Request } from "express";

import AppError from "../utils/AppError";
import { extractPdfText } from "../utils/pdfExtractor";
import { tailorResume } from "../ai/tailorResume";
import { incrementTailorUsage } from "../utils/usage";
import { checkTailorLimit } from "./usageGuard.service";

export interface TailorResumeInput {
    userId: string;
    file: Express.Multer.File;
    jobDescription: string;
}

export const tailorResumeService = async (
  input: TailorResumeInput
) => {
  
  if (!input.file) {
    throw new AppError("Resume is required.", 400);
  }
  await checkTailorLimit(input.userId);

  const { jobDescription } = input.jobDescription ? { jobDescription: input.jobDescription } : {};

  if (!jobDescription) {
    throw new AppError(
      "Job description is required.",
      400
    );
  }

  try {
    
    const resume = await extractPdfText(input.file.path);

    const result = await tailorResume(
      resume,
      jobDescription
    );

    await incrementTailorUsage(input.userId);

    return result;
  } finally {
    if (input.file?.path) {
      await fs.unlink(input.file.path).catch(() => {});
    }
  }
};