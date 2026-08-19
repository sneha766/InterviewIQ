import { useState, useEffect } from "react";
import { Brain, Clock, ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Interview } from "@/services/interview.service";

interface LiveInterviewProps {
  interview: Interview;
  onSubmit: (answers: Array<{ question: string; answer: string }>) => void;
  isSubmitting: boolean;
}

export default function LiveInterview({
  interview,
  onSubmit,
  isSubmitting,
}: LiveInterviewProps) {
  const questions = interview.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<number, string>>({});
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentQ = questions[currentIndex] || { question: "" };
  const currentAnswer = answersMap[currentIndex] || "";

  const handleAnswerChange = (val: string) => {
    setAnswersMap((prev) => ({ ...prev, [currentIndex]: val }));
  };

  const handleFinish = () => {
    const payloadAnswers = questions.map((q, idx) => ({
      question: typeof q === "string" ? q : q.question,
      answer: answersMap[idx] || "(No answer provided)",
    }));

    onSubmit(payloadAnswers);
  };

  if (isSubmitting) {
    return (
      <div className="max-w-xl mx-auto my-16 p-12 rounded-3xl border bg-white text-center space-y-6 shadow-xl">
        <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Evaluating Your Interview...</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Our AI is analyzing your responses for technical accuracy, communication clarity, problem-solving, and key strengths.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Workspace Header Bar */}
      <div className="flex items-center justify-between rounded-2xl border bg-slate-900 px-6 py-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2 text-white font-bold">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold">{interview.role}</h2>
            <p className="text-xs text-slate-400">
              {interview.type} Interview · {interview.difficulty}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-sm font-mono text-blue-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
            <Clock className="h-4 w-4 text-blue-400" />
            {formatTimer(seconds)}
          </div>

          <div className="text-xs font-medium text-slate-400">
            Question <span className="text-white font-bold">{currentIndex + 1}</span> of{" "}
            <span className="text-white font-bold">{questions.length}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main Question & Answer Panel */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm space-y-6">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Interviewer Question #{currentIndex + 1}
          </span>
          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {typeof currentQ === "string" ? currentQ : currentQ.question}
          </h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Your Response
          </label>
          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your structured answer here. Speak clearly about your thought process, examples, and technical choices..."
            rows={8}
            className="w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="rounded-xl"
          >
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Previous
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-6"
            >
              Next Question <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-6 shadow-md"
            >
              <Send className="mr-2 h-4 w-4" /> Submit Interview
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
