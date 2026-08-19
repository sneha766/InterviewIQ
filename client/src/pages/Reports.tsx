import { BarChart3, TrendingUp } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useCodingReports } from "@/hooks/useCoding";

import GlobalReadinessCard from "@/components/reports/GlobalReadinessCard";
import ModuleBreakdownCards from "@/components/reports/ModuleBreakdownCards";

import ResumeTrendChart from "@/components/dashboard/ResumeTrendChart";
import InterviewTrendChart from "@/components/dashboard/InterviewTrendChart";
import MonthlyActivityChart from "@/components/dashboard/MonthlyActivityChart";
import ScoreDistributionChart from "@/components/dashboard/ScoreDistributionChart";

export default function Reports() {
  const analyticsQuery = useAnalytics();
  const codingQuery = useCodingReports();

  const isLoading = analyticsQuery.isPending || codingQuery.isPending;
  const isError = analyticsQuery.isError || codingQuery.isError;

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-500 font-medium">
        Generating Global Readiness Reports...
      </div>
    );
  }

  if (isError || !analyticsQuery.data || !codingQuery.data) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-600 text-center font-medium">
        Failed to load global performance reports.
      </div>
    );
  }

  const analytics = analyticsQuery.data;
  const coding = codingQuery.data;

  const totalActivities =
    analytics.resume.total + analytics.interview.total + coding.totalSubmissions;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          Global SDE Readiness Report
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Unified performance analytics consolidating Resume ATS scores, AI Mock Interview ratings, and Coding solution accuracy.
        </p>
      </div>

      {/* Global Readiness Index Hero Card */}
      <GlobalReadinessCard
        avgAts={analytics.resume.averageScore}
        avgInterview={analytics.interview.averageScore}
        codingAcceptance={coding.acceptanceRate}
        totalActivities={totalActivities}
      />

      {/* Module Performance Cards */}
      <ModuleBreakdownCards analytics={analytics} coding={coding} />

      {/* Trend & Distribution Charts */}
      {totalActivities === 0 ? (
        <div className="rounded-3xl border bg-white p-12 text-center text-slate-500 space-y-2">
          <TrendingUp className="h-8 w-8 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-800">Not enough data yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Analyze your resume, complete an AI interview, or submit coding solutions to unlock live historical performance charts.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ResumeTrendChart data={analytics.resumeTrend} />
            <InterviewTrendChart data={analytics.interviewTrend} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <MonthlyActivityChart data={analytics.monthlyActivity} />
            <ScoreDistributionChart data={analytics.scoreDistribution} />
          </div>
        </div>
      )}
    </div>
  );
}
