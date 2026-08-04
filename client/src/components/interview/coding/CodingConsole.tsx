import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Play,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock3,
  MemoryStick,
} from "lucide-react";

import { Button } from "../../ui/button";

interface ConsoleResult {
  stdout?: string;
  stderr?: string;
  compileOutput?: string;
  executionTime?: string;
  memory?: string;
  status?: "idle" | "running" | "success" | "error";
}

interface CodingConsoleProps {
  result: ConsoleResult;
  isRunning?: boolean;
  onRun?: () => void;
}

type ConsoleTab =
  | "output"
  | "console"
  | "compiler";

export default function CodingConsole({
  result,
  isRunning = false,
  onRun,
}: CodingConsoleProps) {
  const [tab, setTab] = useState<ConsoleTab>("output");

  const status = useMemo(() => {
    switch (result.status) {
      case "success":
        return {
          label: "Success",
          color: "bg-emerald-100 text-emerald-700",
          icon: CheckCircle2,
        };

      case "error":
        return {
          label: "Error",
          color: "bg-red-100 text-red-700",
          icon: AlertCircle,
        };

      case "running":
        return {
          label: "Running",
          color: "bg-blue-100 text-blue-700",
          icon: Play,
        };

      default:
        return {
          label: "Idle",
          color: "bg-slate-100 text-slate-700",
          icon: Terminal,
        };
    }
  }, [result.status]);

  const StatusIcon = status.icon;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border bg-white shadow-sm"
    >
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-slate-100 p-4">

            <Terminal className="h-6 w-6" />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Execution Console
            </h2>

            <p className="text-sm text-muted-foreground">
              Compile, execute and inspect your program.
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.color}`}
          >
            <StatusIcon className="h-4 w-4" />
            {status.label}
          </div>

          <Button
            disabled={isRunning}
            onClick={onRun}
          >
            <Play className="mr-2 h-4 w-4" />
            Run Code
          </Button>

        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-5 border-b p-6 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-50 p-5">

          <Clock3 className="h-5 w-5 text-blue-600" />

          <p className="mt-3 text-sm text-muted-foreground">
            Runtime
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {result.executionTime ?? "--"}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <MemoryStick className="h-5 w-5 text-violet-600" />

          <p className="mt-3 text-sm text-muted-foreground">
            Memory
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {result.memory ?? "--"}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <CheckCircle2 className="h-5 w-5 text-emerald-600" />

          <p className="mt-3 text-sm text-muted-foreground">
            Status
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {status.label}
          </h3>

        </div>

      </div>
            {/* Tabs */}

      <div className="flex items-center gap-2 border-b px-6 py-4">

        {[
          { key: "output", label: "Output", icon: Play },
          { key: "console", label: "Console", icon: Terminal },
          { key: "compiler", label: "Compiler", icon: FileText },
        ].map(({ key, label, icon: Icon }) => (

          <Button
            key={key}
            variant={tab === key ? "default" : "ghost"}
            onClick={() => setTab(key as ConsoleTab)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>

        ))}

      </div>

      {/* Terminal */}

      <div className="bg-[#0D1117]">

        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">

          <div className="flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-emerald-500" />

          </div>

          <span className="font-mono text-xs text-slate-400">

            interviewiq-terminal

          </span>

          <Button variant="ghost" size="sm">

            Copy

          </Button>

        </div>

        <div className="min-h-[350px] overflow-auto font-mono text-sm">

          {tab === "output" && (

            <div className="p-5">

              {(result.stdout || "No output available.")
                .split("\n")
                .map((line, index) => (

                  <div
                    key={index}
                    className="flex gap-5"
                  >

                    <span className="w-8 select-none text-right text-slate-600">

                      {index + 1}

                    </span>

                    <span className="whitespace-pre-wrap text-emerald-400">

                      {line}

                    </span>

                  </div>

                ))}

            </div>

          )}

          {tab === "console" && (

            <div className="p-5">

              {(result.stderr || "Console is empty.")
                .split("\n")
                .map((line, index) => (

                  <div
                    key={index}
                    className="flex gap-5"
                  >

                    <span className="w-8 text-right text-slate-600">

                      {index + 1}

                    </span>

                    <span className="whitespace-pre-wrap text-red-400">

                      {line}

                    </span>

                  </div>

                ))}

            </div>

          )}

          {tab === "compiler" && (

            <div className="p-5">

              {(result.compileOutput || "Compilation successful.")
                .split("\n")
                .map((line, index) => (

                  <div
                    key={index}
                    className="flex gap-5"
                  >

                    <span className="w-8 text-right text-slate-600">

                      {index + 1}

                    </span>

                    <span className="whitespace-pre-wrap text-blue-300">

                      {line}

                    </span>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Test Results */}

      <div className="space-y-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Test Results
            </h2>

            <p className="text-sm text-muted-foreground">
              Execution summary for all test cases.
            </p>

          </div>

          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            12 / 12 Passed

          </div>

        </div>

        <div className="overflow-hidden rounded-2xl border">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-5 py-4 text-left font-semibold">
                  Test
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Runtime
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Memory
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {Array.from({ length: 5 }).map((_, index) => {

                const passed = index !== 3;

                return (

                  <tr
                    key={index}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      Test #{index + 1}

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          passed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {passed ? "Passed" : "Failed"}

                      </span>

                    </td>

                    <td className="px-5 py-4">

                      {18 + index} ms

                    </td>

                    <td className="px-5 py-4">

                      {(14 + index * 0.4).toFixed(1)} MB

                    </td>

                    <td className="px-5 py-4">

                      <Button
                        size="sm"
                        variant="outline"
                      >

                        View

                      </Button>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

      {/* Summary */}

      <div className="border-t p-6">

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-emerald-50 p-5">

            <p className="text-sm text-muted-foreground">
              Passed
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              12
            </h3>

          </div>

          <div className="rounded-2xl bg-red-50 p-5">

            <p className="text-sm text-muted-foreground">
              Failed
            </p>

            <h3 className="mt-2 text-3xl font-bold text-red-600">
              1
            </h3>

          </div>

          <div className="rounded-2xl bg-blue-50 p-5">

            <p className="text-sm text-muted-foreground">
              Fastest Runtime
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              18 ms
            </h3>

          </div>

          <div className="rounded-2xl bg-violet-50 p-5">

            <p className="text-sm text-muted-foreground">
              Peak Memory
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              15.6 MB
            </h3>

          </div>

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Error Analysis */}

      <div className="space-y-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Error Analysis
            </h2>

            <p className="text-sm text-muted-foreground">
              Compiler and runtime diagnostics with AI assistance.
            </p>

          </div>

          <Button variant="outline">
            Analyze with AI
          </Button>

        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

          <div className="flex items-center gap-3">

            <AlertCircle className="h-5 w-5 text-red-600" />

            <h3 className="font-semibold">
              Runtime Exception
            </h3>

          </div>

          <p className="mt-3 font-mono text-sm text-red-700">

            IndexError: list index out of range

          </p>

          <p className="mt-4 leading-7 text-muted-foreground">

            Your solution attempted to access an element outside
            the valid bounds of the array. This usually happens
            when loop conditions or index calculations are incorrect.

          </p>

        </div>

      </div>

      {/* Stack Trace */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Stack Trace
        </h2>

        <div className="mt-5 overflow-hidden rounded-2xl bg-[#0D1117]">

          <div className="border-b border-slate-800 px-5 py-3 font-mono text-sm text-slate-400">

            stacktrace.log

          </div>

          <div className="space-y-2 p-5 font-mono text-sm">

            <p className="text-red-400">

              File "solution.py", line 18

            </p>

            <p className="text-slate-300">

              nums[i + 1]

            </p>

            <p className="text-red-400">

              IndexError: list index out of range

            </p>

          </div>

        </div>

      </div>

      {/* AI Fix Suggestions */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          AI Suggestions
        </h2>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">

          {[
            {
              title: "Validate Index",
              desc: "Check array bounds before accessing elements.",
            },
            {
              title: "Handle Empty Input",
              desc: "Return early for empty collections.",
            },
            {
              title: "Review Loop Condition",
              desc: "Ensure iteration stops before the last valid index.",
            },
          ].map(item => (

            <div
              key={item.title}
              className="rounded-2xl border bg-slate-50 p-5"
            >

              <AlertCircle className="h-5 w-5 text-amber-500" />

              <h3 className="mt-4 font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          <Button>
            Fix with AI
          </Button>

          <Button variant="outline">
            Explain Error
          </Button>

          <Button variant="secondary">
            Generate Similar Test
          </Button>

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Execution Timeline */}

      <div className="space-y-6 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Execution Timeline
          </h2>

          <p className="text-sm text-muted-foreground">
            Live execution pipeline and performance breakdown.
          </p>

        </div>

        <div className="space-y-5">

          {[
            {
              title: "Compilation",
              duration: "0.18s",
              progress: 100,
              color: "bg-blue-600",
            },
            {
              title: "Execute Test Cases",
              duration: "0.42s",
              progress: 100,
              color: "bg-emerald-600",
            },
            {
              title: "Memory Profiling",
              duration: "0.08s",
              progress: 94,
              color: "bg-violet-600",
            },
            {
              title: "AI Review",
              duration: "0.31s",
              progress: 100,
              color: "bg-amber-500",
            },
          ].map(step => (

            <div
              key={step.title}
              className="rounded-2xl border bg-slate-50 p-5"
            >

              <div className="mb-3 flex items-center justify-between">

                <span className="font-semibold">
                  {step.title}
                </span>

                <span className="text-sm text-muted-foreground">
                  {step.duration}
                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-200">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${step.progress}%` }}
                  className={`h-full rounded-full ${step.color}`}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Performance Breakdown */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Performance Breakdown
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-blue-50 p-5">

            <p className="text-sm text-muted-foreground">
              Compilation
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              180 ms
            </h3>

          </div>

          <div className="rounded-2xl bg-emerald-50 p-5">

            <p className="text-sm text-muted-foreground">
              Execution
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              420 ms
            </h3>

          </div>

          <div className="rounded-2xl bg-violet-50 p-5">

            <p className="text-sm text-muted-foreground">
              AI Review
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              310 ms
            </h3>

          </div>

          <div className="rounded-2xl bg-amber-50 p-5">

            <p className="text-sm text-muted-foreground">
              Total
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              910 ms
            </h3>

          </div>

        </div>

      </div>

      {/* AI Execution Insights */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          AI Execution Insights
        </h2>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">

          {[
            {
              title: "Runtime",
              desc: "Execution is faster than 92% of accepted solutions.",
            },
            {
              title: "Memory",
              desc: "Memory usage is efficient with no unnecessary allocations.",
            },
            {
              title: "Recommendation",
              desc: "Current implementation is production-ready with minor optimizations possible.",
            },
          ].map(card => (

            <motion.div
              key={card.title}
              whileHover={{ y: -2 }}
              className="rounded-2xl border bg-slate-50 p-5"
            >

              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <h3 className="mt-4 font-semibold">
                {card.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {card.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Submission History */}

      <div className="space-y-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Submission History
            </h2>

            <p className="text-sm text-muted-foreground">
              Track your execution performance across attempts.
            </p>

          </div>

          <Button variant="outline">
            View All
          </Button>

        </div>

        <div className="overflow-hidden rounded-2xl border">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-5 py-4 text-left">#</th>
                <th className="px-5 py-4 text-left">Result</th>
                <th className="px-5 py-4 text-left">Runtime</th>
                <th className="px-5 py-4 text-left">Memory</th>
                <th className="px-5 py-4 text-left">Submitted</th>

              </tr>

            </thead>

            <tbody>

              {[
                {
                  id: 5,
                  ok: true,
                  runtime: "18 ms",
                  memory: "14.2 MB",
                  time: "Just now",
                },
                {
                  id: 4,
                  ok: true,
                  runtime: "21 ms",
                  memory: "15.1 MB",
                  time: "4 min ago",
                },
                {
                  id: 3,
                  ok: false,
                  runtime: "--",
                  memory: "--",
                  time: "7 min ago",
                },
                {
                  id: 2,
                  ok: true,
                  runtime: "25 ms",
                  memory: "16.3 MB",
                  time: "15 min ago",
                },
              ].map(item => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-5 py-4 font-medium">
                    #{item.id}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.ok
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {item.ok ? "Accepted" : "Failed"}

                    </span>

                  </td>

                  <td className="px-5 py-4">
                    {item.runtime}
                  </td>

                  <td className="px-5 py-4">
                    {item.memory}
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {item.time}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Performance Trends */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Performance Trends
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-emerald-50 p-5">

            <p className="text-sm text-muted-foreground">
              Best Runtime
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              18 ms
            </h3>

            <p className="mt-2 text-sm text-emerald-700">
              Faster than 92%
            </p>

          </div>

          <div className="rounded-2xl bg-blue-50 p-5">

            <p className="text-sm text-muted-foreground">
              Avg Runtime
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              21 ms
            </h3>

            <p className="mt-2 text-sm text-blue-700">
              Improving steadily
            </p>

          </div>

          <div className="rounded-2xl bg-violet-50 p-5">

            <p className="text-sm text-muted-foreground">
              Best Memory
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              14.2 MB
            </h3>

            <p className="mt-2 text-sm text-violet-700">
              Better than 89%
            </p>

          </div>

        </div>

      </div>

      {/* AI Trend Analysis */}

      <div className="border-t p-6">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">

          <h2 className="text-3xl font-bold">
            AI Trend Analysis
          </h2>

          <p className="mt-5 max-w-4xl leading-8 text-blue-100">

            Across recent submissions your runtime has improved by
            approximately 28%, memory usage has become more consistent,
            and failed submissions are decreasing. Continue validating
            edge cases before submitting to maintain a high acceptance rate.

          </p>

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Actions */}

      <div className="flex flex-wrap items-center justify-between gap-4 p-6">

        <div>

          <h2 className="text-xl font-bold">
            Console Actions
          </h2>

          <p className="text-sm text-muted-foreground">
            Export results or continue debugging your solution.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Button>
            Run Again
          </Button>

          <Button variant="outline">
            Download Logs
          </Button>

          <Button variant="outline">
            Export Result
          </Button>

          <Button variant="secondary">
            Clear Console
          </Button>

        </div>

      </div>

      {/* AI Summary */}

      <div className="border-t p-6">

        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 p-8 text-white">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                AI Execution Summary
              </h2>

              <p className="mt-5 max-w-4xl leading-8 text-blue-100">

                Your solution compiled successfully, passed all required
                test cases, and demonstrated efficient runtime and memory
                usage. The implementation is clean, stable, and suitable
                for production-level interview discussions.

              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Runtime
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  A+
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Memory
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  A
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Correctness
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  100%
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center">

                <p className="text-sm text-blue-100">
                  Verdict
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Pass
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-5">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="font-semibold">
              InterviewIQ AI Execution Engine
            </h3>

            <p className="text-sm text-muted-foreground">
              Real-time code execution, compiler diagnostics, runtime analytics,
              and AI-powered debugging built for technical interviews.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Compiler
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Runtime
            </span>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
              AI Debugging
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