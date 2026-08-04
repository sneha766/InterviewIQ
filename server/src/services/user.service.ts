import { clerkClient } from "@clerk/express";
import prisma from "../lib/prisma";
import AppError from "../utils/AppError";

export async function getOrCreateUser(clerkUserId: string) {
  let user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUserId,
    },
  });

  if (user) {
    return user;
  }

  const clerkUser = await clerkClient.users.getUser(clerkUserId);

  const primaryEmail =
    clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!primaryEmail) {
    throw new AppError("User email not found.", 400);
  }

  user = await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      email: primaryEmail,
      name:
        `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
        null,
      imageUrl: clerkUser.imageUrl,
    },
  });

  return user;
}