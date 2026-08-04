import prisma from "../lib/prisma";
import { executeCode } from "../utils/executor";
import AppError from "../utils/AppError";

interface RunCodeInput {
  userId: string;
  language: string;
  code: string;
  input?: string;
}

interface SubmitCodeInput extends RunCodeInput {
  problemId: string;
}

async function execute({
  language,
  code,
  input,
}: RunCodeInput) {
  return executeCode(language, code, input);
}

/* ===========================================
   Problems
=========================================== */

export async function getProblems() {
  return prisma.codingProblem.findMany({
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

export async function getProblemBySlug(slug: string) {
  const problem = await prisma.codingProblem.findUnique({
    where: {
      slug,
    },
  });

  if (!problem) {
    throw new AppError("Problem not found.", 404);
  }

  return problem;
}

/* ===========================================
   Run Code
=========================================== */

export async function runCode({
  language,
  code,
  input,
}: RunCodeInput) {
  return execute({
    userId: "",
    language,
    code,
    input,
  });
}

/* ===========================================
   Submit Code
=========================================== */

export async function submitCode({
  userId,
  problemId,
  language,
  code,
  input,
}: SubmitCodeInput) {
  const problem = await prisma.codingProblem.findUnique({
    where: {
      id: problemId,
    },
  });

  if (!problem) {
    throw new AppError("Problem not found.", 404);
  }

  const result = await execute({
    userId,
    language,
    code,
    input,
  });

  const submission = await prisma.codingSubmission.create({
    data: {
      userId,
      problemId,
      language,
      code,
      stdout: result.stdout,
      stderr: result.stderr,
      compileOutput: result.compileOutput,
      runtime: result.executionTime,
      memory: result.memory,
      status: result.status,
    },
  });

  return {
    submissionId: submission.id,
    ...result,
  };
}

/* ===========================================
   Submission History
=========================================== */

export async function getSubmissionHistory(
  userId: string
) {
  return prisma.codingSubmission.findMany({
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

export async function getSubmission(
  id: string,
  userId: string
) {
  const submission =
    await prisma.codingSubmission.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        problem: true,
      },
    });

  if (!submission) {
    throw new AppError(
      "Submission not found.",
      404
    );
  }

  return submission;
}