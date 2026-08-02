import { z } from "zod";

export const TailorResponseSchema = z.object({
  matchScore: z.number(),

  missingKeywords: z.array(z.string()),

  atsSuggestions: z.array(z.string()),

  tailoredSummary: z.string(),

  tailoredSkills: z.array(z.string()),

  projectSuggestions: z.array(z.string()),

  experienceSuggestions: z.array(z.string()),

  finalResume: z.string(),
});