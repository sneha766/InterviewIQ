import { ResumeHistoryQuery } from "../schemas/resumeHistory";

export interface AnalyzeResumeInput {
  userId: string;
  file: Express.Multer.File;
}

export interface ResumeHistoryInput {
  userId: string;
  query: ResumeHistoryQuery;
}