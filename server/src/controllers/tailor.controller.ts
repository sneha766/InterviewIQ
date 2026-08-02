import { NextFunction, Request, Response } from "express";
import * as TailorService from "../services/tailor.service";

export const tailorResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await TailorService.tailorResumeService(req);

    res.status(200).json({
      success: true,
      message: "Resume tailored successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};