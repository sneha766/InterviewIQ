import { useEffect, useState } from "react";
import { toast } from "sonner";

import CodingLayout from "../components/interview/coding/CodingLayout";
import CodingToolbar from "../components/interview/coding/CodingToolbar";
import CodingProblem from "../components/interview/coding/CodingProblem";
import CodingEditor from "../components/interview/coding/CodingEditor";
import CodingTestCases from "../components/interview/coding/CodingTestCases";
import CodingConsole from "../components/interview/coding/CodingConsole";
import CodeReview from "../components/interview/coding/CodeReview";

import {
  useProblems,
  useProblem,
  useRunCode,
  useSubmitCode,
} from "../hooks/useCoding";
import SubmissionHistory from "@/components/interview/coding/SubmissionHistory";

export default function Coding() {
  const [language, setLanguage] = useState("cpp");

  const [code, setCode] = useState(`class Solution {

};`);

  const [selectedProblemId, setSelectedProblemId] =
    useState("");

  const problemsQuery = useProblems();

  useEffect(() => {
    if (
      problemsQuery.data?.length &&
      !selectedProblemId
    ) {
      setSelectedProblemId(
        problemsQuery.data[0].slug
      );
    }
  }, [problemsQuery.data, selectedProblemId]);

  const problemQuery = useProblem(
    selectedProblemId
  );

  const runMutation = useRunCode();

  const submitMutation = useSubmitCode();

  const defaultResult = {
    stdout: "",
    stderr: "",
    compileOutput: "",
    executionTime: "--",
    memory: "--",
    status: "idle" as const,
  };

  const handleRun = () => {
    runMutation.mutate({
      language,
      code,
      input: "",
    });
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
        onSuccess: () => {
          toast.success(
            "Solution submitted successfully."
          );
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              "Submission failed."
          );
        },
      }
    );
  };

  if (
    problemsQuery.isPending ||
    problemQuery.isPending
  ) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
        Loading Coding Workspace...
      </div>
    );
  }

  if (!problemQuery.data) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
        Unable to load problem.
      </div>
    );
  }

  return (
    <CodingLayout>
      <div className="space-y-6">
        <CodingToolbar
          language={language}
          remainingSeconds={3600}
          onLanguageChange={setLanguage}
          onRun={handleRun}
          onSubmit={handleSubmit}
          isRunning={runMutation.isPending}
          isSubmitting={submitMutation.isPending}
        />

        <CodingProblem
          problem={problemQuery.data}
        />

        <CodingEditor
          language={language}
          code={code}
          onChange={setCode}
        />

        <CodingTestCases
          testCases={[
            {
              id: "1",
              title: "Example Test",
              input: "[2,7,11,15]",
              expectedOutput: "[0,1]",
              actualOutput: "[0,1]",
              passed: true,
              executionTime: "18 ms",
            },
          ]}
          onRunTest={() => {}}
          onAddTest={() => {}}
          onDeleteTest={() => {}}
        />

        <CodingConsole
          result={
            runMutation.data ?? defaultResult
          }
          isRunning={runMutation.isPending}
          onRun={handleRun}
        />

        <CodeReview
          score={94}
          readability={96}
          maintainability={91}
          bugs={0}
          complexity="O(n)"
          security="Excellent"
        />
        <SubmissionHistory />
      </div>
    </CodingLayout>

  );
}