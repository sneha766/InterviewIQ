"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProblems = getProblems;
exports.getProblemBySlug = getProblemBySlug;
exports.runCode = runCode;
exports.submitCode = submitCode;
exports.getSubmissionHistory = getSubmissionHistory;
exports.getSubmission = getSubmission;
exports.getCodingReports = getCodingReports;
exports.generateReview = generateReview;
exports.generateHints = generateHints;
exports.sendChatMessage = sendChatMessage;
const prisma_1 = __importDefault(require("../lib/prisma"));
const executor_1 = require("../utils/executor");
const AppError_1 = __importDefault(require("../utils/AppError"));
const ai_service_1 = require("./ai.service");
const codeReview_1 = require("../ai/codeReview");
const hintGenerator_1 = require("../ai/hintGenerator");
const codingChat_1 = require("../ai/codingChat");
const codeReviewSchema_1 = require("../utils/codeReviewSchema");
const hintSchema_1 = require("../utils/hintSchema");
function normalizeOutput(str) {
    return str.trim().replace(/\r\n/g, "\n").replace(/\s+/g, " ");
}
/* ===========================================
   Problems
=========================================== */
async function getProblems() {
    return prisma_1.default.codingProblem.findMany({
        orderBy: {
            title: "asc",
        },
        select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            acceptanceRate: true,
            tags: true,
        },
    });
}
async function getProblemBySlug(slug) {
    const problem = await prisma_1.default.codingProblem.findUnique({
        where: {
            slug,
        },
        include: {
            testCases: {
                where: { isHidden: false },
                select: {
                    id: true,
                    input: true,
                    expectedOutput: true,
                },
            },
        },
    });
    if (!problem) {
        throw new AppError_1.default("Problem not found.", 404);
    }
    return problem;
}
/* ===========================================
   Run Code
=========================================== */
async function runCode({ language, code, input = "", }) {
    return (0, executor_1.executeCode)(language, code, input);
}
/* ===========================================
   Submit Code (Real Testcase Judging Engine)
=========================================== */
async function submitCode({ userId, problemId, language, code, }) {
    const problem = await prisma_1.default.codingProblem.findUnique({
        where: { id: problemId },
        include: { testCases: true },
    });
    if (!problem) {
        throw new AppError_1.default("Problem not found.", 404);
    }
    // Gather test cases: stored DB testCases or problem examples fallback
    let testCasesToRun = [];
    if (problem.testCases && problem.testCases.length > 0) {
        testCasesToRun = problem.testCases.map((tc) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
        }));
    }
    else if (Array.isArray(problem.examples)) {
        const examples = problem.examples;
        testCasesToRun = examples.map((ex) => ({
            input: ex.input || "",
            expectedOutput: ex.output || ex.expectedOutput || "",
        }));
    }
    // Fallback default test case if no test cases/examples found
    if (testCasesToRun.length === 0) {
        testCasesToRun.push({ input: "", expectedOutput: "" });
    }
    let passedTests = 0;
    const totalTests = testCasesToRun.length;
    let finalStatus = "Accepted";
    let firstErrorStdout = "";
    let firstErrorStderr = "";
    let firstErrorCompile = "";
    let maxRuntime = "0 ms";
    let maxMemory = "--";
    for (let i = 0; i < testCasesToRun.length; i++) {
        const tc = testCasesToRun[i];
        const execRes = await (0, executor_1.executeCode)(language, code, tc.input);
        if (execRes.verdictStatus === "Compilation Error") {
            finalStatus = "Compilation Error";
            firstErrorCompile = execRes.compileOutput;
            break;
        }
        if (execRes.verdictStatus === "Time Limit Exceeded") {
            finalStatus = "Time Limit Exceeded";
            firstErrorStderr = execRes.stderr;
            break;
        }
        if (execRes.status === "error") {
            finalStatus = execRes.verdictStatus || "Runtime Error";
            firstErrorStderr = execRes.stderr;
            break;
        }
        const normActual = normalizeOutput(execRes.stdout);
        const normExpected = normalizeOutput(tc.expectedOutput);
        if (tc.expectedOutput && normActual !== normExpected) {
            finalStatus = "Wrong Answer";
            firstErrorStdout = execRes.stdout;
            // Continue or break on first failure
            break;
        }
        passedTests++;
        maxRuntime = execRes.executionTime;
        maxMemory = execRes.memory;
    }
    // Record submission in database
    const submission = await prisma_1.default.codingSubmission.create({
        data: {
            userId,
            problemId,
            language,
            code,
            stdout: firstErrorStdout || (passedTests > 0 ? "All tests passed" : ""),
            stderr: firstErrorStderr,
            compileOutput: firstErrorCompile,
            runtime: maxRuntime,
            memory: maxMemory,
            status: finalStatus,
        },
    });
    return {
        submissionId: submission.id,
        status: finalStatus,
        passedTests,
        totalTests,
        runtime: maxRuntime,
        memory: maxMemory,
        stdout: firstErrorStdout,
        stderr: firstErrorStderr,
        compileOutput: firstErrorCompile,
    };
}
/* ===========================================
   Submission History
=========================================== */
async function getSubmissionHistory(userId) {
    return prisma_1.default.codingSubmission.findMany({
        where: {
            userId,
        },
        include: {
            problem: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    difficulty: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
/* ===========================================
   Single Submission
=========================================== */
async function getSubmission(id, userId) {
    const submission = await prisma_1.default.codingSubmission.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            problem: true,
        },
    });
    if (!submission) {
        throw new AppError_1.default("Submission not found.", 404);
    }
    return submission;
}
/* ===========================================
   Coding Reports & Analytics
=========================================== */
async function getCodingReports(userId) {
    const submissions = await prisma_1.default.codingSubmission.findMany({
        where: { userId },
        include: {
            problem: {
                select: {
                    id: true,
                    difficulty: true,
                    tags: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    const totalSubmissions = submissions.length;
    const attemptedProblemIds = new Set();
    const solvedProblemIds = new Set();
    const languageCounts = {};
    const difficultySolvedCount = {
        Easy: 0,
        Medium: 0,
        Hard: 0,
    };
    const topicCounts = {};
    let acceptedCount = 0;
    for (const sub of submissions) {
        attemptedProblemIds.add(sub.problemId);
        languageCounts[sub.language] = (languageCounts[sub.language] || 0) + 1;
        if (sub.status === "Accepted") {
            acceptedCount++;
            if (!solvedProblemIds.has(sub.problemId)) {
                solvedProblemIds.add(sub.problemId);
                const diff = sub.problem.difficulty || "Easy";
                difficultySolvedCount[diff] = (difficultySolvedCount[diff] || 0) + 1;
                if (Array.isArray(sub.problem.tags)) {
                    for (const tag of sub.problem.tags) {
                        topicCounts[tag] = (topicCounts[tag] || 0) + 1;
                    }
                }
            }
        }
    }
    const totalProblemsAttempted = attemptedProblemIds.size;
    const problemsSolved = solvedProblemIds.size;
    const problemsFailed = Math.max(0, totalProblemsAttempted - problemsSolved);
    const acceptanceRate = totalSubmissions > 0
        ? Number(((acceptedCount / totalSubmissions) * 100).toFixed(1))
        : 0;
    // Compute Streak
    const uniqueDates = Array.from(new Set(submissions.map((s) => new Date(s.createdAt).toISOString().split("T")[0]))).sort().reverse();
    let streak = 0;
    if (uniqueDates.length > 0) {
        const todayStr = new Date().toISOString().split("T")[0];
        const yesterdayStr = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];
        if (uniqueDates[0] === todayStr || uniqueDates[0] === yesterdayStr) {
            streak = 1;
            let curr = new Date(uniqueDates[0]);
            for (let i = 1; i < uniqueDates.length; i++) {
                const prev = new Date(uniqueDates[i]);
                const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);
                if (diffDays === 1) {
                    streak++;
                    curr = prev;
                }
                else {
                    break;
                }
            }
        }
    }
    return {
        totalProblemsAttempted,
        problemsSolved,
        problemsFailed,
        acceptanceRate,
        totalSubmissions,
        streak,
        difficultySolved: {
            easy: difficultySolvedCount["Easy"] || 0,
            medium: difficultySolvedCount["Medium"] || 0,
            hard: difficultySolvedCount["Hard"] || 0,
        },
        languageUsage: Object.entries(languageCounts).map(([language, count]) => ({
            language,
            count,
        })),
        topicPerformance: Object.entries(topicCounts).map(([topic, count]) => ({
            topic,
            solved: count,
        })),
        recentSubmissions: submissions.slice(0, 10).map((s) => ({
            id: s.id,
            problemId: s.problemId,
            language: s.language,
            status: s.status,
            runtime: s.runtime,
            memory: s.memory,
            createdAt: s.createdAt,
        })),
    };
}
/* ===========================================
   AI — Code Review
=========================================== */
async function generateReview({ language, code, problemId, }) {
    let problemTitle;
    let problemDescription;
    if (problemId) {
        const problem = await prisma_1.default.codingProblem.findUnique({
            where: { id: problemId },
            select: { title: true, description: true },
        });
        problemTitle = problem?.title;
        problemDescription = problem?.description;
    }
    return (0, ai_service_1.generateStructuredOutput)(() => (0, codeReview_1.reviewCode)({
        language,
        code,
        problemTitle,
        problemDescription,
    }), codeReviewSchema_1.CodeReviewSchema);
}
/* ===========================================
   AI — Hint Generation
=========================================== */
async function generateHints({ problemId, code, }) {
    const problem = await prisma_1.default.codingProblem.findUnique({
        where: { id: problemId },
    });
    if (!problem) {
        throw new AppError_1.default("Problem not found.", 404);
    }
    const existingHints = Array.isArray(problem.hints)
        ? problem.hints
        : [];
    return (0, ai_service_1.generateStructuredOutput)(() => (0, hintGenerator_1.generateHints)({
        title: problem.title,
        description: problem.description,
        existingHints,
        currentCode: code,
    }), hintSchema_1.HintsSchema);
}
/* ===========================================
   AI — Chat
=========================================== */
async function sendChatMessage({ problemId, language, code, messages, }) {
    let problemTitle;
    let problemDescription;
    if (problemId) {
        const problem = await prisma_1.default.codingProblem.findUnique({
            where: { id: problemId },
            select: { title: true, description: true },
        });
        problemTitle = problem?.title;
        problemDescription = problem?.description;
    }
    const reply = await (0, codingChat_1.sendCodingChatMessage)({
        language,
        code,
        problemTitle,
        problemDescription,
        messages,
    });
    return {
        role: "assistant",
        content: reply,
    };
}
