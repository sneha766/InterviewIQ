import { Trophy, CheckCircle2, AlertTriangle, Lightbulb, ArrowLeft, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Interview } from "@/services/interview.service";

interface InterviewResultProps {
  interview: Interview;
  onBack: () => void;
}

export default function InterviewResult({ interview, onBack }: InterviewResultProps) {
  const fb = interview.feedback || {
    overallScore: interview.score || 0,
    communication: 0,
    technicalKnowledge: 0,
    problemSolving: 0,
    strengths: [],
    weaknesses: [],
    recommendations: [],
  };

  const overallScore = fb.overallScore || interview.score || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Interview Dashboard
      </Button>

      {/* Hero Score Header */}
      <div className="rounded-3xl border bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/20">
            <CheckCircle2 className="h-3.5 w-3.5" /> Interview Completed
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{interview.role}</h1>
          <p className="text-sm text-slate-300">
            {interview.type} Interview · {interview.difficulty} Level Evaluation
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shrink-0">
          <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">Overall Score</span>
          <div className="text-5xl font-black text-emerald-400 mt-1">{overallScore}%</div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {fb.communication > 0 && (
          <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-bold uppercase">
              <span>Communication</span>
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{fb.communication}%</div>
          </div>
        )}

        {fb.technicalKnowledge > 0 && (
          <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-bold uppercase">
              <span>Technical Knowledge</span>
              <Award className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{fb.technicalKnowledge}%</div>
          </div>
        )}

        {fb.problemSolving > 0 && (
          <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-bold uppercase">
              <span>Problem Solving</span>
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{fb.problemSolving}%</div>
          </div>
        )}
      </div>

      {/* Detailed Feedback Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        {fb.strengths && fb.strengths.length > 0 && (
          <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-emerald-600 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Key Strengths
            </h3>
            <ul className="space-y-2">
              {fb.strengths.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-700 bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {fb.weaknesses && fb.weaknesses.length > 0 && (
          <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-rose-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Areas to Improve
            </h3>
            <ul className="space-y-2">
              {fb.weaknesses.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-700 bg-rose-50/60 border border-rose-100 p-3 rounded-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {fb.recommendations && fb.recommendations.length > 0 && (
        <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-amber-600 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" /> AI Actionable Recommendations
          </h3>
          <div className="space-y-2">
            {fb.recommendations.map((rec, idx) => (
              <div key={idx} className="text-sm text-slate-700 bg-amber-50/60 border border-amber-100 p-3.5 rounded-xl">
                {rec}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
