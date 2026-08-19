import { motion } from "framer-motion";

import {
  Play,
  Send,
  RotateCcw,
  Pause,
  Flag,
  Globe,
  Settings2,
  ChevronDown,
  Camera,
  Mic,
  Keyboard,
  Eye,
  ShieldCheck,
  Info,
} from "lucide-react";

import { useMemo, useState } from "react";

import { Button } from "../../ui/button";

interface CodingToolbarProps {
  language: string;
  remainingSeconds: number;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
}

const LANGUAGES = [
  {
    value: "cpp",
    label: "C++",
  },

  {
    value: "java",
    label: "Java",
  },

  {
    value: "python",
    label: "Python",
  },

  {
    value: "javascript",
    label: "JavaScript",
  },

  {
    value: "go",
    label: "Go",
  },
];

export default function CodingToolbar({
  language,

  remainingSeconds,

  onLanguageChange,

  onRun,

  onSubmit,
  isRunning = false,
  isSubmitting = false,
}: CodingToolbarProps) {
  const [paused, setPaused] = useState(false);

  const [interviewMode, setInterviewMode] = useState(true);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60);

    const seconds = remainingSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [remainingSeconds]);

  return (
    <motion.section
      initial={{
        opacity: 0,

        y: -20,
      }}
      animate={{
        opacity: 1,

        y: 0,
      }}
      className="rounded-[30px] border bg-white shadow-sm"
    >
      <div className="flex flex-col gap-6 p-6 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}

        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-blue-100 p-3">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Programming Language
            </p>

            <div className="relative mt-2">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="appearance-none rounded-xl border bg-white py-3 pl-4 pr-10 font-medium outline-none transition-all focus:border-blue-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Center */}

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-slate-100 px-6 py-4">
            <p className="text-xs text-muted-foreground">Remaining Time</p>

            <h2 className="mt-1 text-3xl font-bold">{formattedTime}</h2>
          </div>

          <div
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              interviewMode
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {interviewMode ? "Interview Mode" : "Practice Mode"}
          </div>
        </div>
        {/* Right Controls */}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setInterviewMode((prev) => !prev)}
          >
            <Settings2 className="mr-2 h-4 w-4" />

            {interviewMode ? "Practice Mode" : "Interview Mode"}
          </Button>

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setPaused((prev) => !prev)}
          >
            <Pause className="mr-2 h-4 w-4" />

            {paused ? "Resume" : "Pause"}
          </Button>

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={onRun}
            disabled={isRunning}
          >
            <Play className="mr-2 h-4 w-4" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>

          <Button
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          <Button variant="outline" className="rounded-xl">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>

          <Button variant="destructive" className="rounded-xl">
            <Flag className="mr-2 h-4 w-4" />
            End
          </Button>
        </div>
      </div>

      {/* Divider */}

      <div className="border-t" />

      {/* Interview Status */}

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-muted-foreground">Status</p>

          <h3 className="mt-3 text-xl font-bold text-emerald-600">
            {paused ? "Paused" : "Running"}
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-muted-foreground">Language</p>

          <h3 className="mt-3 text-xl font-bold">
            {LANGUAGES.find((l) => l.value === language)?.label}
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-muted-foreground">Attempts</p>

          <h3 className="mt-3 text-xl font-bold">3</h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-muted-foreground">Test Cases</p>

          <h3 className="mt-3 text-xl font-bold">12</h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-muted-foreground">Interview Score</p>

          <h3 className="mt-3 text-xl font-bold text-blue-600">92%</h3>
        </div>
      </div>
      {/* Divider */}

      <div className="border-t" />

      {/* Execution Status */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="p-6"
      >
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Execution Status</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Live compiler and runtime information.
            </p>
          </div>

          <div className="rounded-full bg-emerald-100 px-5 py-2 font-semibold text-emerald-700">
            Ready to Execute
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Compiler</p>

            <h3 className="mt-3 text-2xl font-bold">Ready</h3>

            <p className="mt-3 text-sm text-emerald-600">
              No compilation errors
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Runtime</p>

            <h3 className="mt-3 text-2xl font-bold">18 ms</h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Faster than 92%
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Memory</p>

            <h3 className="mt-3 text-2xl font-bold">14.3 MB</h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Better than 88%
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Test Results</p>

            <h3 className="mt-3 text-2xl font-bold text-emerald-600">
              12 / 12
            </h3>

            <p className="mt-3 text-sm text-emerald-600">All Passed</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Performance Analysis */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="border-t p-6"
      >
        <div className="flex items-center gap-3">
          <Play className="h-6 w-6 text-blue-600" />

          <h2 className="text-2xl font-bold">Performance Analysis</h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-blue-50 p-6">
            <p className="text-sm text-muted-foreground">Execution Time</p>

            <h2 className="mt-3 text-4xl font-bold">18ms</h2>

            <div className="mt-5 h-2 rounded-full bg-blue-100">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "92%",
                }}
                className="h-full rounded-full bg-blue-600"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-violet-50 p-6">
            <p className="text-sm text-muted-foreground">Memory Usage</p>

            <h2 className="mt-3 text-4xl font-bold">14MB</h2>

            <div className="mt-5 h-2 rounded-full bg-violet-100">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "88%",
                }}
                className="h-full rounded-full bg-violet-600"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-6">
            <p className="text-sm text-muted-foreground">Efficiency</p>

            <h2 className="mt-3 text-4xl font-bold">A+</h2>

            <div className="mt-5 h-2 rounded-full bg-emerald-100">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "96%",
                }}
                className="h-full rounded-full bg-emerald-600"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 p-6">
            <p className="text-sm text-muted-foreground">Interview Rating</p>

            <h2 className="mt-3 text-4xl font-bold">94%</h2>

            <div className="mt-5 h-2 rounded-full bg-amber-100">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "94%",
                }}
                className="h-full rounded-full bg-amber-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Divider */}

      <div className="border-t" />

      {/* AI Interview Monitor */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="p-6"
      >
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-bold">AI Interview Monitor</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Live monitoring during your coding interview.
            </p>
          </div>

          <div className="rounded-full bg-emerald-100 px-5 py-2 font-semibold text-emerald-700">
            Monitoring Active
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Camera */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <Camera className="h-8 w-8 text-blue-600" />

            <h3 className="mt-5 text-lg font-semibold">Camera</h3>

            <p className="mt-3 text-muted-foreground">Face detected</p>

            <div className="mt-5 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />

              <span className="font-medium text-emerald-600">Active</span>
            </div>
          </motion.div>

          {/* Microphone */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <Mic className="h-8 w-8 text-violet-600" />

            <h3 className="mt-5 text-lg font-semibold">Microphone</h3>

            <p className="mt-3 text-muted-foreground">
              Voice monitoring enabled
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />

              <span className="font-medium text-emerald-600">Listening</span>
            </div>
          </motion.div>

          {/* Typing */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <Keyboard className="h-8 w-8 text-amber-600" />

            <h3 className="mt-5 text-lg font-semibold">Typing Activity</h3>

            <p className="mt-3 text-muted-foreground">Normal coding pace</p>

            <div className="mt-5">
              <h2 className="text-3xl font-bold">62 WPM</h2>
            </div>
          </motion.div>

          {/* Focus */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <Eye className="h-8 w-8 text-emerald-600" />

            <h3 className="mt-5 text-lg font-semibold">Focus Score</h3>

            <p className="mt-3 text-muted-foreground">AI Attention Tracking</p>

            <div className="mt-5">
              <h2 className="text-3xl font-bold text-blue-600">96%</h2>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interview Warnings */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        className="border-t p-6"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-emerald-600" />

          <h2 className="text-2xl font-bold">Interview Integrity</h2>
        </div>

        <div className="mt-8 space-y-5">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 text-emerald-600" />

              <div>
                <h3 className="font-semibold">Everything Looks Good</h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  No suspicious activity detected. Your interview session is
                  progressing normally.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-slate-50 p-6">
            <div className="flex gap-4">
              <Info className="mt-1 h-6 w-6 text-blue-600" />

              <div>
                <h3 className="font-semibold">AI Recommendation</h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  Continue explaining your thought process aloud while
                  implementing your solution to maximize your interview score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Divider */}

      <div className="border-t" />

      {/* Session Overview */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Session Overview</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Current interview progress and coding statistics.
            </p>
          </div>

          <div className="rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">
            Live Session
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Problems Solved</p>

            <h3 className="mt-3 text-4xl font-bold">3</h3>

            <p className="mt-3 text-sm text-emerald-600">+1 this session</p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Lines Written</p>

            <h3 className="mt-3 text-4xl font-bold">184</h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Current solution
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Compile Runs</p>

            <h3 className="mt-3 text-4xl font-bold">9</h3>

            <p className="mt-3 text-sm text-muted-foreground">
              During interview
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <p className="text-sm text-muted-foreground">Success Rate</p>

            <h3 className="mt-3 text-4xl font-bold text-emerald-600">96%</h3>

            <p className="mt-3 text-sm text-emerald-600">Excellent</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Live Interview Metrics */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        className="border-t p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Live Metrics</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              AI-generated interview statistics.
            </p>
          </div>

          <div className="rounded-full bg-emerald-100 px-5 py-2 font-semibold text-emerald-700">
            Tracking
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="mb-3 flex justify-between">
              <span className="font-medium">Coding Progress</span>

              <span className="font-semibold">82%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "82%",
                }}
                className="h-full rounded-full bg-blue-600"
              />
            </div>
          </div>

          <div>
            <div className="mb-3 flex justify-between">
              <span className="font-medium">AI Confidence</span>

              <span className="font-semibold">94%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "94%",
                }}
                className="h-full rounded-full bg-emerald-600"
              />
            </div>
          </div>

          <div>
            <div className="mb-3 flex justify-between">
              <span className="font-medium">Interview Readiness</span>

              <span className="font-semibold">91%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "91%",
                }}
                className="h-full rounded-full bg-violet-600"
              />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Divider */}

      <div className="border-t" />

      {/* AI Interview Assistant */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.6,
        }}
        className="p-6"
      >
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-bold">AI Interview Assistant</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Real-time guidance during your coding interview.
            </p>
          </div>

          <div className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
            AI Active
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-gradient-to-br from-blue-50 to-white p-6"
          >
            <h3 className="text-lg font-semibold">Communication</h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Explain your algorithm before writing code. Mention why your
              approach is optimal.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-gradient-to-br from-violet-50 to-white p-6"
          >
            <h3 className="text-lg font-semibold">Optimization</h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Your current implementation appears efficient. Consider discussing
              alternative solutions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-gradient-to-br from-emerald-50 to-white p-6"
          >
            <h3 className="text-lg font-semibold">Interview Tip</h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Verify edge cases before submission and explain time-space
              trade-offs.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Smart Recommendations */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.7,
        }}
        className="border-t p-6"
      >
        <h2 className="text-2xl font-bold">Smart Recommendations</h2>

        <div className="mt-8 space-y-5">
          <motion.div
            whileHover={{
              x: 4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <h3 className="font-semibold">✓ Continue with current solution</h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              AI believes your approach is optimal for this problem.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              x: 4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <h3 className="font-semibold">✓ Mention complexity</h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Explain why your solution runs in O(n) time and uses O(1)
              auxiliary space.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              x: 4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >
            <h3 className="font-semibold">✓ Test one more edge case</h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Empty arrays and single-element inputs are commonly asked by
              interviewers.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Overall Assessment */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
        className="border-t p-6"
      >
        <div className="rounded-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-3xl font-bold">AI Overall Assessment</h2>

              <p className="mt-5 max-w-3xl leading-8 text-blue-100">
                Your coding interview is progressing very well. Your
                implementation is clean, readable, and close to an ideal
                interview solution. Continue communicating your reasoning while
                coding.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
              <p className="text-blue-100">Current Grade</p>

              <h2 className="mt-3 text-6xl font-bold">A+</h2>

              <p className="mt-2 text-blue-100">Excellent</p>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Divider */}

      <div className="border-t" />

      {/* Footer */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.9,
        }}
        className="p-6"
      >
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}

          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <Play className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  InterviewIQ AI Coding Interview
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
                  Simulate real technical interviews with AI-powered feedback,
                  automated evaluation, execution analytics, and personalized
                  recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-wrap gap-3">
            <div className="rounded-full bg-blue-100 px-5 py-3 text-sm font-semibold text-blue-700">
              AI Interview
            </div>

            <div className="rounded-full bg-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-700">
              Live Evaluation
            </div>

            <div className="rounded-full bg-violet-100 px-5 py-3 text-sm font-semibold text-violet-700">
              Auto Scoring
            </div>

            <div className="rounded-full bg-amber-100 px-5 py-3 text-sm font-semibold text-amber-700">
              Real-time Feedback
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
