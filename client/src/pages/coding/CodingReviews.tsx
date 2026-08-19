import { useState } from "react";
import { Sparkles, Loader2, Code2 } from "lucide-react";
import { useProblems, useGenerateReview } from "@/hooks/useCoding";
import CodingNav from "@/components/coding/CodingNav";
import CodeReview from "@/components/interview/coding/CodeReview";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function CodingReviews() {
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [language, setLanguage] = useState<string>("cpp");
  const [code, setCode] = useState<string>("");

  const problemsQuery = useProblems();
  const reviewMutation = useGenerateReview();

  const handleSelectProblem = (id: string) => {
    setSelectedProblemId(id);
    const p = problemsQuery.data?.find((item) => item.id === id);
    if (p && p.starterCode && p.starterCode[language]) {
      setCode(p.starterCode[language]);
    }
  };

  const handleRequestReview = () => {
    if (!code.trim()) {
      toast.error("Please enter code before requesting a review.");
      return;
    }

    reviewMutation.mutate(
      {
        language,
        code,
        problemId: selectedProblemId || undefined,
      },
      {
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to generate AI Code Review.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <CodingNav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
              AI Code Reviews
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Get comprehensive senior engineer feedback on readability, maintainability, bug risks, space/time complexity, and security.
            </p>
          </div>
        </div>

        {/* Input Panel */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Select Problem (Optional)
              </label>
              <Select value={selectedProblemId} onValueChange={handleSelectProblem}>
                <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                  <SelectValue placeholder="Choose problem for context" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  {problemsQuery.data?.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title} ({p.difficulty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Programming Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Code to Review
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste or write your code solution here for AI review..."
              rows={10}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 p-4 font-mono text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleRequestReview}
              disabled={reviewMutation.isPending || !code.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              {reviewMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Request AI Code Review
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Review Results */}
        {reviewMutation.data ? (
          <CodeReview
            score={reviewMutation.data.score}
            readability={reviewMutation.data.readability}
            maintainability={reviewMutation.data.maintainability}
            bugs={reviewMutation.data.bugs}
            complexity={reviewMutation.data.complexity}
            spaceComplexity={reviewMutation.data.spaceComplexity}
            security={reviewMutation.data.security}
            strengths={reviewMutation.data.strengths}
            improvements={reviewMutation.data.improvements}
            recommendations={reviewMutation.data.recommendations}
          />
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">No Review Requested Yet</h3>
            <p className="text-sm max-w-md">
              Select a problem or paste your code above and click "Request AI Code Review" to generate real-time feedback.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
