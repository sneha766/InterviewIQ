import { motion } from "framer-motion";

import {
  Search,
  MessageSquareText,
  Calendar,
  Sparkles,
  Trophy,
  TrendingUp,
} from "lucide-react";

import { Button } from "../ui/button";

import { useMemo, useState } from "react";

import { Input } from "../ui/input";

export interface RecentInterview {

  id: string;

  interviewType: "HR" | "Technical" | "Coding";

  score: number;

  createdAt: string;

  duration: number;

  status:
    | "Completed"
    | "In Progress";

}

interface RecentInterviewsProps {

  interviews: RecentInterview[];

  loading?: boolean;

  onView?: (id: string) => void;

  onContinue?: (id: string) => void;

  onDelete?: (id: string) => void;

}

export default function RecentInterviews({

  interviews,

  loading = false,

  onView,

  onContinue,

  onDelete,

}: RecentInterviewsProps) {

  const [search, setSearch] =
    useState("");

  const filteredInterviews =
    useMemo(() => {

      return interviews.filter(
        interview =>
          interview.interviewType
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [
      interviews,
      search,
    ]);

  const getScoreBadge = (
    score: number
  ) => {

    if (score >= 90)
      return {
        label: "Excellent",
        bg: "bg-emerald-100",
        color:
          "text-emerald-700",
      };

    if (score >= 80)
      return {
        label: "Good",
        bg: "bg-blue-100",
        color:
          "text-blue-700",
      };

    if (score >= 70)
      return {
        label: "Average",
        bg: "bg-amber-100",
        color:
          "text-amber-700",
      };

    return {
      label: "Needs Work",
      bg: "bg-red-100",
      color:
        "text-red-700",
    };

  };

  return (

    <motion.section

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: .35,
      }}

      className="rounded-[30px] border bg-white p-8 shadow-sm"

    >

      {/* Header */}

      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-violet-100 p-4">

              <MessageSquareText className="h-7 w-7 text-violet-600"/>

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                Recent Interviews

              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">

                Review previous AI interviews,
                continue unfinished sessions,
                analyze scores,
                and revisit detailed reports.

              </p>

            </div>

          </div>

        </div>

        <div className="hidden rounded-2xl border bg-slate-50 p-5 lg:block">

          <div className="flex items-center gap-3">

            <Sparkles className="h-5 w-5 text-violet-600"/>

            <div>

              <p className="font-semibold">

                AI Sessions

              </p>

              <p className="text-xs text-muted-foreground">

                {interviews.length} total interviews

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

        <Input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search interviews..."
          className="h-12 rounded-xl pl-12"
        />

      </div>

      {loading ? (

        <div className="space-y-5">
                  {Array.from({ length: 5 }).map((_, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="animate-pulse rounded-[28px] border p-6"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-2xl bg-slate-200"/>

                  <div>

                    <div className="h-5 w-48 rounded bg-slate-200"/>

                    <div className="mt-3 h-4 w-32 rounded bg-slate-100"/>

                  </div>

                </div>

                <div className="h-10 w-28 rounded-xl bg-slate-200"/>

              </div>

            </motion.div>

          ))}

        </div>

      ) : filteredInterviews.length === 0 ? (

        <motion.div
          initial={{
            opacity: 0,
            scale: .97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="rounded-[28px] border border-dashed bg-gradient-to-br from-slate-50 to-white py-20 text-center"
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">

            <MessageSquareText className="h-10 w-10 text-violet-600"/>

          </div>

          <h3 className="mt-8 text-3xl font-bold">

            No Interviews Found

          </h3>

          <p className="mx-auto mt-4 max-w-lg leading-8 text-muted-foreground">

            No interview sessions match
            your search.

            Start a new AI interview
            to begin building your
            interview history.

          </p>

        </motion.div>

      ) : (

        <div className="space-y-6">

          {filteredInterviews.map(
            (interview, index) => {

              const badge =
                getScoreBadge(
                  interview.score
                );

              return (

                <motion.div
                  key={interview.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * .08,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-[28px] border bg-white p-7 shadow-sm transition-all hover:shadow-lg"
                >

                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                    <div className="flex items-start gap-5">

                      <div className="rounded-2xl bg-violet-100 p-4">

                        <MessageSquareText className="h-7 w-7 text-violet-600"/>

                      </div>

                      <div>

                        <h3 className="text-2xl font-semibold">

                          {interview.interviewType} Interview

                        </h3>

                        <div className="mt-4 flex flex-wrap items-center gap-3">

                          <span
                            className={`rounded-full px-4 py-2 text-xs font-semibold ${badge.bg} ${badge.color}`}
                          >

                            {badge.label}

                          </span>

                          <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold">

                            Score {interview.score}%

                          </span>

                          <span
                            className={`rounded-full px-4 py-2 text-xs font-semibold ${
                              interview.status === "Completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >

                            {interview.status}

                          </span>

                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">

                          <div className="flex items-center gap-2">

                            <Calendar className="h-4 w-4"/>

                            {new Date(
                              interview.createdAt
                            ).toLocaleDateString()}

                          </div>

                          <div>

                            {interview.duration} min

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3">
                                          {interview.status === "Completed" ? (

                        <Button
                          variant="outline"
                          className="rounded-xl"
                          onClick={() =>
                            onView?.(interview.id)
                          }
                        >

                          <Trophy className="mr-2 h-4 w-4"/>

                          View Report

                        </Button>

                      ) : (

                        <Button
                          className="rounded-xl"
                          onClick={() =>
                            onContinue?.(
                              interview.id
                            )
                          }
                        >

                          Continue

                        </Button>

                      )}

                      <Button
                        variant="destructive"
                        className="rounded-xl"
                        onClick={() =>
                          onDelete?.(
                            interview.id
                          )
                        }
                      >

                        Delete

                      </Button>

                    </div>

                  </div>

                  {/* Analytics */}

                  <div className="mt-8 grid gap-6 lg:grid-cols-3">

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-muted-foreground">

                          Interview Score

                        </span>

                        <TrendingUp className="h-5 w-5 text-violet-600"/>

                      </div>

                      <h3 className="mt-3 text-3xl font-bold">

                        {interview.score}%

                      </h3>

                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${interview.score}%`,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                        />

                      </div>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <p className="text-sm text-muted-foreground">

                        Interview Status

                      </p>

                      <h3 className="mt-3 text-xl font-semibold">

                        {interview.status}

                      </h3>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">

                        {interview.status ===
                        "Completed"
                          ? "AI evaluation completed successfully with detailed feedback available."
                          : "Resume this interview anytime to continue from your previous progress."}

                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <p className="text-sm text-muted-foreground">

                        AI Recommendation

                      </p>

                      <h3 className="mt-3 text-xl font-semibold">

                        {interview.score >= 90
                          ? "Outstanding"
                          : interview.score >= 80
                          ? "Great Progress"
                          : interview.score >= 70
                          ? "Keep Practicing"
                          : "Needs Improvement"}

                      </h3>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">

                        Continue practicing
                        consistently to improve
                        communication,
                        confidence,
                        and technical depth.

                      </p>

                    </div>

                  </div>

                </motion.div>

              );

            })}

        </div>
              )}

      {/* AI Insights */}

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
          delay: 0.45,
        }}
        className="mt-10 rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white"
      >

        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

            <Sparkles className="h-7 w-7"/>

          </div>

          <div className="flex-1">

            <h3 className="text-2xl font-bold">

              AI Interview Insights

            </h3>

            <p className="mt-5 max-w-4xl leading-8 text-violet-100">

              Reviewing previous interview sessions
              helps identify recurring strengths,
              communication patterns,
              technical gaps,
              and areas where consistent practice
              can significantly improve performance
              in real interviews.

            </p>

          </div>

        </div>

      </motion.div>

      {/* Summary */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .6,
        }}
        className="mt-10 rounded-3xl border bg-gradient-to-br from-slate-50 to-white p-8"
      >

        <div className="grid gap-8 lg:grid-cols-3">

          <div>

            <p className="text-sm text-muted-foreground">

              Total Sessions

            </p>

            <h3 className="mt-3 text-4xl font-bold">

              {filteredInterviews.length}

            </h3>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              Completed

            </p>

            <h3 className="mt-3 text-4xl font-bold">

              {
                filteredInterviews.filter(
                  interview =>
                    interview.status ===
                    "Completed"
                ).length
              }

            </h3>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              In Progress

            </p>

            <h3 className="mt-3 text-4xl font-bold">

              {
                filteredInterviews.filter(
                  interview =>
                    interview.status ===
                    "In Progress"
                ).length
              }

            </h3>

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
          delay: .75,
        }}
        className="mt-10 flex flex-col gap-4 border-t pt-8 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>

          <h3 className="text-lg font-semibold">

            Interview Analytics

          </h3>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">

            {filteredInterviews.length} interview
            {filteredInterviews.length === 1
              ? ""
              : "s"}{" "}
            available.

            Continue practicing to improve your
            confidence,
            technical knowledge,
            and communication skills.

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <div className="rounded-full bg-violet-100 px-5 py-3 text-sm font-semibold text-violet-700">

            AI Powered

          </div>

          <div className="rounded-full bg-blue-100 px-5 py-3 text-sm font-semibold text-blue-700">

            Analytics Ready

          </div>

        </div>

      </motion.div>

    </motion.section>

  );

}