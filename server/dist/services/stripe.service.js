"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = createCheckoutSession;
exports.verifyCheckoutSession = verifyCheckoutSession;
const stripe_1 = __importDefault(require("../config/stripe"));
async function createCheckoutSession({ email, clerkId, }) {
    const session = await stripe_1.default.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
            },
        ],
        metadata: {
            clerkId,
        },
        success_url: `${process.env.CLIENT_URL}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/billing?cancel=true`,
    });
    return session;
}
async function verifyCheckoutSession(sessionId) {
    return stripe_1.default.checkout.sessions.retrieve(sessionId);
}
