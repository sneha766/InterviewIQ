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
exports.getUsage = exports.createCheckout = exports.verifyCheckoutSession = exports.createCheckoutSession = void 0;
const express_1 = require("@clerk/express");
const AppError_1 = __importDefault(require("../utils/AppError"));
const BillingService = __importStar(require("../services/billing.services"));
const user_service_1 = require("../services/user.service");
const StripeService = __importStar(require("../services/stripe.service"));
const createCheckoutSession = async (req, res, next) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            throw new AppError_1.default("Unauthorized", 401);
        const user = await (0, user_service_1.getOrCreateUser)(userId);
        const session = await BillingService.createCheckout(user.email, user.clerkId);
        res.json({
            success: true,
            url: session.url,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createCheckoutSession = createCheckoutSession;
const verifyCheckoutSession = async (req, res, next) => {
    try {
        const sessionId = req.query.session_id;
        if (!sessionId) {
            throw new AppError_1.default("Session ID is required.", 400);
        }
        const result = await BillingService.verifyCheckout(sessionId);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.verifyCheckoutSession = verifyCheckoutSession;
const createCheckout = async (req, res, next) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            throw new AppError_1.default("Unauthorized", 401);
        }
        const user = await (0, user_service_1.getOrCreateUser)(userId);
        const session = await StripeService.createCheckoutSession({
            email: user.email,
            clerkId: user.clerkId,
        });
        res.status(200).json({
            success: true,
            url: session.url,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createCheckout = createCheckout;
const getUsage = async (req, res, next) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            throw new AppError_1.default("Unauthorized", 401);
        }
        const user = await (0, user_service_1.getOrCreateUser)(userId);
        const usage = await BillingService.getUsage(user.id);
        res.status(200).json({
            success: true,
            data: usage,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsage = getUsage;
