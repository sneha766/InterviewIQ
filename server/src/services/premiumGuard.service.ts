import prisma from "../lib/prisma";
import AppError from "../utils/AppError";

export async function requirePro(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      plan: true,
    },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.plan !== "PRO") {
    throw new AppError(
      "This feature requires InterviewIQ Pro.",
      403
    );
  }
}