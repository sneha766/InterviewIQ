import { Request } from "express";
import { getAuth } from "@clerk/express";

import AppError from "./AppError";
import { getOrCreateUser } from "../services/user.service";

export async function getAuthenticatedUser(req: Request) {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  return getOrCreateUser(userId);
}