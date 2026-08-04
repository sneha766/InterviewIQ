import stripe from "../config/stripe";

interface CheckoutSessionInput {
  email: string;
  clerkId: string;
}

export async function createCheckoutSession({
  email,
  clerkId,
}: CheckoutSessionInput) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    payment_method_types: ["card"],

    customer_email: email,

    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],

    metadata: {
      clerkId,
    },

    success_url:
      `${process.env.CLIENT_URL}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,

    cancel_url:
      `${process.env.CLIENT_URL}/billing?cancel=true`,
  });

  return session;
}

export async function verifyCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}