"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_service_1 = __importDefault(require("../services/dashboard.service"));
class DashboardController {
    async getDashboard(req, res, next) {
        try {
            const dashboard = await dashboard_service_1.default.getDashboard(req.user.id);
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
