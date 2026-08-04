import { useEffect, useMemo, useState } from "react";

import { motion, animate } from "framer-motion";

import {
  Award,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
  ShieldCheck,
  Brain,
  FileSearch,
} from "lucide-react";

interface ATSScoreCardProps {
  score: number;
  strengths: string[];
}

interface MetricCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  background: string;
}

export default function ATSScoreCard({
  score,
  strengths,
}: ATSScoreCardProps) {

  const [animatedScore, setAnimatedScore] =
    useState(0);

  const radius = 74;

  const circumference =
    2 * Math.PI * radius;

  useEffect(() => {

    const controls = animate(0, score, {

      duration: 1.6,

      ease: "easeOut",

      onUpdate(value) {
        setAnimatedScore(
          Math.round(value)
        );
      },

    });

    return () => controls.stop();

  }, [score]);

  const strokeOffset =
    circumference -
    (animatedScore / 100) *
      circumference;

  const scoreLabel = useMemo(() => {

    if (score >= 90)
      return "Outstanding";

    if (score >= 80)
      return "Excellent";

    if (score >= 70)
      return "Good";

    if (score >= 60)
      return "Average";

    return "Needs Improvement";

  }, [score]);

  const scoreColor = useMemo(() => {

    if (score >= 90)
      return "text-emerald-600";

    if (score >= 80)
      return "text-blue-600";

    if (score >= 70)
      return "text-violet-600";

    if (score >= 60)
      return "text-amber-600";

    return "text-red-600";

  }, [score]);

  const scoreBg = useMemo(() => {

    if (score >= 90)
      return "bg-emerald-100";

    if (score >= 80)
      return "bg-blue-100";

    if (score >= 70)
      return "bg-violet-100";

    if (score >= 60)
      return "bg-amber-100";

    return "bg-red-100";

  }, [score]);

  const metrics: MetricCard[] = [

    {
      title: "Keyword Match",
      value: Math.min(score + 4, 100),
      icon: (
        <Target className="h-5 w-5"/>
      ),
      color: "text-blue-600",
      background: "bg-blue-100",
    },

    {
      title: "Formatting",
      value: Math.max(score - 3, 60),
      icon: (
        <FileSearch className="h-5 w-5"/>
      ),
      color: "text-violet-600",
      background: "bg-violet-100",
    },

    {
      title: "Readability",
      value: Math.min(score + 2, 100),
      icon: (
        <Brain className="h-5 w-5"/>
      ),
      color: "text-emerald-600",
      background: "bg-emerald-100",
    },

    {
      title: "Recruiter Ready",
      value: Math.min(score + 1, 100),
      icon: (
        <ShieldCheck className="h-5 w-5"/>
      ),
      color: "text-amber-600",
      background: "bg-amber-100",
    },

  ];

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

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className={`rounded-2xl p-4 ${scoreBg}`}>

              <Award
                className={`h-8 w-8 ${scoreColor}`}
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold tracking-tight">

                ATS Compatibility

              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">

                Your resume has been analyzed against
                modern Applicant Tracking Systems using
                formatting, keyword relevance,
                readability and recruiter best practices.

              </p>

            </div>

          </div>

        </div>

        <div className="hidden rounded-2xl border bg-slate-50 p-5 lg:block">

          <div className="flex items-center gap-3">

            <Sparkles className="h-5 w-5 text-blue-600"/>

            <div>

              <p className="font-semibold">

                AI Analysis Complete

              </p>

              <p className="text-xs text-muted-foreground">

                Generated using InterviewIQ AI

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="grid gap-10 xl:grid-cols-[330px,1fr]">

        {/* Hero Score */}

        <div className="flex flex-col items-center">
                    <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="relative"
          >
            <svg
              width="210"
              height="210"
              className="-rotate-90"
            >
              <defs>

                <linearGradient
                  id="ats-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >

                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                  />

                  <stop
                    offset="100%"
                    stopColor="#7C3AED"
                  />

                </linearGradient>

              </defs>

              <circle
                cx="105"
                cy="105"
                r={radius}
                fill="transparent"
                stroke="#E5E7EB"
                strokeWidth="14"
              />

              <motion.circle
                cx="105"
                cy="105"
                r={radius}
                fill="transparent"
                stroke="url(#ats-gradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                initial={{
                  strokeDashoffset:
                    circumference,
                }}
                animate={{
                  strokeDashoffset:
                    strokeOffset,
                }}
                transition={{
                  duration: 1.6,
                }}
              />

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <motion.h2
                layout
                className="text-6xl font-bold"
              >
                {animatedScore}
              </motion.h2>

              <p className="text-muted-foreground">
                ATS Score
              </p>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .35,
            }}
            className={`mt-8 rounded-full px-6 py-3 text-sm font-semibold ${scoreBg} ${scoreColor}`}
          >

            {scoreLabel}

          </motion.div>

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
              delay: .45,
            }}
            className="mt-8 w-full rounded-3xl border bg-gradient-to-br from-blue-50 to-violet-50 p-6"
          >

            <div className="flex items-center gap-3">

              <TrendingUp className="h-6 w-6 text-blue-600"/>

              <h3 className="font-semibold">

                Recruiter Benchmark

              </h3>

            </div>

            <p className="mt-5 text-4xl font-bold text-blue-700">

              Top {Math.max(5, 100 - score)}%

            </p>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Your resume performs better than
              approximately{" "}

              <span className="font-semibold text-foreground">

                {Math.max(score, 55)}%

              </span>

              {" "}of analyzed resumes based on ATS
              compatibility.

            </p>

          </motion.div>

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
            className="mt-6 w-full rounded-3xl border bg-white p-6"
          >

            <div className="flex items-center gap-3">

              <Target className="h-5 w-5 text-blue-600"/>

              <h3 className="font-semibold">

                Recruiter Readiness

              </h3>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${score}%`,
                }}
                transition={{
                  duration: 1.5,
                }}
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
              />

            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">

              Based on formatting,
              keyword optimization,
              readability,
              and ATS compliance,
              your resume is

              <span className="font-semibold text-foreground">

                {" "}
                {score}% recruiter ready.

              </span>

            </p>

          </motion.div>

        </div>

        {/* Right Side */}

        <div className="space-y-8">
                    {/* ATS Metrics */}

          <div className="grid gap-5 md:grid-cols-2">

            {metrics.map((metric, index) => (

              <motion.div
                key={metric.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2 + index * 0.1,
                }}
                whileHover={{
                  y: -4,
                }}
                className="rounded-3xl border bg-white p-6 shadow-sm transition-all"
              >

                <div className="flex items-center justify-between">

                  <div
                    className={`rounded-2xl p-3 ${metric.background}`}
                  >
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </div>

                  <span className="text-2xl font-bold">
                    {metric.value}%
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {metric.title}
                </h3>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${metric.value}%`,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.15,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                  />

                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">

                  {metric.title === "Keyword Match" &&
                    "Strong keyword relevance improves ATS discoverability and recruiter visibility."}

                  {metric.title === "Formatting" &&
                    "A clean resume layout increases ATS parsing accuracy and readability."}

                  {metric.title === "Readability" &&
                    "Clear language and concise content help recruiters scan your resume quickly."}

                  {metric.title === "Recruiter Ready" &&
                    "Overall hiring readiness based on ATS optimization and resume quality."}

                </p>

              </motion.div>

            ))}

          </div>

          {/* Resume Strengths */}

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
            className="rounded-3xl border bg-white p-7 shadow-sm"
          >

            <div className="mb-7 flex items-center gap-3">

              <CheckCircle2 className="h-6 w-6 text-green-600"/>

              <div>

                <h3 className="text-xl font-semibold">

                  Resume Strengths

                </h3>

                <p className="text-sm text-muted-foreground">

                  Areas where your resume already performs well.

                </p>

              </div>

            </div>

            <div className="space-y-5">

              {strengths.length > 0 ? (

                strengths.map((strength, index) => (

                  <motion.div
                    key={strength}
                    initial={{
                      opacity: 0,
                      x: -25,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        .1 * index,
                    }}
                    className="flex gap-5"
                  >

                    <div className="flex flex-col items-center">

                      <div className="rounded-full bg-green-100 p-2">

                        <CheckCircle2 className="h-5 w-5 text-green-600"/>

                      </div>

                      {index !== strengths.length - 1 && (

                        <div className="mt-2 h-full w-[2px] bg-green-200"/>

                      )}

                    </div>

                    <div className="flex-1 rounded-2xl border bg-slate-50 p-5">

                      <h4 className="font-semibold">

                        Strength {index + 1}

                      </h4>

                      <p className="mt-2 leading-7 text-muted-foreground">

                        {strength}

                      </p>

                    </div>

                  </motion.div>

                ))

              ) : (

                <div className="rounded-2xl border border-dashed p-10 text-center">

                  <CheckCircle2 className="mx-auto h-10 w-10 text-green-600"/>

                  <h3 className="mt-4 text-lg font-semibold">

                    Excellent Resume

                  </h3>

                  <p className="mt-3 text-sm text-muted-foreground">

                    Your resume already follows most ATS
                    best practices.

                  </p>

                </div>

              )}

            </div>

          </motion.div>

          {/* AI Summary */}

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
              delay: .6,
            }}
            className="rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white"
          >

            <div className="flex items-start gap-5">

              <Sparkles className="mt-1 h-8 w-8 shrink-0"/>

              <div>

                <h3 className="text-xl font-semibold">

                  AI Resume Summary

                </h3>

                <p className="mt-4 leading-8 text-blue-100">

                  {score >= 90 &&
                    "Outstanding resume. Your profile is highly optimized for Applicant Tracking Systems and should perform exceptionally well during recruiter screening."}

                  {score >= 80 &&
                    score < 90 &&
                    "Your resume is well optimized. Minor improvements in keywords and measurable achievements can further increase recruiter visibility."}

                  {score >= 70 &&
                    score < 80 &&
                    "Your resume is competitive but there is room for improvement. Focus on stronger action verbs, technical keywords, and quantified achievements."}

                  {score < 70 &&
                    "Your resume needs additional optimization. Improve formatting, keyword density, measurable accomplishments, and project descriptions to maximize ATS performance."}

                </p>

              </div>

            </div>

          </motion.div>
                    {/* Overall Recommendation */}

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
              delay: 0.75,
            }}
            className="rounded-3xl border bg-white p-7 shadow-sm"
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <Award className="h-7 w-7 text-blue-600"/>

                  <h3 className="text-xl font-semibold">

                    Overall Recommendation

                  </h3>

                </div>

                <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">

                  Your resume demonstrates a
                  <span className="font-semibold text-foreground">
                    {" "}
                    {scoreLabel.toLowerCase()}
                  </span>{" "}
                  level of ATS optimization.

                  Continue refining measurable
                  achievements, technical keywords,
                  and role-specific skills to improve
                  recruiter visibility and interview
                  conversion rates.

                </p>

              </div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                className={`rounded-3xl px-8 py-6 text-center ${scoreBg}`}
              >

                <p className="text-sm font-medium text-muted-foreground">

                  ATS Grade

                </p>

                <h2 className={`mt-2 text-5xl font-bold ${scoreColor}`}>

                  {score >= 95
                    ? "A+"
                    : score >= 90
                    ? "A"
                    : score >= 80
                    ? "B+"
                    : score >= 70
                    ? "B"
                    : score >= 60
                    ? "C"
                    : "D"}

                </h2>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

    </motion.section>

  );

}