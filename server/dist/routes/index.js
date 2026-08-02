"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resume_routes_1 = __importDefault(require("./resume.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "InterviewIQ API v1",
    });
});
router.use("/auth", auth_routes_1.default);
router.use("/resume", resume_routes_1.default);
router.use("/dashboard", dashboard_routes_1.default);
exports.default = router;
