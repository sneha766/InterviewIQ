"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.get("/", (0, express_2.requireAuth)(), analytics_controller_1.getAnalytics);
exports.default = router;
