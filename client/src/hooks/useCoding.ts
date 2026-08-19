import { useMutation, useQuery } from "@tanstack/react-query";

import {
  runCode,
  submitCode,
  getProblem,
  getProblems,
  getSubmission,
  getSubmissionHistory,
  getCodingReports,
  generateReview,
  generateHints,
} from "@/services/coding.service";

import type {
  RunCodePayload,
  SubmitCodePayload,
  GenerateReviewPayload,
  GenerateHintsPayload,
} from "@/services/coding.service";

/* ============================
   Queries
============================ */

export function useProblems() {
  return useQuery({
    queryKey: ["coding-problems"],
    queryFn: getProblems,
  });
}

export function useProblem(problemId: string) {
  return useQuery({
    queryKey: ["coding-problem", problemId],
    queryFn: () => getProblem(problemId),
    enabled: !!problemId,
  });
}

export function useSubmissionHistory() {
  return useQuery({
    queryKey: ["coding-history"],
    queryFn: getSubmissionHistory,
  });
}

export function useSubmission(id: string) {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: () => getSubmission(id),
    enabled: !!id,
  });
}

export function useCodingReports() {
  return useQuery({
    queryKey: ["coding-reports"],
    queryFn: getCodingReports,
  });
}

/* ============================
   Mutations
============================ */

export function useRunCode() {
  return useMutation({
    mutationFn: (payload: RunCodePayload) => runCode(payload),
  });
}

export function useSubmitCode() {
  return useMutation({
    mutationFn: (payload: SubmitCodePayload) => submitCode(payload),
  });
}

export function useGenerateReview() {
  return useMutation({
    mutationFn: (payload: GenerateReviewPayload) => generateReview(payload),
  });
}

export function useGenerateHints() {
  return useMutation({
    mutationFn: (payload: GenerateHintsPayload) => generateHints(payload),
  });
}