import fs from "fs/promises";
import { Request } from "express";

import AppError from "../utils/AppError";
import { extractPdfText } from "../utils/pdfExtractor";
import { tailorResume } from "../ai/tailorResume";
import { incrementTailorUsage } from "../utils/usage";

export const tailorResumeService = async (
  req: Request
) => {
  if (!req.file) {
    throw new AppError("Resume is required.", 400);
  }

  const { jobDescription } = req.body;

  if (!jobDescription) {
    throw new AppError(
      "Job description is required.",
      400
    );
  }

  try {
    const resume = await extractPdfText(req.file.path);

    const result = await tailorResume(
      resume,
      jobDescription
    );

    await incrementTailorUsage(req.user!.id);

    return result;
  } finally {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
  }
};