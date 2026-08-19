import { BarChart3, Trophy, Flame, Target, Percent, Code2, Layers } from "lucide-react";
import { useCodingReports } from "@/hooks/useCoding";
import CodingNav from "@/components/coding/CodingNav";

export default function CodingReports() {
  const reportsQuery = useCodingReports();

  const data = reportsQuery.data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <CodingNav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-500" />
            Coding Analytics & Performance Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real database performance statistics, language usage, topic mastery, and problem-solving streak.
          </p>
        </div>

        {reportsQuery.isPending ? (
          <div className="p-12 text-center text-slate-400">Loading analytics data...</div>
        ) : !data || data.totalSubmissions === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-16 text-center text-slate-400 flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">No Coding Activity Yet</h3>
            <p className="text-sm max-w-md">
              Start solving problems in the Coding workspace to generate live accuracy trends, language metrics, and topic mastery charts.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Problems Solved</span>
                  <Trophy className="h-5 w-5 text-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {data.problemsSolved} <span className="text-xs font-normal text-slate-400">/ {data.totalProblemsAttempted} attempted</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Acceptance Rate</span>
                  <Percent className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">
                  {data.acceptanceRate}%
                </div>
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Streak</span>
                  <Flame className="h-5 w-5 text-rose-500" />
                </div>
                <div className="text-3xl font-extrabold text-rose-400">
                  {data.streak} <span className="text-xs font-normal text-slate-400">days</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Submissions</span>
                  <Target className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-3xl font-extrabold text-blue-400">
                  {data.totalSubmissions}
                </div>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Breakdown */}
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-lg">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-400" />
                  Difficulty Solved
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span className="text-emerald-400">Easy</span>
                      <span>{data.difficultySolved.easy} solved</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{
                          width: `${Math.min(100, (data.difficultySolved.easy / Math.max(1, data.problemsSolved)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span className="text-amber-400">Medium</span>
                      <span>{data.difficultySolved.medium} solved</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500"
                        style={{
                          width: `${Math.min(100, (data.difficultySolved.medium / Math.max(1, data.problemsSolved)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span className="text-rose-400">Hard</span>
                      <span>{data.difficultySolved.hard} solved</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-rose-500"
                        style={{
                          width: `${Math.min(100, (data.difficultySolved.hard / Math.max(1, data.problemsSolved)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Distribution */}
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-lg">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-blue-400" />
                  Language Usage Breakdown
                </h3>
                <div className="space-y-3">
                  {data.languageUsage.map((item) => (
                    <div key={item.language}>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <span className="uppercase font-mono text-blue-400">{item.language}</span>
                        <span>{item.count} submissions</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${Math.min(100, (item.count / data.totalSubmissions) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Performance */}
            {data.topicPerformance.length > 0 && (
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-lg">
                <h3 className="text-lg font-bold text-white">Topic Mastery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {data.topicPerformance.map((tp) => (
                    <div
                      key={tp.topic}
                      className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-slate-300">{tp.topic}</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {tp.solved} solved
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
