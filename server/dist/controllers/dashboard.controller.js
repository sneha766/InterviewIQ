"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@clerk/express");
const dashboard_service_1 = __importDefault(require("../services/dashboard.service"));
const AppError_1 = __importDefault(require("../utils/AppError"));
class DashboardController {
    async getDashboard(req, res, next) {
        try {
            const { userId } = (0, express_1.getAuth)(req);
            if (!userId) {
                throw new AppError_1.default("Authentication required.", 401);
            }
            const dashboard = await dashboard_service_1.default.getDashboard(userId);
            return res.status(200).json({
                success: true,
                message: "Dashboard fetched successfully.",
                data: dashboard,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new DashboardController();
