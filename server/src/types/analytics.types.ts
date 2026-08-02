export interface ResumeOverview {
  total: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
}

export interface InterviewOverview {
  total: number;
  completed: number;
  averageScore: number;
  highestScore: number;
}

export interface TrendPoint {
  date: string;
  score: number;
}

export interface MonthlyActivity {
  month: string;
  resumes: number;
  interviews: number;
}

export interface ScoreDistribution {
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

export interface AnalyticsResponse {
  resume: ResumeOverview;
  interview: InterviewOverview;
  resumeTrend: TrendPoint[];
  interviewTrend: TrendPoint[];
  monthlyActivity: MonthlyActivity[];
  scoreDistribution: ScoreDistribution;
}