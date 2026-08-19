"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coding_controller_1 = require("../controllers/coding.controller");
const router = (0, express_1.Router)();
/* Public */
router.get("/problems", coding_controller_1.getProblems);
router.get("/reports", coding_controller_1.getCodingReports);
router.get("/problems/:slug", coding_controller_1.getProblemBySlug);
/* Protected */
router.post("/run", 
//   requireAuth(),
coding_controller_1.runCode);
router.post("/submit", 
//   requireAuth(),
coding_controller_1.submitCode);
router.get("/history", 
//   requireAuth(),
coding_controller_1.getSubmissionHistory);
router.get("/submission/:id", 
//   requireAuth(),
coding_controller_1.getSubmission);
router.post("/review", 
//   requireAuth(),
coding_controller_1.generateReview);
router.post("/hints", 
//   requireAuth(),
coding_controller_1.generateHints);
router.post("/chat", 
//   requireAuth(),
coding_controller_1.codingChat);
exports.default = router;
