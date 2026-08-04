import { motion } from "framer-motion";

import {
  Code2,
  Tag,
  BarChart3,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export interface CodingExample {

  input: string;

  output: string;

  explanation?: string;

}

export interface CodingProblemModel {

  id: string;

  title: string;

  difficulty: "Easy" | "Medium" | "Hard";

  acceptanceRate: number;

  description: string;

  examples: CodingExample[];

  constraints: string[];

  hints: string[];

  tags: string[];

}

interface CodingProblemProps {

  problem: CodingProblemModel;

}

export default function CodingProblem({

  problem,

}: CodingProblemProps) {

  const difficultyStyle = {

    Easy: {

      badge:
        "bg-emerald-100 text-emerald-700",

      dot:
        "bg-emerald-500",

    },

    Medium: {

      badge:
        "bg-amber-100 text-amber-700",

      dot:
        "bg-amber-500",

    },

    Hard: {

      badge:
        "bg-red-100 text-red-700",

      dot:
        "bg-red-500",

    },

  };

  const style =
    difficultyStyle[
      problem.difficulty
    ];

  return (

    <motion.section

      initial={{
        opacity: 0,
        x: -20,
      }}

      animate={{
        opacity: 1,
        x: 0,
      }}

      className="flex h-full flex-col overflow-hidden rounded-[30px] border bg-white shadow-sm"

    >

      {/* Header */}

      <div className="border-b p-7">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">

            <Code2 className="h-7 w-7 text-blue-600"/>

          </div>

          <div className="flex-1">

            <h2 className="text-2xl font-bold">

              {problem.title}

            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">

              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold ${style.badge}`}
              >

                {problem.difficulty}

              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold">

                {problem.acceptanceRate}%
                Acceptance

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Scrollable Content */}

      <div className="flex-1 overflow-y-auto p-7">

        {/* Description */}

        <div>

          <h3 className="text-xl font-bold">

            Problem Statement

          </h3>

          <p className="mt-5 leading-8 text-muted-foreground whitespace-pre-line">

            {problem.description}

          </p>

        </div>
                {/* Examples */}

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
            delay: .15,
          }}
          className="mt-10"
        >

          <div className="mb-6 flex items-center gap-3">

            <BarChart3 className="h-6 w-6 text-blue-600"/>

            <h3 className="text-xl font-bold">

              Examples

            </h3>

          </div>

          <div className="space-y-6">

            {problem.examples.map(
              (example, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -2,
                  }}
                  className="overflow-hidden rounded-[24px] border bg-slate-50"
                >

                  <div className="border-b bg-white px-6 py-4">

                    <h4 className="font-semibold">

                      Example {index + 1}

                    </h4>

                  </div>

                  <div className="space-y-5 p-6">

                    <div>

                      <p className="mb-2 font-semibold">

                        Input

                      </p>

                      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">

{example.input}

                      </pre>

                    </div>

                    <div>

                      <p className="mb-2 font-semibold">

                        Output

                      </p>

                      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">

{example.output}

                      </pre>

                    </div>

                    {example.explanation && (

                      <div>

                        <p className="mb-2 font-semibold">

                          Explanation

                        </p>

                        <div className="rounded-xl bg-blue-50 p-4">

                          <p className="leading-7 text-muted-foreground">

                            {example.explanation}

                          </p>

                        </div>

                      </div>

                    )}

                  </div>

                </motion.div>

              )

            )}

          </div>

        </motion.div>

        {/* Constraints */}

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
            delay: .25,
          }}
          className="mt-10"
        >

          <div className="mb-6 flex items-center gap-3">

            <CheckCircle2 className="h-6 w-6 text-emerald-600"/>

            <h3 className="text-xl font-bold">

              Constraints

            </h3>

          </div>

          <div className="space-y-3">

            {problem.constraints.map(
              (constraint, index) => (

                <motion.div
                  key={constraint}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * .05,
                  }}
                  className="flex items-start gap-4 rounded-2xl bg-emerald-50 p-4"
                >

                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-600"/>

                  <p className="leading-7 text-muted-foreground">

                    {constraint}

                  </p>

                </motion.div>

              )

            )}

          </div>

        </motion.div>
                {/* AI Hints */}

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
            delay: .35,
          }}
          className="mt-10"
        >

          <div className="mb-6 flex items-center gap-3">

            <Lightbulb className="h-6 w-6 text-amber-500"/>

            <h3 className="text-xl font-bold">

              AI Hints

            </h3>

          </div>

          <div className="space-y-4">

            {problem.hints.map((hint, index) => (

              <motion.div
                key={hint}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * .08,
                }}
                className="rounded-[22px] border bg-amber-50 p-5"
              >

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">

                    {index + 1}

                  </div>

                  <div>

                    <h4 className="font-semibold">

                      Hint {index + 1}

                    </h4>

                    <p className="mt-3 leading-7 text-muted-foreground">

                      {hint}

                    </p>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.div>

        {/* Problem Tags */}

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
            delay: .45,
          }}
          className="mt-10"
        >

          <div className="mb-6 flex items-center gap-3">

            <Tag className="h-6 w-6 text-violet-600"/>

            <h3 className="text-xl font-bold">

              Problem Tags

            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            {problem.tags.map((tag) => (

              <motion.span
                key={tag}
                whileHover={{
                  scale: 1.05,
                }}
                className="rounded-full bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700"
              >

                {tag}

              </motion.span>

            ))}

          </div>

        </motion.div>

        {/* Interview Insights */}

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
            delay: .55,
          }}
          className="mt-10 rounded-[28px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 text-white"
        >

          <div className="flex items-center gap-3">

            <Code2 className="h-7 w-7"/>

            <h3 className="text-2xl font-bold">

              Interview Insights

            </h3>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <div>

              <p className="text-blue-100">

                Difficulty

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {problem.difficulty}

              </h2>

            </div>

            <div>

              <p className="text-blue-100">

                Acceptance

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {problem.acceptanceRate}%

              </h2>

            </div>

            <div>

              <p className="text-blue-100">

                Skills Tested

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {problem.tags.length}

              </h2>

            </div>

          </div>

        </motion.div>

        {/* Expected Interview Performance */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: .65,
          }}
          className="mt-10 rounded-[28px] border bg-slate-50 p-6"
        >

          <h3 className="text-xl font-bold">

            Expected Interview Focus

          </h3>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl bg-white p-5">

              <p className="text-sm text-muted-foreground">

                Expected Time

              </p>

              <h3 className="mt-3 text-2xl font-bold">

                20-30 Minutes

              </h3>

            </div>

            <div className="rounded-2xl bg-white p-5">

              <p className="text-sm text-muted-foreground">

                Expected Complexity

              </p>

              <h3 className="mt-3 text-2xl font-bold">

                O(n)

              </h3>

            </div>

            <div className="rounded-2xl bg-white p-5">

              <p className="text-sm text-muted-foreground">

                Memory Target

              </p>

              <h3 className="mt-3 text-2xl font-bold">

                O(1) / O(n)

              </h3>

            </div>

            <div className="rounded-2xl bg-white p-5">

              <p className="text-sm text-muted-foreground">

                Interview Type

              </p>

              <h3 className="mt-3 text-2xl font-bold">

                DSA Round

              </h3>

            </div>

          </div>

        </motion.div>
                {/* Personal Notes */}

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
            delay: .75,
          }}
          className="mt-10"
        >

          <div className="mb-6 flex items-center gap-3">

            <Lightbulb className="h-6 w-6 text-blue-600"/>

            <h3 className="text-xl font-bold">

              Personal Notes

            </h3>

          </div>

          <textarea
            placeholder="Write down your approach, observations, or edge cases..."
            className="min-h-[180px] w-full resize-none rounded-[24px] border bg-white p-6 leading-8 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

        </motion.div>

        {/* AI Strategy */}

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
            delay: .85,
          }}
          className="mt-10 rounded-[30px] border bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-7 text-white"
        >

          <div className="flex items-center gap-3">

            <Lightbulb className="h-7 w-7"/>

            <h3 className="text-2xl font-bold">

              AI Strategy

            </h3>

          </div>

          <div className="mt-7 space-y-5">

            <div className="flex gap-4">

              <div className="mt-2 h-3 w-3 rounded-full bg-white"/>

              <p className="leading-7 text-blue-100">

                Understand the problem before writing code.

              </p>

            </div>

            <div className="flex gap-4">

              <div className="mt-2 h-3 w-3 rounded-full bg-white"/>

              <p className="leading-7 text-blue-100">

                Identify the optimal algorithm before implementation.

              </p>

            </div>

            <div className="flex gap-4">

              <div className="mt-2 h-3 w-3 rounded-full bg-white"/>

              <p className="leading-7 text-blue-100">

                Think about edge cases before submitting.

              </p>

            </div>

            <div className="flex gap-4">

              <div className="mt-2 h-3 w-3 rounded-full bg-white"/>

              <p className="leading-7 text-blue-100">

                Explain your approach aloud like a real interview.

              </p>

            </div>

          </div>

        </motion.div>

        {/* Related Topics */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: .95,
          }}
          className="mt-10"
        >

          <div className="mb-6 flex items-center gap-3">

            <Tag className="h-6 w-6 text-blue-600"/>

            <h3 className="text-xl font-bold">

              Related Topics

            </h3>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {problem.tags.map((topic) => (

              <motion.div
                key={topic}
                whileHover={{
                  scale: 1.03,
                }}
                className="rounded-2xl border bg-slate-50 p-5 transition-all hover:border-blue-300"
              >

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-blue-100 p-3">

                    <Code2 className="h-5 w-5 text-blue-600"/>

                  </div>

                  <div>

                    <h4 className="font-semibold">

                      {topic}

                    </h4>

                    <p className="text-sm text-muted-foreground">

                      Frequently asked in interviews

                    </p>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.div>

        {/* Interview Tips */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-10 rounded-[28px] border bg-slate-50 p-6"
        >

          <h3 className="text-xl font-bold">

            Interview Tips

          </h3>

          <div className="mt-6 space-y-4">

            <div className="rounded-2xl bg-white p-5">

              Don't jump directly into coding.
              Spend 2–3 minutes discussing your approach.

            </div>

            <div className="rounded-2xl bg-white p-5">

              Mention time and space complexity
              before writing the final solution.

            </div>

            <div className="rounded-2xl bg-white p-5">

              Test your solution using the sample
              input before submission.

            </div>

          </div>

        </motion.div>
                {/* Problem Actions */}

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
            delay: 1.1,
          }}
          className="mt-10"
        >

          <h3 className="text-xl font-bold">

            Problem Actions

          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: .98,
              }}
              className="rounded-2xl border bg-slate-50 p-5 text-left transition-all hover:border-blue-400"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-3">

                  <Lightbulb className="h-5 w-5 text-blue-600"/>

                </div>

                <div>

                  <h4 className="font-semibold">

                    Bookmark Problem

                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground">

                    Save for later practice.

                  </p>

                </div>

              </div>

            </motion.button>

            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: .98,
              }}
              className="rounded-2xl border bg-slate-50 p-5 text-left transition-all hover:border-red-300"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-red-100 p-3">

                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.09A6.02 6.02 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54z"/>

                  </svg>

                </div>

                <div>

                  <h4 className="font-semibold">

                    Add to Favorites

                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground">

                    Quickly access favorite questions.

                  </p>

                </div>

              </div>

            </motion.button>

            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: .98,
              }}
              className="rounded-2xl border bg-slate-50 p-5 text-left transition-all hover:border-violet-400"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-violet-100 p-3">

                  <Tag className="h-5 w-5 text-violet-600"/>

                </div>

                <div>

                  <h4 className="font-semibold">

                    Share Problem

                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground">

                    Send to a friend or mentor.

                  </p>

                </div>

              </div>

            </motion.button>

            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: .98,
              }}
              className="rounded-2xl border bg-slate-50 p-5 text-left transition-all hover:border-emerald-400"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-emerald-100 p-3">

                  <CheckCircle2 className="h-5 w-5 text-emerald-600"/>

                </div>

                <div>

                  <h4 className="font-semibold">

                    Mark as Solved

                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground">

                    Track your coding progress.

                  </p>

                </div>

              </div>

            </motion.button>

          </div>

        </motion.div>

        {/* AI Coach */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
          }}
          className="mt-10 rounded-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 text-white"
        >

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-white/10 p-4">

              <Lightbulb className="h-7 w-7"/>

            </div>

            <div>

              <h3 className="text-2xl font-bold">

                AI Coach

              </h3>

              <p className="mt-5 leading-8 text-blue-100">

                Remember:
                Interviewers evaluate much more than
                your final solution.
                Explain your thinking,
                discuss trade-offs,
                consider edge cases,
                and communicate clearly while coding.
                Strong communication often makes the
                difference between a good interview
                and a great one.

              </p>

            </div>

          </div>

        </motion.div>
                {/* Footer */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.3,
          }}
          className="mt-10 border-t pt-8"
        >

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <Code2 className="h-6 w-6 text-blue-600"/>

                <h3 className="text-xl font-bold">

                  InterviewIQ Coding

                </h3>

              </div>

              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">

                Every coding problem is designed to simulate
                real technical interviews. Focus on writing
                clean, readable, and optimal solutions while
                communicating your thought process clearly.

              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <div className="rounded-full bg-blue-100 px-5 py-3 text-sm font-semibold text-blue-700">

                AI Guided

              </div>

              <div className="rounded-full bg-violet-100 px-5 py-3 text-sm font-semibold text-violet-700">

                Interview Ready

              </div>

              <div className="rounded-full bg-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-700">

                Optimized Practice

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </motion.section>

  );

}