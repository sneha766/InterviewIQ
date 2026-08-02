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

export interface ResumeAnalytics {
  total: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
}

export interface InterviewAnalytics {
  total: number;
  completed: number;
  averageScore: number;
  highestScore: number;
}

export interface AnalyticsResponse {
  resume: ResumeAnalytics;
  interview: InterviewAnalytics;
  resumeTrend: TrendPoint[];
  interviewTrend: TrendPoint[];
  monthlyActivity: MonthlyActivity[];
  scoreDistribution: ScoreDistribution;
}