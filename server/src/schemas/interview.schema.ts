import { z } from "zod";

export const CreateInterviewSchema = z.object({
  type: z.enum(["HR", "TECHNICAL", "CODING"]),

  role: z
    .string()
    .trim()
    .min(2)
    .max(100),

  difficulty: z.enum([
    "EASY",
    "MEDIUM",
    "HARD",
  ]),
});

export const SubmitInterviewSchema = z.object({
  answers: z
    .array(
      z.object({
        question: z.string(),

        answer: z.string().min(1),
      })
    )
    .min(1),
});

export type CreateInterviewInput =
  z.infer<typeof CreateInterviewSchema>;

export type SubmitInterviewInput =
  z.infer<typeof SubmitInterviewSchema>;