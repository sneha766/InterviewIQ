import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { FileText, Brain, Target, Code2, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

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
  const { user } = useUser();

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
      "Your average ATS score is below 75%. Improve keyword alignment on your resume."
    );
  }

  if (analytics.interview.averageScore < 70) {
    suggestions.push(
      "Practice more technical mock interviews to improve your confidence and evaluation score."
    );
  }

  if (analytics.interview.completed < 3) {
    suggestions.push(
      "Complete more AI interviews to unlock detailed communication feedback."
    );
  }

  if (data.overview.totalResumes < 2) {
    suggestions.push(
      "Upload additional resumes or tailor your resume for specific job descriptions."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Excellent preparation! Maintain your daily coding streak and resume quality."
    );
  }

  const isNewUser =
    data.overview.totalResumes === 0 &&
    analytics.interview.total === 0;

  // Transparent calculation: 40% ATS + 35% Interview + 25% Coding
  const readinessIndex = Math.round(
    0.4 * (data.overview.averageATS || 0) +
    0.35 * (analytics.interview.averageScore || 0) +
    0.25 * (data.codingStats?.acceptanceRate || 0)
  );

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back, {user?.firstName || "Candidate"} 👋
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Here's your central command center for AI interviews, resume optimization, and coding practice.
          </p>
        </div>

        <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md">
          <Link to="/reports">
            View Full Readiness Report <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Upgrade Banner */}
      <UpgradeBanner />

      {/* Readiness Hero Card */}
      <div className="rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/30">
            <Sparkles className="h-3.5 w-3.5" /> SDE Readiness Score
          </div>
          <h2 className="text-xl font-bold text-white">Overall Job Readiness Index</h2>
          <p className="text-xs text-slate-300 max-w-lg">
            Calculated from your live Resume ATS scores, AI Interview feedback, and Coding accuracy.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 px-6 py-3 rounded-2xl border border-slate-800">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-400">{readinessIndex}%</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Overall Readiness</div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {isNewUser && (
        <Card className="p-8 text-center rounded-3xl border shadow-sm space-y-4">
          <h2 className="text-2xl font-bold">Welcome to InterviewIQ 🚀</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Get started by analyzing your first resume, completing an AI interview, or practicing coding algorithms.
          </p>
          <div className="pt-2">
            <QuickActions />
          </div>
        </Card>
      )}

      {/* Statistics Cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Resumes"
          value={String(data.overview.totalResumes)}
          subtitle="Uploaded & Analyzed"
          icon={FileText}
        />

        <StatsCard
          title="Average ATS"
          value={`${data.overview.averageATS}%`}
          subtitle="Overall Quality Score"
          icon={Target}
        />

        <StatsCard
          title="AI Interviews"
          value={String(analytics.interview.total)}
          subtitle={`${analytics.interview.completed} Completed`}
          icon={Brain}
        />

        <StatsCard
          title="Coding Solved"
          value={String(data.codingStats?.problemsSolved ?? 0)}
          subtitle={`${data.codingStats?.acceptanceRate ?? 0}% Accuracy`}
          icon={Code2}
        />
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 lg:grid-cols-2">
        <ResumeTrendChart data={analytics.resumeTrend} />
        <InterviewTrendChart data={analytics.interviewTrend} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <MonthlyActivityChart data={analytics.monthlyActivity} />
        <ScoreDistributionChart data={analytics.scoreDistribution} />
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
        <QuickActions />
      </section>

      {/* Bottom Activity Section */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <RecentResumes resumes={data.recentResumes} />
        <RecentInterviews interviews={data.recentInterviews ?? []} />
        <AISuggestions suggestions={suggestions} />
      </section>
    </motion.div>
  );
}