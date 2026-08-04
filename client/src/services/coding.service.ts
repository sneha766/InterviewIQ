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
}

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  acceptanceRate: number;
  description: string;
  examples: any[];
  constraints: string[];
  hints: string[];
  tags: string[];
  starterCode?: Record<string, string>;
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
    difficulty: string;
  };
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
   AI
=========================== */

export async function generateReview(
  code: string
) {
  const { data } = await api.post(
    "/coding/review",
    {
      code,
    }
  );

  return data.data;
}

export async function generateHints(
  problemId: string
) {
  const { data } = await api.post(
    "/coding/hints",
    {
      problemId,
    }
  );

  return data.data;
}