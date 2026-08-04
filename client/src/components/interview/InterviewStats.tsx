import { motion, animate } from "framer-motion";

import {
  BrainCircuit,
  Trophy,
  Target,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";

interface InterviewStatsProps {

  totalInterviews: number;

  averageScore: number;

  highestScore: number;

  totalPracticeHours: number;

  successRate: number;

}

interface StatCard {

  title: string;

  value: number;

  suffix?: string;

  icon: React.ReactNode;

  color: string;

  background: string;

  description: string;

}

export default function InterviewStats({

  totalInterviews,

  averageScore,

  highestScore,

  totalPracticeHours,

  successRate,

}: InterviewStatsProps) {

  const [animatedValues, setAnimatedValues] =
    useState([0, 0, 0, 0, 0]);

  const stats: StatCard[] = [

    {

      title: "Interviews",

      value: totalInterviews,

      icon: <BrainCircuit className="h-6 w-6"/>,

      color: "text-blue-600",

      background: "bg-blue-100",

      description:
        "Completed AI interviews",

    },

    {

      title: "Average Score",

      value: averageScore,

      suffix: "%",

      icon: <TrendingUp className="h-6 w-6"/>,

      color: "text-violet-600",

      background: "bg-violet-100",

      description:
        "Across all interviews",

    },

    {

      title: "Highest Score",

      value: highestScore,

      suffix: "%",

      icon: <Trophy className="h-6 w-6"/>,

      color: "text-amber-600",

      background: "bg-amber-100",

      description:
        "Personal best",

    },

    {

      title: "Practice Hours",

      value: totalPracticeHours,

      suffix: "h",

      icon: <Clock3 className="h-6 w-6"/>,

      color: "text-emerald-600",

      background: "bg-emerald-100",

      description:
        "Interview preparation",

    },

    {

      title: "Success Rate",

      value: successRate,

      suffix: "%",

      icon: <Target className="h-6 w-6"/>,

      color: "text-pink-600",

      background: "bg-pink-100",

      description:
        "Strong performance",

    },

  ];

  useEffect(() => {

    const controls = stats.map(
      (stat, index) =>

        animate(0, stat.value, {

          duration: 1.3,

          delay: index * .12,

          onUpdate(value) {

            setAnimatedValues(prev => {

              const next = [...prev];

              next[index] =
                Math.round(value);

              return next;

            });

          },

        })

    );

    return () => {

      controls.forEach(control =>
        control.stop()
      );

    };

  }, [
    totalInterviews,
    averageScore,
    highestScore,
    totalPracticeHours,
    successRate,
  ]);

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

      <div className="mb-10">

        <h2 className="text-3xl font-bold">

          Interview Statistics

        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">

          Track your interview
          performance,
          practice consistency,
          and overall progress
          over time.

        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-5">
            {stats.map((stat, index) => (

          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
            }}
            className="group rounded-[28px] border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
          >

            <div className="flex items-center justify-between">

              <div
                className={`rounded-2xl p-4 ${stat.background}`}
              >

                <div className={stat.color}>

                  {stat.icon}

                </div>

              </div>

              <div className="text-right">

                <p className="text-xs uppercase tracking-wide text-muted-foreground">

                  Live

                </p>

                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"/>

              </div>

            </div>

            <h3 className="mt-6 text-lg font-semibold">

              {stat.title}

            </h3>

            <div className="mt-4 flex items-end gap-1">

              <span className="text-5xl font-bold tracking-tight">

                {animatedValues[index]}

              </span>

              {stat.suffix && (

                <span className="mb-2 text-xl font-semibold text-muted-foreground">

                  {stat.suffix}

                </span>

              )}

            </div>

            <p className="mt-4 min-h-[48px] text-sm leading-6 text-muted-foreground">

              {stat.description}

            </p>

            {/* Progress */}

            <div className="mt-6">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs text-muted-foreground">

                  Progress

                </span>

                <span className="text-xs font-semibold">

                  {Math.min(stat.value, 100)}%

                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${Math.min(stat.value, 100)}%`,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.1,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                />

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {/* Overall Performance */}

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
        className="mt-10 rounded-3xl border bg-gradient-to-br from-blue-50 via-white to-violet-50 p-8"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              Overall Performance

            </h3>

            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">

              Your interview performance continues to
              improve through consistent practice.
              Keep completing AI interviews to improve
              communication, technical knowledge,
              and confidence.

            </p>

          </div>

          <div className="rounded-[28px] bg-gradient-to-r from-blue-600 to-violet-600 px-10 py-8 text-center text-white">

            <p className="text-blue-100">

              Overall Rating

            </p>

            <h2 className="mt-2 text-6xl font-bold">

              {averageScore >= 90
                ? "A+"
                : averageScore >= 80
                ? "A"
                : averageScore >= 70
                ? "B"
                : averageScore >= 60
                ? "C"
                : "D"}

            </h2>

          </div>

        </div>

      </motion.div>
            {/* AI Coaching */}

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
          delay: 0.55,
        }}
        className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3">

              <BrainCircuit className="h-7 w-7"/>

              <h3 className="text-2xl font-bold">

                AI Coaching Summary

              </h3>

            </div>

            <p className="mt-5 leading-8 text-blue-100">

              Consistent interview practice is one of
              the fastest ways to improve hiring
              outcomes. Focus on explaining your
              reasoning clearly, structuring answers,
              and solving problems confidently under
              time constraints.

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

            <p className="text-sm text-blue-100">

              Weekly Goal

            </p>

            <h2 className="mt-2 text-5xl font-bold">

              5

            </h2>

            <p className="mt-2 text-blue-100">

              Interviews

            </p>

          </div>

        </div>

      </motion.div>

      {/* Achievements */}

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
          delay: 0.65,
        }}
        className="mt-10 rounded-3xl border bg-white p-8 shadow-sm"
      >

        <h3 className="text-2xl font-bold">

          Recent Achievements

        </h3>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-blue-50 p-6">

            <div className="rounded-xl bg-blue-100 p-3 w-fit">

              <BrainCircuit className="h-6 w-6 text-blue-600"/>

            </div>

            <h4 className="mt-5 text-lg font-semibold">

              Interview Explorer

            </h4>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Completed your first AI interview.

            </p>

          </div>

          <div className="rounded-2xl bg-amber-50 p-6">

            <div className="rounded-xl bg-amber-100 p-3 w-fit">

              <Trophy className="h-6 w-6 text-amber-600"/>

            </div>

            <h4 className="mt-5 text-lg font-semibold">

              High Performer

            </h4>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Achieved an interview score above 90%.

            </p>

          </div>

          <div className="rounded-2xl bg-emerald-50 p-6">

            <div className="rounded-xl bg-emerald-100 p-3 w-fit">

              <Target className="h-6 w-6 text-emerald-600"/>

            </div>

            <h4 className="mt-5 text-lg font-semibold">

              Consistent Learner

            </h4>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Maintained steady interview practice.

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
          delay: 0.8,
        }}
        className="mt-10 flex flex-col gap-4 border-t pt-8 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>

          <h3 className="text-lg font-semibold">

            Keep Improving

          </h3>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">

            Regular interview practice combined with
            AI feedback helps you build confidence,
            improve communication, and perform better
            in real interviews.

          </p>

        </div>

        <div className="rounded-full bg-blue-100 px-5 py-3 text-sm font-semibold text-blue-700">

          InterviewIQ AI Analytics

        </div>

      </motion.div>

    </motion.section>

  );

}