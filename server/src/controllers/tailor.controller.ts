import { NextFunction, Request, Response } from "express";
import * as TailorService from "../services/tailor.service";
import { getAuthenticatedUser } from "../utils/auth";
import AppError from "../utils/AppError";

export const tailorResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);
    if (!req.file) {
      throw new AppError("Resume file is required.", 400);
    }
    const result = await TailorService.tailorResumeService({
      userId: user.id,
      file: req.file,
      jobDescription: req.body.jobDescription,
    });

    res.status(200).json({
      success: true,
      message: "Resume tailored successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};