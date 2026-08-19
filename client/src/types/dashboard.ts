export interface RecentResume {
  id: string;
  fileName: string;
  overallScore: number;
  createdAt: string;
}

export interface RecentInterview {
  id: string;
  role: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  score: number | null;
  completed: boolean;
  createdAt: string;
}

export interface DashboardOverview {
  totalResumes: number;
  totalInterviews: number;
  averageATS: number;
  averageInterviewScore: number;
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
  codingStats?: DashboardCodingStats;
}