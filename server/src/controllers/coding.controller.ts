import { NextFunction, Request, Response } from "express";

import * as CodingService from "../services/coding.service";

import { getAuthenticatedUser } from "../utils/auth";
import {
  RunCodeSchema,
  SubmitCodeSchema,
  GenerateReviewSchema,
  GenerateHintsSchema,
  CodingChatSchema,
} from "../schemas/coding.schema";

export const getProblems = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const problems = await CodingService.getProblems();

    res.status(200).json({
      success: true,
      data: problems,
    });
  } catch (error) {
    next(error);
  }
};

export const getProblemBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const problem = await CodingService.getProblemBySlug(
      req.params.slug as string
    );

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

export const runCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const body = RunCodeSchema.parse(req.body);

    const result = await CodingService.runCode({
      userId: user.id,
      ...body,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const submitCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const body = SubmitCodeSchema.parse(req.body);

    const result = await CodingService.submitCode({
      userId: user.id,
      ...body,
    });

    res.status(201).json({
      success: true,
      message: "Submission saved successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubmissionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const history =
      await CodingService.getSubmissionHistory(
        user.id
      );

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const submission =
      await CodingService.getSubmission(
        req.params.id as string,
        user.id
      );

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

export const getCodingReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const reports = await CodingService.getCodingReports(user.id);

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};

export const generateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getAuthenticatedUser(req);

    const body = GenerateReviewSchema.parse(req.body);

    const review = await CodingService.generateReview(body);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const generateHints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getAuthenticatedUser(req);

    const body = GenerateHintsSchema.parse(req.body);

    const hints = await CodingService.generateHints(body);

    res.status(200).json({
      success: true,
      data: hints,
    });
  } catch (error) {
    next(error);
  }
};

export const codingChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getAuthenticatedUser(req);

    const body = CodingChatSchema.parse(req.body);

    const reply = await CodingService.sendChatMessage(body);

    res.status(200).json({
      success: true,
      data: reply,
    });
  } catch (error) {
    next(error);
  }
};