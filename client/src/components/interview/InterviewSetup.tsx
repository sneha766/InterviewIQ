import { useState } from "react";
import { Brain, Sparkles, Loader2, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { InterviewType, InterviewDifficulty } from "@/services/interview.service";

interface InterviewSetupProps {
  onBack: () => void;
  onSubmit: (config: { role: string; type: InterviewType; difficulty: InterviewDifficulty }) => void;
  isLoading: boolean;
}

export default function InterviewSetup({
  onBack,
  onSubmit,
  isLoading,
}: InterviewSetupProps) {
  const [role, setRole] = useState("Full Stack Software Engineer");
  const [type, setType] = useState<InterviewType>("TECHNICAL");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>("MEDIUM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;
    onSubmit({ role: role.trim(), type, difficulty });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="rounded-3xl border bg-white p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Configure AI Mock Interview</h2>
            <p className="text-sm text-slate-500">
              Customize your interview parameters. Gemini AI will generate realistic interview questions.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Target Role / Position</label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Frontend Developer, Systems Engineer..."
              className="rounded-xl border-slate-200 p-3"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Interview Type</label>
              <Select value={type} onValueChange={(val) => setType(val as InterviewType)}>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TECHNICAL">Technical Interview</SelectItem>
                  <SelectItem value="HR">Behavioral / HR</SelectItem>
                  <SelectItem value="CODING">Coding Algorithms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Difficulty Level</label>
              <Select value={difficulty} onValueChange={(val) => setDifficulty(val as InterviewDifficulty)}>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 flex items-start gap-3 border border-slate-100">
            <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">AI Questions & Evaluation</span>
              Questions will be generated dynamically based on your chosen role. You can type your responses during the live interview session.
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !role.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-2xl shadow-lg shadow-blue-500/10 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Start Live Interview
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}