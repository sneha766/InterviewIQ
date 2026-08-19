"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsage = exports.verifyCheckout = void 0;
exports.createCheckout = createCheckout;
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const usage_1 = require("../utils/usage");
const StripeService = __importStar(require("./stripe.service"));
const stripe_1 = __importDefault(require("../config/stripe"));
const verifyCheckout = async (sessionId) => {
    const session = await stripe_1.default.checkout.sessions.retrieve(sessionId);
    if (!session) {
        throw new AppError_1.default("Checkout session not found.", 404);
    }
    if (session.payment_status !== "paid") {
        throw new AppError_1.default("Payment not completed.", 400);
    }
    const clerkId = session.metadata?.clerkId;
    if (!clerkId) {
        throw new AppError_1.default("Missing Clerk ID.", 400);
    }
    await prisma_1.default.user.update({
        where: {
            clerkId,
        },
        data: {
            plan: "PRO",
            stripeCustomerId: session.customer?.toString(),
            subscriptionStatus: "active",
        },
    });
    return {
        success: true,
        message: "Subscription activated.",
    };
};
exports.verifyCheckout = verifyCheckout;
async function createCheckout(email, clerkId) {
    return StripeService.createCheckoutSession({
        email,
        clerkId,
    });
}
const getUsage = async (userId) => {
    const [usage, user] = await Promise.all([
        (0, usage_1.getOrCreateUsage)(userId),
        prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                plan: true,
            },
        }),
    ]);
    if (!user) {
        throw new AppError_1.default("User not found.", 404);
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
exports.getUsage = getUsage;
