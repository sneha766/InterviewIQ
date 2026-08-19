import { ShieldCheck, FileText, Brain, Code2 } from "lucide-react";

interface GlobalReadinessCardProps {
  avgAts: number;
  avgInterview: number;
  codingAcceptance: number;
  totalActivities: number;
}

export default function GlobalReadinessCard({
  avgAts,
  avgInterview,
  codingAcceptance,
  totalActivities: _totalActivities,
}: GlobalReadinessCardProps) {
  // Transparent Job Readiness Index Calculation:
  // 40% ATS Score + 35% Interview Score + 25% Coding Acceptance Rate
  const readinessIndex = Math.round(
    0.4 * (avgAts || 0) +
    0.35 * (avgInterview || 0) +
    0.25 * (codingAcceptance || 0)
  );

  const getBadgeColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (score >= 70) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-rose-500/10 text-rose-400 border-rose-500/20";
  };

  const getStatusText = (score: number) => {
    if (score >= 85) return "Interview Ready — High Hiring Probability";
    if (score >= 70) return "Moderate Readiness — Focus on Weak Topics";
    return "Developing Readiness — Practice Recommended";
  };

  return (
    <div className="rounded-3xl border bg-slate-900 border-slate-800 p-8 text-white shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/30">
            <ShieldCheck className="h-3.5 w-3.5" /> SDE Job Readiness Index
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Overall Performance Rating</h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Calculated transparently using weighted metrics: 40% ATS Resume Score, 35% AI Interview Performance, and 25% Coding Solution Acceptance.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-slate-950 p-6 rounded-2xl border border-slate-800 shrink-0 min-w-[180px]">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Readiness Score</span>
          <div className="text-5xl font-black text-blue-400 mt-1">{readinessIndex}%</div>
          <span className={`mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getBadgeColor(readinessIndex)}`}>
            {getStatusText(readinessIndex).split(" — ")[0]}
          </span>
        </div>
      </div>

      {/* Breakdown Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-blue-400" /> Resume ATS (40%)</span>
            <span className="font-bold text-white">{avgAts}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${avgAts}%` }} />
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Brain className="h-3.5 w-3.5 text-purple-400" /> AI Interview (35%)</span>
            <span className="font-bold text-white">{avgInterview}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-purple-500" style={{ width: `${avgInterview}%` }} />
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5 text-emerald-400" /> Coding Accuracy (25%)</span>
            <span className="font-bold text-white">{codingAcceptance}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${codingAcceptance}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
