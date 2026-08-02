import { z } from "zod";

export const ResumeAnalysisSchema = z.object({
  overallScore: z.number(),

  summary: z.string(),

  sectionScores: z.object({
    contactInfo: z.number(),
    summary: z.number(),
    skills: z.number(),
    experience: z.number(),
    projects: z.number(),
    education: z.number(),
    certifications: z.number(),
  }),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  missingKeywords: z.array(z.string()),

  technicalSkills: z.array(z.string()),

  softSkills: z.array(z.string()),

  projects: z.array(
    z.object({
      name: z.string(),
      feedback: z.string(),
    })
  ),

  experience: z.array(
    z.object({
      company: z.string(),
      feedback: z.string(),
    })
  ),

  atsIssues: z.array(z.string()),

  formattingSuggestions: z.array(z.string()),

  improvementSuggestions: z.array(z.string()),

  finalVerdict: z.string(),
});

export type ResumeAnalysis = z.infer<typeof ResumeAnalysisSchema>;