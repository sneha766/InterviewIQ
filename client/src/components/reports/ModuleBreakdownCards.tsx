import { FileText, Brain, Code2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { AnalyticsResponse } from "@/types/analytics";
import type { CodingReportsResult } from "@/services/coding.service";

interface ModuleBreakdownCardsProps {
  analytics: AnalyticsResponse;
  coding: CodingReportsResult;
}

export default function ModuleBreakdownCards({
  analytics,
  coding,
}: ModuleBreakdownCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Resume Module Card */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            Resume Performance
          </div>
          <Link
            to="/resume"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Manage <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Average ATS Score</span>
            <span className="font-extrabold text-slate-900">{analytics.resume.averageScore}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Highest Score Recorded</span>
            <span className="font-extrabold text-emerald-600">{analytics.resume.highestScore}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Resumes Analyzed</span>
            <span className="font-bold text-slate-900">{analytics.resume.total}</span>
          </div>
        </div>
      </div>

      {/* Interview Module Card */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
              <Brain className="h-5 w-5" />
            </div>
            Interview Performance
          </div>
          <Link
            to="/interview"
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            Practice <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Average Interview Score</span>
            <span className="font-extrabold text-slate-900">{analytics.interview.averageScore}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Best Interview Score</span>
            <span className="font-extrabold text-purple-600">{analytics.interview.highestScore}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Interviews Completed</span>
            <span className="font-bold text-slate-900">{analytics.interview.completed}</span>
          </div>
        </div>
      </div>

      {/* Coding Module Card */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
              <Code2 className="h-5 w-5" />
            </div>
            Coding Performance
          </div>
          <Link
            to="/coding"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Solve <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Problems Solved</span>
            <span className="font-extrabold text-emerald-600">{coding.problemsSolved}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Acceptance Accuracy</span>
            <span className="font-extrabold text-slate-900">{coding.acceptanceRate}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Active Streak</span>
            <span className="font-bold text-rose-500">{coding.streak} Days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
