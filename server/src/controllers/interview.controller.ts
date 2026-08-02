import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as InterviewService from "../services/interview.service";

import {
  CreateInterviewSchema,
  SubmitInterviewSchema,
} from "../schemas/interview.schema";

export const createInterview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const body =
      CreateInterviewSchema.parse(req.body);

    const interview =
      await InterviewService.createInterview(
        req.user!.id,
        body
      );

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
  next: NextFunction
) => {

  try {

    const body =
      SubmitInterviewSchema.parse(req.body);

    const interview =
      await InterviewService.submitInterview(

        req.params.id as string,

        req.user!.id,

        body

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
  next: NextFunction
) => {

  try {

    const interviews =
      await InterviewService.getInterviewHistory(
        req.user!.id
      );

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
  next: NextFunction
) => {

  try {

    const interview =
      await InterviewService.getInterviewById(

        req.params.id as string,

        req.user!.id

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
  next: NextFunction
) => {

  try {

    const result =
      await InterviewService.deleteInterview(

        req.params.id as string,

        req.user!.id

      );

    res.json(result);

  } catch (err) {

    next(err);

  }

};