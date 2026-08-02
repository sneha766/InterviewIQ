import { Request, Response } from "express";

import * as AuthService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response
) => {

  const result =
    await AuthService.register(req.body);

  res.status(201).json(result);
};
export const login = async (
  req: Request,
  res: Response
) => {

  const result =
    await AuthService.login(req.body);

  res.status(200).json(result);
};
