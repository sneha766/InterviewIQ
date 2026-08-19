export interface DashboardOverview {
  totalResumes: number;
  averageATS: number;
  highestATS: number;
  lowestATS: number;
  latestATS: number;
}

export interface RecentResume {
  id: string;
  fileName: string;
  overallScore: number;
  createdAt: Date;
}

export interface RecentInterview {
  id: string;
  role: string;
  type: string;
  difficulty: string;
  score: number | null;
  completed: boolean;
  createdAt: Date;
}

export interface ScoreDistribution {
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

export interface DashboardCodingStats {
  problemsSolved: number;
  acceptanceRate: number;
  streak: number;
}

export interface DashboardResponse {
  overview: DashboardOverview;
  recentResumes: RecentResume[];
  recentInterviews: RecentInterview[];
  scoreDistribution: ScoreDistribution;
  codingStats?: DashboardCodingStats;
}