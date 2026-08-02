import { motion } from "framer-motion";
import { FileText, Brain, Target, Trophy } from "lucide-react";

import StatsCard from "../../components/dashboard/StatsCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentInterviews from "../../components/dashboard/RecentInterviews";
import RecentResumes from "../../components/dashboard/RecentResumes";
import AISuggestions from "../../components/dashboard/AISuggestions";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

import ResumeTrendChart from "../../components/dashboard/ResumeTrendChart";
import InterviewTrendChart from "../../components/dashboard/InterviewTrendChart";
import MonthlyActivityChart from "../../components/dashboard/MonthlyActivityChart";
import ScoreDistributionChart from "../../components/dashboard/ScoreDistributionChart";

import { useDashboard } from "../../hooks/useDashboard";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useAuth } from "@clerk/clerk-react";
export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();
  
const { isSignedIn, userId, getToken } = useAuth();

console.log("Signed in:", isSignedIn);
console.log("User ID:", userId);

getToken().then(token => {
  console.log("Token:", token);
});
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useAnalytics();

  if (isLoading || analyticsLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || analyticsError || !data || !analytics) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
        Failed to load dashboard data.
      </div>
    );
  }

  // Dynamic AI Suggestions
  const suggestions: string[] = [];

  if (data.overview.averageATS < 75) {
    suggestions.push(
      "Your average ATS score is below 75%. Improve your resume keywords."
    );
  }

  if (analytics.interview.averageScore < 70) {
    suggestions.push(
      "Practice more technical interviews to improve your interview score."
    );
  }

  if (analytics.interview.completed < 5) {
    suggestions.push(
      "Complete more mock interviews to build confidence."
    );
  }

  if (data.overview.totalResumes < 3) {
    suggestions.push(
      "Upload more resumes to track your ATS improvement."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Excellent progress! Keep practicing consistently."
    );
  }

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Resumes"
          value={String(data.overview.totalResumes)}
          subtitle="Latest"
          icon={FileText}
        />

        <StatsCard
          title="Average ATS"
          value={`${data.overview.averageATS}%`}
          subtitle="Average"
          icon={Target}
        />

        <StatsCard
          title="Interviews"
          value={String(analytics.interview.total)}
          subtitle={`${analytics.interview.completed} completed`}
          icon={Brain}
        />

        <StatsCard
          title="Interview Score"
          value={`${analytics.interview.averageScore}%`}
          subtitle="Average"
          icon={Trophy}
        />
      </section>

      {/* Charts */}

      <section className="grid gap-6 lg:grid-cols-2">
        <ResumeTrendChart data={analytics.resumeTrend} />

        <InterviewTrendChart data={analytics.interviewTrend} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <MonthlyActivityChart data={analytics.monthlyActivity} />

        <ScoreDistributionChart data={analytics.scoreDistribution} />
      </section>

      {/* Quick Actions */}

      <section>
        <h2 className="mb-5 text-2xl font-bold">
          Quick Actions
        </h2>

        <QuickActions />
      </section>

      {/* Bottom Grid */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <RecentResumes resumes={data.recentResumes} />

        {/* Add interview data here once your backend exposes recentInterviews */}
        

        <AISuggestions suggestions={suggestions} />
      </section>
    </motion.div>
  );
}