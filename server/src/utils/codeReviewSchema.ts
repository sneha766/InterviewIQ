import { z } from "zod";

export const CodeReviewSchema = z.object({
  score: z.number(),
  readability: z.number(),
  maintainability: z.number(),
  bugs: z.number(),

  complexity: z.string(),
  spaceComplexity: z.string(),
  security: z.string(),

  strengths: z.array(z.string()),
  improvements: z.array(z.string()),

  recommendations: z.array(
    z.object({
      type: z.enum(["success", "warning", "info"]),
      title: z.string(),
      description: z.string(),
    })
  ),
});

export type CodeReview = z.infer<typeof CodeReviewSchema>;
