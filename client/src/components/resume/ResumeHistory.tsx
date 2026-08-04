import { motion } from "framer-motion";

import {
  Search,
  FileText,
  Eye,
  Trash2,
  Calendar,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { useMemo, useState } from "react";

import { Button } from "../ui/button";

import { Input } from "../ui/input";

interface ResumeHistoryItem {
  id: string;
  fileName: string;
  overallScore: number;
  createdAt: string;
}

interface ResumeHistoryProps {
  resumes: ResumeHistoryItem[];
  loading?: boolean;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ResumeHistory({
  resumes=[],
  loading = false,
  onView,
  onDelete,
}: ResumeHistoryProps) {

  const [search, setSearch] =
    useState("");

  const filteredResumes =
    useMemo(() => {

      return resumes.filter((resume) =>
        resume.fileName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    }, [search, resumes]);

  const getBadge = (
    score: number
  ) => {

    if (score >= 90)
      return {
        label: "Excellent",
        bg: "bg-emerald-100",
        color: "text-emerald-700",
      };

    if (score >= 80)
      return {
        label: "Good",
        bg: "bg-blue-100",
        color: "text-blue-700",
      };

    if (score >= 70)
      return {
        label: "Average",
        bg: "bg-amber-100",
        color: "text-amber-700",
      };

    return {
      label: "Poor",
      bg: "bg-red-100",
      color: "text-red-700",
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

      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-100 p-4">

              <FileText className="h-7 w-7 text-blue-600"/>

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                Resume History

              </h2>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">

                Browse previous resume analyses,
                review ATS scores,
                reopen reports,
                and manage uploaded resumes.

              </p>

            </div>

          </div>

        </div>

        <div className="hidden rounded-2xl border bg-slate-50 p-5 lg:block">

          <div className="flex items-center gap-3">

            <Sparkles className="h-5 w-5 text-blue-600"/>

            <div>

              <p className="font-semibold">

                AI History

              </p>

              <p className="text-xs text-muted-foreground">

                {resumes.length} resumes analyzed

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="relative mb-8">

        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

        <Input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search resumes..."
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
              className="animate-pulse rounded-3xl border p-6"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-2xl bg-slate-200"/>

                  <div>

                    <div className="h-5 w-52 rounded bg-slate-200"/>

                    <div className="mt-3 h-4 w-36 rounded bg-slate-100"/>

                  </div>

                </div>

                <div className="h-10 w-28 rounded-xl bg-slate-200"/>

              </div>

            </motion.div>

          ))}

        </div>

      ) : filteredResumes.length === 0 ? (

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

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

            <FileText className="h-10 w-10 text-blue-600"/>

          </div>

          <h3 className="mt-8 text-3xl font-bold">

            No Resumes Found

          </h3>

          <p className="mx-auto mt-4 max-w-lg leading-8 text-muted-foreground">

            We couldn't find any resumes
            matching your search.

            Upload a new resume or
            try another keyword.

          </p>

        </motion.div>

      ) : (

        <div className="space-y-6">

          {filteredResumes.map(
            (resume, index) => {

              const badge =
                getBadge(
                  resume.overallScore
                );

              return (

                <motion.div
                  key={resume.id}
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

                      <div className="rounded-2xl bg-blue-100 p-4">

                        <FileText className="h-7 w-7 text-blue-600"/>

                      </div>

                      <div>

                        <h3 className="break-all text-xl font-semibold">

                          {resume.fileName}

                        </h3>

                        <div className="mt-4 flex flex-wrap items-center gap-3">

                          <span
                            className={`rounded-full px-4 py-2 text-xs font-semibold ${badge.bg} ${badge.color}`}
                          >

                            {badge.label}

                          </span>

                          <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold">

                            ATS {resume.overallScore}

                          </span>

                        </div>

                        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">

                          <Calendar className="h-4 w-4"/>

                          {new Date(
                            resume.createdAt
                          ).toLocaleDateString()}

                        </div>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3">
                                          <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={() =>
                          onView?.(resume.id)
                        }
                      >

                        <Eye className="mr-2 h-4 w-4"/>

                        View Report

                      </Button>

                      <Button
                        variant="destructive"
                        className="rounded-xl"
                        onClick={() =>
                          onDelete?.(resume.id)
                        }
                      >

                        <Trash2 className="mr-2 h-4 w-4"/>

                        Delete

                      </Button>

                    </div>

                  </div>

                  {/* Analytics */}

                  <div className="mt-8 grid gap-6 lg:grid-cols-3">

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-muted-foreground">

                          ATS Score

                        </span>

                        <TrendingUp className="h-5 w-5 text-blue-600"/>

                      </div>

                      <h3 className="mt-3 text-3xl font-bold">

                        {resume.overallScore}

                      </h3>

                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${resume.overallScore}%`,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                        />

                      </div>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <p className="text-sm text-muted-foreground">

                        Resume Status

                      </p>

                      <h3 className="mt-3 text-xl font-semibold">

                        {badge.label}

                      </h3>

                      <p className="mt-3 leading-6 text-sm text-muted-foreground">

                        Based on AI evaluation,
                        ATS optimization,
                        formatting,
                        keyword density,
                        and recruiter readiness.

                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                      <p className="text-sm text-muted-foreground">

                        Recommendation

                      </p>

                      <h3 className="mt-3 text-xl font-semibold">

                        {resume.overallScore >= 90
                          ? "Ready to Apply"
                          : resume.overallScore >= 80
                          ? "Minor Improvements"
                          : resume.overallScore >= 70
                          ? "Needs Optimization"
                          : "Revise Resume"}

                      </h3>

                      <p className="mt-3 leading-6 text-sm text-muted-foreground">

                        Continue improving
                        ATS keywords,
                        measurable achievements
                        and formatting.

                      </p>

                    </div>

                  </div>

                </motion.div>

              );

            })}

        </div>
            )}

      {/* AI History Insight */}

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
        className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

            <Sparkles className="h-7 w-7"/>

          </div>

          <div className="flex-1">

            <h3 className="text-2xl font-semibold">

              AI Resume Insights

            </h3>

            <p className="mt-5 max-w-4xl leading-8 text-blue-100">

              Your resume history helps InterviewIQ AI
              track improvements over time.
              Reviewing previous ATS reports before
              making edits allows you to identify
              recurring weaknesses and measure the
              impact of every resume update.

            </p>

          </div>

        </div>

      </motion.div>

      {/* Footer Summary */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .55,
        }}
        className="mt-10 flex flex-col gap-5 border-t pt-8 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>

          <h3 className="text-lg font-semibold">

            Resume Analytics

          </h3>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">

            {filteredResumes.length} resume
            {filteredResumes.length === 1
              ? ""
              : "s"}{" "}
            displayed.

            Continue improving your ATS score by
            analyzing updated versions of your resume.

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

            {filteredResumes.length} Results

          </div>

          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            AI Powered

          </div>

        </div>

      </motion.div>

    </motion.section>

  );

}