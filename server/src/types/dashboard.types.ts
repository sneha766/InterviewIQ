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

export interface ScoreDistribution {
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

export interface DashboardResponse {
  overview: DashboardOverview;
  recentResumes: RecentResume[];
  scoreDistribution: ScoreDistribution;
}