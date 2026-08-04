import { NextFunction, Request, Response } from "express";

import * as CodingService from "../services/coding.service";

import { getAuthenticatedUser } from "../utils/auth";
import {
  RunCodeSchema,
  SubmitCodeSchema,
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
      req.params.slug
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
        req.params.id,
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