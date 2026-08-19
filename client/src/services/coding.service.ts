import api from "@/lib/axios";

/* ===========================
   Types
=========================== */

export interface RunCodePayload {
  language: string;
  code: string;
  input?: string;
}

export interface SubmitCodePayload {
  problemId: string;
  language: string;
  code: string;
  input?: string;
}

export interface RunCodeResult {
  stdout: string;
  stderr: string;
  compileOutput: string;
  executionTime: string;
  memory: string;
  status: "idle" | "success" | "error";
  verdictStatus?: string;
}

export type CodingDifficulty = "Easy" | "Medium" | "Hard";

export interface CodingExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: CodingDifficulty;
  acceptanceRate: number;
  description: string;
  examples: CodingExample[];
  constraints: string[];
  hints: string[];
  tags: string[];
  starterCode?: Record<string, string>;
  testCases?: Array<{ id: string; input: string; expectedOutput: string }>;
}

export interface CodingSubmission {
  id: string;
  status: string;
  runtime: string;
  memory: string;
  language: string;
  createdAt: string;

  stdout?: string;
  stderr?: string;
  compileOutput?: string;
  code?: string;

  problem: {
    id: string;
    title: string;
    slug: string;
    difficulty: CodingDifficulty;
  };
}

export interface CodingReportsResult {
  totalProblemsAttempted: number;
  problemsSolved: number;
  problemsFailed: number;
  acceptanceRate: number;
  totalSubmissions: number;
  streak: number;
  difficultySolved: {
    easy: number;
    medium: number;
    hard: number;
  };
  languageUsage: Array<{ language: string; count: number }>;
  topicPerformance: Array<{ topic: string; solved: number }>;
  recentSubmissions: Array<{
    id: string;
    problemId: string;
    language: string;
    status: string;
    runtime: string;
    memory: string;
    createdAt: string;
  }>;
}

/* ===========================
   Problems
=========================== */

export async function getProblems() {
  const { data } = await api.get("/coding/problems");
  return data.data as CodingProblem[];
}

export async function getProblem(slug: string) {
  const { data } = await api.get(`/coding/problems/${slug}`);
  return data.data as CodingProblem;
}

/* ===========================
   Run
=========================== */

export async function runCode(
  payload: RunCodePayload
): Promise<RunCodeResult> {
  const { data } = await api.post("/coding/run", payload);
  return data.data;
}

/* ===========================
   Submit
=========================== */

export async function submitCode(
  payload: SubmitCodePayload
) {
  const { data } = await api.post(
    "/coding/submit",
    payload
  );

  return data.data;
}

/* ===========================
   History
=========================== */

export async function getSubmissionHistory() {
  const { data } = await api.get(
    "/coding/history"
  );

  return data.data as CodingSubmission[];
}

export async function getSubmission(id: string) {
  const { data } = await api.get(
    `/coding/submission/${id}`
  );

  return data.data as CodingSubmission;
}

/* ===========================
   Reports
=========================== */

export async function getCodingReports() {
  const { data } = await api.get("/coding/reports");
  return data.data as CodingReportsResult;
}

/* ===========================
   AI
=========================== */

export interface CodeReviewRecommendation {
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}

export interface CodeReviewResult {
  score: number;
  readability: number;
  maintainability: number;
  bugs: number;
  complexity: string;
  spaceComplexity: string;
  security: string;
  strengths: string[];
  improvements: string[];
  recommendations: CodeReviewRecommendation[];
}

export interface GenerateReviewPayload {
  language: string;
  code: string;
  problemId?: string;
}

export interface GenerateHintsPayload {
  problemId: string;
  code?: string;
}

export interface CodingChatPayload {
  problemId?: string;
  language: string;
  code: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function generateReview(
  payload: GenerateReviewPayload
) {
  const { data } = await api.post(
    "/coding/review",
    payload
  );

  return data.data as CodeReviewResult;
}

export async function generateHints(
  payload: GenerateHintsPayload
) {
  const { data } = await api.post(
    "/coding/hints",
    payload
  );

  return data.data as { hints: string[] };
}

export async function sendCodingChat(
  payload: CodingChatPayload
) {
  const { data } = await api.post(
    "/coding/chat",
    payload
  );

  return data.data as { role: "assistant"; content: string };
}