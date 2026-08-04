import { motion } from "framer-motion";
import { FileText, Brain, Target, Trophy } from "lucide-react";

import { Card } from "../../components/ui/card";

import StatsCard from "../../components/dashboard/StatsCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentInterviews from "../../components/dashboard/RecentInterviews";
import RecentResumes from "../../components/dashboard/RecentResumes";
import AISuggestions from "../../components/dashboard/AISuggestions";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import UpgradeBanner from "../../components/dashboard/UpgradeBanner";

import ResumeTrendChart from "../../components/dashboard/ResumeTrendChart";
import InterviewTrendChart from "../../components/dashboard/InterviewTrendChart";
import MonthlyActivityChart from "../../components/dashboard/MonthlyActivityChart";
import ScoreDistributionChart from "../../components/dashboard/ScoreDistributionChart";

import { useDashboard } from "../../hooks/useDashboard";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function Dashboard() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboard();

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

  const isNewUser =
    data.overview.totalResumes === 0 &&
    analytics.interview.total === 0;

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}

      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Track your interview preparation,
            resume performance, and AI insights.
          </p>
        </div>
      </section>

      {/* Upgrade Banner */}

      <UpgradeBanner />

      {/* Empty State */}

      {isNewUser && (
        <Card className="p-8 text-center">

          <h2 className="text-2xl font-bold">
            Welcome to InterviewIQ 🚀
          </h2>

          <p className="mt-3 text-muted-foreground">
            Start by uploading your first resume or
            taking your first AI interview.
          </p>

          <div className="mt-8">
            <QuickActions />
          </div>

        </Card>
      )}

      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Resumes"
          value={String(data.overview.totalResumes)}
          subtitle="Uploaded"
          icon={FileText}
        />

        <StatsCard
          title="Average ATS"
          value={`${data.overview.averageATS}%`}
          subtitle="Average Score"
          icon={Target}
        />

        <StatsCard
          title="Interviews"
          value={String(analytics.interview.total)}
          subtitle={`${analytics.interview.completed} Completed`}
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

        <ResumeTrendChart
          data={analytics.resumeTrend}
        />

        <InterviewTrendChart
          data={analytics.interviewTrend}
        />

      </section>

      <section className="grid gap-6 lg:grid-cols-2">

        <MonthlyActivityChart
          data={analytics.monthlyActivity}
        />

        <ScoreDistributionChart
          data={analytics.scoreDistribution}
        />

      </section>

      {/* Quick Actions */}

      <section>

        <h2 className="mb-5 text-2xl font-bold">
          Quick Actions
        </h2>

        <QuickActions />

      </section>

      {/* Bottom Section */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <RecentResumes
          resumes={data.recentResumes}
        />

        <RecentInterviews
          interviews={data.recentInterviews ?? []}
        />

        <AISuggestions
          suggestions={suggestions}
        />

      </section>

    </motion.div>
  );
}