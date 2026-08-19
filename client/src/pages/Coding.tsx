import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Sparkles, Lightbulb, Loader2 } from "lucide-react";

import CodingLayout from "../components/interview/coding/CodingLayout";
import CodingToolbar from "../components/interview/coding/CodingToolbar";
import CodingProblem from "../components/interview/coding/CodingProblem";
import CodingEditor from "../components/interview/coding/CodingEditor";
import CodingTestCases, {
  type TestCase,
} from "../components/interview/coding/CodingTestCases";
import CodingConsole from "../components/interview/coding/CodingConsole";
import CodeReview from "../components/interview/coding/CodeReview";
import SubmissionHistory from "@/components/interview/coding/SubmissionHistory";

import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import {
  useProblems,
  useProblem,
  useRunCode,
  useSubmitCode,
  useGenerateReview,
  useGenerateHints,
} from "../hooks/useCoding";

/** Normalizes execution output for pass/fail comparison (whitespace-insensitive). */
function normalizeOutput(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

const defaultResult = {
  stdout: "",
  stderr: "",
  compileOutput: "",
  executionTime: "--",
  memory: "--",
  status: "idle" as const,
};

export default function Coding() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [customExpectedOutput, setCustomExpectedOutput] = useState("");
  const [aiHints, setAiHints] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const problemsQuery = useProblems();

  // Select the problem from ?problem=<slug> if present, otherwise the first
  // problem returned by the API. Runs once problems have loaded.
  useEffect(() => {
    if (!problemsQuery.data?.length || selectedSlug) return;

    const requested = searchParams.get("problem");

    const initial =
      (requested &&
        problemsQuery.data.find((p) => p.slug === requested)?.slug) ||
      problemsQuery.data[0].slug;

    setSelectedSlug(initial);
  }, [problemsQuery.data, searchParams, selectedSlug]);

  const problemQuery = useProblem(selectedSlug);

  // Reset the editor to the problem's starter code whenever the problem or
  // language changes.
  useEffect(() => {
    if (!problemQuery.data) return;

    const starter =
      problemQuery.data.starterCode?.[language] ?? "";

    setCode(starter);
  }, [problemQuery.data, language]);

  // Rebuild the test case list and clear AI state whenever the problem changes.
  useEffect(() => {
    if (!problemQuery.data) return;

    setTestCases(
      (problemQuery.data.examples ?? []).map((example, index) => ({
        id: `example-${index}`,
        title: `Example ${index + 1}`,
        input: example.input,
        expectedOutput: example.output,
      }))
    );

    setCustomInput("");
    setCustomExpectedOutput("");
    setAiHints([]);
    reviewMutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemQuery.data]);

  const runMutation = useRunCode();
  const testRunMutation = useRunCode();
  const customRunMutation = useRunCode();
  const submitMutation = useSubmitCode();
  const reviewMutation = useGenerateReview();
  const hintsMutation = useGenerateHints();

  const handleRun = () => {
    runMutation.mutate({ language, code, input: "" });
  };

  const handleRunTest = async (id: string) => {
    const test = testCases.find((t) => t.id === id);
    if (!test) return;

    try {
      const result = await testRunMutation.mutateAsync({
        language,
        code,
        input: test.input,
      });

      const actualOutput =
        result.stdout || result.stderr || result.compileOutput || "";

      const passed =
        result.status === "success"
          ? normalizeOutput(actualOutput) ===
            normalizeOutput(test.expectedOutput)
          : false;

      setTestCases((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                actualOutput,
                passed,
                executionTime: result.executionTime,
              }
            : t
        )
      );
    } catch {
      toast.error("Failed to run this test case.");
    }
  };

  const handleDeleteTest = (id: string) => {
    setTestCases((prev) => prev.filter((t) => t.id !== id));
  };

  const upsertCustomTestCase = (overrides: Partial<TestCase> = {}) => {
    setTestCases((prev) => {
      const existingIndex = prev.findIndex((t) => t.id === "custom-test");

      const entry: TestCase = {
        id: "custom-test",
        title: "Custom Test",
        input: customInput,
        expectedOutput: customExpectedOutput,
        ...overrides,
      };

      if (existingIndex === -1) {
        return [...prev, entry];
      }

      const next = [...prev];
      next[existingIndex] = entry;
      return next;
    });
  };

  const handleAddCustomTest = () => {
    if (!customInput) return;

    upsertCustomTestCase();
    toast.success("Custom test case added.");
  };

  const handleRunCustomTest = async () => {
    if (!customInput) return;

    try {
      const result = await customRunMutation.mutateAsync({
        language,
        code,
        input: customInput,
      });

      const actualOutput =
        result.stdout || result.stderr || result.compileOutput || "";

      const passed = customExpectedOutput
        ? result.status === "success" &&
          normalizeOutput(actualOutput) ===
            normalizeOutput(customExpectedOutput)
        : undefined;

      upsertCustomTestCase({
        actualOutput,
        passed,
        executionTime: result.executionTime,
      });
    } catch {
      toast.error("Failed to run custom test.");
    }
  };

  const handleSubmit = () => {
    if (!problemQuery.data) {
      toast.error("Problem not loaded.");
      return;
    }

    submitMutation.mutate(
      {
        language,
        code,
        problemId: problemQuery.data.id,
      },
      {
        onSuccess: (data) => {
          toast.success(`Solution submitted — ${data.status ?? "Accepted"}.`);

          queryClient.invalidateQueries({
            queryKey: ["coding-history"],
          });

          if (data.submissionId) {
            navigate(`/coding/submissions/${data.submissionId}`);
          }
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ?? "Submission failed."
          );
        },
      }
    );
  };

  const handleGenerateReview = () => {
    if (!problemQuery.data) return;

    reviewMutation.mutate(
      {
        language,
        code,
        problemId: problemQuery.data.id,
      },
      {
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              "Failed to generate AI code review."
          );
        },
      }
    );
  };

  const handleGenerateHints = () => {
    if (!problemQuery.data) return;

    hintsMutation.mutate(
      {
        problemId: problemQuery.data.id,
        code,
      },
      {
        onSuccess: (data) => {
          setAiHints((prev) => [...prev, ...data.hints]);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ?? "Failed to generate a hint."
          );
        },
      }
    );
  };

  const consoleResult = useMemo(
    () => runMutation.data ?? defaultResult,
    [runMutation.data]
  );

  if (problemsQuery.isPending) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
        Loading Coding Workspace...
      </div>
    );
  }

  if (!problemsQuery.data?.length) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
        No coding problems available yet.
      </div>
    );
  }

  return (
    <CodingLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 rounded-3xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Problem</p>
            <h2 className="text-xl font-bold">
              {problemQuery.data?.title ?? "Select a problem"}
            </h2>
          </div>

          <Select
            value={selectedSlug}
            onValueChange={(value) => setSelectedSlug(value)}
          >
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select a problem" />
            </SelectTrigger>
            <SelectContent>
              {problemsQuery.data.map((problem) => (
                <SelectItem key={problem.id} value={problem.slug}>
                  {problem.title} · {problem.difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <CodingToolbar
          language={language}
          remainingSeconds={3600}
          onLanguageChange={setLanguage}
          onRun={handleRun}
          onSubmit={handleSubmit}
          isRunning={runMutation.isPending}
          isSubmitting={submitMutation.isPending}
        />

        {problemQuery.isPending && (
          <div className="rounded-3xl border bg-white p-10 text-center text-muted-foreground shadow-sm">
            Loading problem...
          </div>
        )}

        {problemQuery.data && (
          <>
            <CodingProblem problem={problemQuery.data} />

            {/* AI Hints — generated on demand, separate from the problem's
                built-in stored hints already shown inside CodingProblem. */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-amber-100 p-3">
                    <Lightbulb className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">AI Hint Generator</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a fresh, interview-appropriate nudge without
                      revealing the solution.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleGenerateHints}
                  disabled={hintsMutation.isPending}
                >
                  {hintsMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get a Hint
                    </>
                  )}
                </Button>
              </div>

              {aiHints.length > 0 && (
                <div className="mt-6 space-y-3">
                  {aiHints.map((hint, index) => (
                    <div
                      key={`${index}-${hint.slice(0, 20)}`}
                      className="rounded-2xl border bg-amber-50 p-4 text-sm leading-6 text-muted-foreground"
                    >
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <CodingEditor language={language} code={code} onChange={setCode} />

            <CodingTestCases
              testCases={testCases}
              onRunTest={handleRunTest}
              onAddTest={handleAddCustomTest}
              onDeleteTest={handleDeleteTest}
              customInput={customInput}
              customExpectedOutput={customExpectedOutput}
              onCustomInputChange={setCustomInput}
              onCustomExpectedOutputChange={setCustomExpectedOutput}
              onRunCustomTest={handleRunCustomTest}
              onAddCustomTest={handleAddCustomTest}
              isRunningCustomTest={customRunMutation.isPending}
            />

            <CodingConsole
              result={consoleResult}
              isRunning={runMutation.isPending}
              onRun={handleRun}
            />

            {/* AI Code Review — generated on demand from the current editor
                contents. Only the real fields the component accepts as
                props are populated; the rest of CodeReview's decorative
                sections (Hiring Recommendation, SOLID Principles, Company
                Readiness, etc.) remain as sample content, since those need
                their own data model — deferred beyond this sprint. */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-blue-100 p-3">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">AI Code Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Get an interview-style review of your current solution.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateReview}
                  disabled={reviewMutation.isPending || !code.trim()}
                >
                  {reviewMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reviewing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Review My Code
                    </>
                  )}
                </Button>
              </div>
            </div>

            {reviewMutation.data && (
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
            )}

            <SubmissionHistory />
          </>
        )}
      </div>
    </CodingLayout>
  );
}
