"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resume_routes_1 = __importDefault(require("./resume.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const tailor_routes_1 = __importDefault(require("./tailor.routes"));
const interview_routes_1 = __importDefault(require("./interview.routes"));
const analytics_routes_1 = __importDefault(require("./analytics.routes"));
const billing_routes_1 = __importDefault(require("./billing.routes"));
const coding_routes_1 = __importDefault(require("./coding.routes"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "InterviewIQ API v1",
    });
});
router.use("/resume", resume_routes_1.default);
router.use("/dashboard", dashboard_routes_1.default);
router.use("/tailor", tailor_routes_1.default);
router.use("/interview", interview_routes_1.default);
router.use("/analytics", analytics_routes_1.default);
router.use("/coding", coding_routes_1.default);
router.use("/billing", billing_routes_1.default);
exports.default = router;
