import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { getOrCreateUsage } from "../utils/usage";
import * as StripeService from "./stripe.service";
import stripe from "../config/stripe";


export const verifyCheckout = async (
  sessionId: string
) => {
  const session =
    await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) {
    throw new AppError(
      "Checkout session not found.",
      404
    );
  }

  if (session.payment_status !== "paid") {
    throw new AppError(
      "Payment not completed.",
      400
    );
  }

  const clerkId = session.metadata?.clerkId;

  if (!clerkId) {
    throw new AppError(
      "Missing Clerk ID.",
      400
    );
  }

  await prisma.user.update({
    where: {
      clerkId,
    },

    data: {
      plan: "PRO",

      stripeCustomerId:
        session.customer?.toString(),

      subscriptionStatus: "active",
    },
  });

  return {
    success: true,
    message: "Subscription activated.",
  };
};
export async function createCheckout(
  email: string,
  clerkId: string
) {
  return StripeService.createCheckoutSession({
    email,
    clerkId,
  });
}



export const getUsage = async (userId: string) => {
  const [usage, user] = await Promise.all([
    getOrCreateUsage(userId),

    prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        plan: true,
      },
    }),
  ]);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const isPro = user.plan === "PRO";

  return {
    plan: user.plan,

    usage: {
      resumeAnalyses: usage.resumeAnalyses,
      interviews: usage.interviews,
      tailorRequests: usage.tailorRequests,
    },

    limits: {
      resumeAnalyses: isPro ? null : 5,
      interviews: isPro ? null : 3,
      tailorRequests: isPro ? null : 5,
    },

    remaining: {
      resumeAnalyses: isPro
        ? null
        : Math.max(0, 5 - usage.resumeAnalyses),

      interviews: isPro
        ? null
        : Math.max(0, 3 - usage.interviews),

      tailorRequests: isPro
        ? null
        : Math.max(0, 5 - usage.tailorRequests),
    },

    unlimited: isPro,
  };
};