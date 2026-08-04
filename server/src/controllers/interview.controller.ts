import { Request, Response, NextFunction } from "express";
import { getAuthenticatedUser } from "../utils/auth";
import * as InterviewService from "../services/interview.service";

import {
  CreateInterviewSchema,
  SubmitInterviewSchema,
} from "../schemas/interview.schema";

export const createInterview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = CreateInterviewSchema.parse(req.body);

    const user = await getAuthenticatedUser(req);

    const interview = await InterviewService.createInterview(user.id, body);

    res.status(201).json({
      success: true,

      data: interview,
    });
  } catch (err) {
    next(err);
  }
};

export const submitInterview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = SubmitInterviewSchema.parse(req.body);

    const user = await getAuthenticatedUser(req);

    const interview = await InterviewService.submitInterview(
      req.params.id as string,
      user.id,
      body,
    );

    res.json({
      success: true,

      data: interview,
    });
  } catch (err) {
    next(err);
  }
};

export const getInterviewHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const interviews = await InterviewService.getInterviewHistory(user.id);
    res.json({
      success: true,

      data: interviews,
    });
  } catch (err) {
    next(err);
  }
};

export const getInterviewById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const interview = await InterviewService.getInterviewById(
      req.params.id as string,
      user.id,
    );

    res.json({
      success: true,

      data: interview,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteInterview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getAuthenticatedUser(req);

    const result = await InterviewService.deleteInterview(
      req.params.id as string,
      user.id,
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};
