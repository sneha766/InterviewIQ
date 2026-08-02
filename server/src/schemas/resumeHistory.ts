import { z } from "zod";

export const ResumeHistoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(50).default(10),

  search: z.string().trim().optional(),

  sortBy: z
    .enum(["createdAt", "overallScore"])
    .default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),

  minScore: z.coerce.number().min(0).max(100).optional(),

  maxScore: z.coerce.number().min(0).max(100).optional(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),
});

export type ResumeHistoryQuery =
  z.infer<typeof ResumeHistoryQuerySchema>;