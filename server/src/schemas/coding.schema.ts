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

export type RunCodeInput = z.infer<typeof RunCodeSchema>;
export type SubmitCodeInput = z.infer<typeof SubmitCodeSchema>;