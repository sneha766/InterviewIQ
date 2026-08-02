import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import * as ResumeService from "../services/resume.service";
import { ResumeHistoryQuerySchema } from "../schemas/resumeHistory";


export const analyzeResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await ResumeService.analyzeResume(req);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getResumeHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query =
      ResumeHistoryQuerySchema.parse(req.query);

    const result =
      await ResumeService.getResumeHistory(
        req.user!.id,
        query
      );

    res.status(200).json({
      success: true,
      message: "Resume history fetched successfully.",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await ResumeService.getResumeById(
      req.params.id as string,
      req.user!.id
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await ResumeService.deleteResume(
      req.params.id as string,
      req.user!.id
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};