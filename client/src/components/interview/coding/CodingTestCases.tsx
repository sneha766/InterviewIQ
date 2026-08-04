import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Play,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

export interface TestCase {
  id: string;
  title: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  executionTime?: string;
}

interface CodingTestCasesProps {
  testCases: TestCase[];
  onRunTest: (id: string) => void;
  onAddTest: () => void;
  onDeleteTest: (id: string) => void;
}

export default function CodingTestCases({
  testCases,
  onRunTest,
  onAddTest,
  onDeleteTest,
}: CodingTestCasesProps) {
  const [expanded, setExpanded] = useState<string | null>(
    testCases[0]?.id ?? null
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border bg-white shadow-sm"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-2xl font-bold">Test Cases</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Run sample or custom test cases individually.
          </p>
        </div>

        <Button onClick={onAddTest}>
          <Plus className="mr-2 h-4 w-4" />
          Add Test
        </Button>
      </div>

      {/* Summary */}

      <div className="grid gap-5 border-b p-6 md:grid-cols-3">
        <div className="rounded-2xl bg-emerald-50 p-5">
          <p className="text-sm text-muted-foreground">Passed</p>
          <h3 className="mt-2 text-3xl font-bold text-emerald-600">
            {testCases.filter(t => t.passed).length}
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 p-5">
          <p className="text-sm text-muted-foreground">Failed</p>
          <h3 className="mt-2 text-3xl font-bold text-red-600">
            {testCases.filter(t => t.passed === false).length}
          </h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-5">
          <p className="text-sm text-muted-foreground">Total</p>
          <h3 className="mt-2 text-3xl font-bold">{testCases.length}</h3>
        </div>
      </div>
            {/* Test Cases */}

      <div className="divide-y">

        {testCases.map(test => {
          const isOpen = expanded === test.id;

          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() =>
                  setExpanded(isOpen ? null : test.id)
                }
                className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">

                  {test.passed === undefined ? (
                    <Play className="h-5 w-5 text-blue-600" />
                  ) : test.passed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}

                  <div>

                    <h3 className="font-semibold">
                      {test.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {test.executionTime ?? "--"}
                    </p>

                  </div>

                </div>

                {isOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {isOpen && (

                <div className="space-y-6 bg-slate-50 p-6">

                  {/* Input */}

                  <div>

                    <h4 className="mb-2 font-semibold">
                      Input
                    </h4>

                    <Textarea
                      value={test.input}
                      readOnly
                      className="min-h-[90px]"
                    />

                  </div>

                  {/* Expected */}

                  <div>

                    <h4 className="mb-2 font-semibold">
                      Expected Output
                    </h4>

                    <Textarea
                      value={test.expectedOutput}
                      readOnly
                      className="min-h-[90px]"
                    />

                  </div>

                  {/* Actual */}

                  <div>

                    <h4 className="mb-2 font-semibold">
                      Actual Output
                    </h4>

                    <Textarea
                      value={test.actualOutput ?? ""}
                      readOnly
                      className="min-h-[90px]"
                    />

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <Button
                      onClick={() => onRunTest(test.id)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() =>
                        onDeleteTest(test.id)
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>

                    <div
                      className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                        test.passed
                          ? "bg-emerald-100 text-emerald-700"
                          : test.passed === false
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {test.passed === undefined
                        ? "Not Executed"
                        : test.passed
                        ? "Passed"
                        : "Failed"}
                    </div>

                  </div>

                </div>

              )}

            </motion.div>
          );
        })}

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Custom Test Case */}

      <div className="space-y-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Custom Test Case
            </h2>

            <p className="text-sm text-muted-foreground">
              Test your solution with custom inputs.
            </p>

          </div>

          <div className="flex gap-3">

            <Button variant="outline">
              Generate Edge Case
            </Button>

            <Button>
              Save Test
            </Button>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Custom Input
            </label>

            <Textarea
              placeholder={`Example:
nums = [2,7,11,15]
target = 9`}
              className="min-h-[180px]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Expected Output (Optional)
            </label>

            <Textarea
              placeholder={`Example:
[0,1]`}
              className="min-h-[180px]"
            />

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <Button>

            <Play className="mr-2 h-4 w-4" />

            Run Custom Test

          </Button>

          <Button variant="outline">

            Add To Test Cases

          </Button>

          <Button variant="secondary">

            Clear

          </Button>

        </div>

      </div>

      {/* AI Edge Cases */}

      <div className="border-t p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              AI Suggested Edge Cases

            </h2>

            <p className="text-sm text-muted-foreground">

              Common interview edge cases for this problem.

            </p>

          </div>

          <Button variant="outline">

            Generate More

          </Button>

        </div>

        <div className="mt-6 grid gap-4">

          {[
            "Empty input",
            "Single element",
            "Maximum constraints",
            "Duplicate values",
          ].map(edge => (

            <div
              key={edge}
              className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5"
            >

              <div>

                <h3 className="font-semibold">

                  {edge}

                </h3>

                <p className="text-sm text-muted-foreground">

                  AI recommends testing this scenario.

                </p>

              </div>

              <Button size="sm">

                Run

              </Button>

            </div>

          ))}

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Execution History */}

      <div className="space-y-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Execution History
            </h2>

            <p className="text-sm text-muted-foreground">
              Review previous executions and compare results.
            </p>

          </div>

          <Button variant="outline">
            Clear History
          </Button>

        </div>

        <div className="space-y-4">

          {[
            {
              id: 1,
              status: true,
              runtime: "18 ms",
              memory: "14.2 MB",
              time: "Just now",
            },
            {
              id: 2,
              status: false,
              runtime: "26 ms",
              memory: "16.8 MB",
              time: "2 min ago",
            },
            {
              id: 3,
              status: true,
              runtime: "21 ms",
              memory: "15.1 MB",
              time: "5 min ago",
            },
          ].map(run => (

            <motion.div
              key={run.id}
              whileHover={{ y: -2 }}
              className="rounded-2xl border bg-white p-5"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-4">

                  {run.status ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}

                  <div>

                    <h3 className="font-semibold">
                      Execution #{run.id}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {run.time}
                    </p>

                  </div>

                </div>

                <div className="flex flex-wrap gap-6">

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Runtime
                    </p>

                    <p className="font-semibold">
                      {run.runtime}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Memory
                    </p>

                    <p className="font-semibold">
                      {run.memory}
                    </p>

                  </div>

                  <div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        run.status
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {run.status ? "Passed" : "Failed"}
                    </span>

                  </div>

                </div>

                <div className="flex gap-2">

                  <Button size="sm">
                    Re-run
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                  >
                    Compare
                  </Button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      {/* Statistics */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Test Statistics
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-blue-50 p-5">

            <p className="text-sm text-muted-foreground">
              Total Runs
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              27
            </h3>

          </div>

          <div className="rounded-2xl bg-emerald-50 p-5">

            <p className="text-sm text-muted-foreground">
              Success Rate
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              92%
            </h3>

          </div>

          <div className="rounded-2xl bg-violet-50 p-5">

            <p className="text-sm text-muted-foreground">
              Best Runtime
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              18 ms
            </h3>

          </div>

          <div className="rounded-2xl bg-amber-50 p-5">

            <p className="text-sm text-muted-foreground">
              Avg. Memory
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              14.8 MB
            </h3>

          </div>

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* AI Failure Analysis */}

      <div className="space-y-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              AI Failure Analysis
            </h2>

            <p className="text-sm text-muted-foreground">
              Intelligent feedback for failed test cases.
            </p>

          </div>

          <Button variant="outline">
            Analyze Again
          </Button>

        </div>

        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">

          <div className="flex items-center gap-3">

            <XCircle className="h-6 w-6 text-red-600" />

            <h3 className="text-lg font-semibold">
              Wrong Answer Detected
            </h3>

          </div>

          <p className="mt-4 leading-7 text-muted-foreground">
            Your solution fails when duplicate values appear in the input.
            The current algorithm assumes every value is unique.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border bg-slate-50 p-5">

            <h3 className="font-semibold">
              Expected Output
            </h3>

            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-white">
[0, 3]
            </pre>

          </div>

          <div className="rounded-2xl border bg-slate-50 p-5">

            <h3 className="font-semibold">
              Your Output
            </h3>

            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-white">
[0, 2]
            </pre>

          </div>

        </div>

        <div className="rounded-2xl border bg-blue-50 p-6">

          <h3 className="font-semibold">
            AI Explanation
          </h3>

          <p className="mt-4 leading-7 text-muted-foreground">
            The algorithm returns the first matching pair instead of
            considering duplicate occurrences. Update the lookup logic
            to correctly handle repeated values.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <Button>
            Generate Similar Tests
          </Button>

          <Button variant="outline">
            Explain Failure
          </Button>

          <Button variant="secondary">
            Suggest Fix
          </Button>

        </div>

      </div>

      {/* Missed Edge Cases */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Missed Edge Cases
        </h2>

        <div className="mt-6 grid gap-4">

          {[
            "Duplicate numbers",
            "Negative values",
            "Empty input",
            "Large constraints",
          ].map(item => (

            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5"
            >

              <div>

                <h3 className="font-semibold">
                  {item}
                </h3>

                <p className="text-sm text-muted-foreground">
                  Recommended additional test.
                </p>

              </div>

              <Button size="sm">
                Run
              </Button>

            </div>

          ))}

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* AI Testing Summary */}

      <div className="p-6">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                AI Testing Summary
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-blue-100">
                Your implementation performs well on most scenarios.
                AI recommends adding more edge-case validation before
                submission to maximize interview performance.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Confidence
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  94%
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Grade
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  A
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Passed
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  12/12
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Runtime
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  18ms
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="font-semibold">
              InterviewIQ AI Testing Engine
            </h3>

            <p className="text-sm text-muted-foreground">
              Intelligent testing, execution analysis and AI-powered debugging.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              AI Testing
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Edge Cases
            </span>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
              Smart Analysis
            </span>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
              Interview Ready
            </span>

          </div>

        </div>

      </div>

    </motion.section>
  );
}