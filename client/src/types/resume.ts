export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface ResumeHistoryItem {
  id: string;
  fileName: string;
  score: number;
  uploadedAt: string;
}