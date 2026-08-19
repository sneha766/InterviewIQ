import { z } from "zod";

export const RunCodeSchema = z.object({
  language: z.enum([
    "cpp",
    "java",
    "python",
    "javascript",
    "go",
  ]),
  code: z.string().min(1, "Code is required."),
  input: z.string().optional(),
});

export const SubmitCodeSchema = RunCodeSchema.extend({
  problemId: z.string().min(1, "Problem ID is required."),
});

export const GenerateReviewSchema = z.object({
  language: z.enum([
    "cpp",
    "java",
    "python",
    "javascript",
    "go",
  ]),
  code: z.string().min(1, "Code is required."),
  problemId: z.string().optional(),
});

export const GenerateHintsSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required."),
  code: z.string().optional(),
});

export const CodingChatSchema = z.object({
  problemId: z.string().optional(),
  language: z.string().default("cpp"),
  code: z.string().default(""),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
});

export type RunCodeInput = z.infer<typeof RunCodeSchema>;
export type SubmitCodeInput = z.infer<typeof SubmitCodeSchema>;
export type GenerateReviewInput = z.infer<typeof GenerateReviewSchema>;
export type GenerateHintsInput = z.infer<typeof GenerateHintsSchema>;
export type CodingChatInput = z.infer<typeof CodingChatSchema>;