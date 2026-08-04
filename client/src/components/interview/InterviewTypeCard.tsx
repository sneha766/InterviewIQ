import { motion } from "framer-motion";

import {
  ArrowRight,
  Clock3,
  BrainCircuit,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { Button } from "../ui/button";

export type InterviewType =
  | "hr"
  | "technical"
  | "coding";

interface InterviewTypeCardProps {

  type: InterviewType;

  title: string;

  description: string;

  duration: string;

  difficulty: string;

  features: string[];

  icon: React.ReactNode;

  gradient: string;

  badge: string;

  onStart?: () => void;

}

export default function InterviewTypeCard({

  title,

  description,

  duration,

  difficulty,

  features,

  icon,

  gradient,

  badge,

  onStart,

}: InterviewTypeCardProps) {

  return (

    <motion.div

      whileHover={{
        y: -8,
      }}

      transition={{
        duration: .25,
      }}

      className="group overflow-hidden rounded-[30px] border bg-white shadow-sm transition-all hover:shadow-xl"

    >

      {/* Hero */}

      <div
        className={`relative overflow-hidden p-8 ${gradient}`}
      >

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"/>

        <div className="relative flex items-start justify-between">

          <div className="rounded-3xl bg-white/20 p-4 text-white backdrop-blur">

            {icon}

          </div>

          <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">

            {badge}

          </div>

        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">

          {title}

        </h2>

        <p className="mt-4 leading-7 text-white/90">

          {description}

        </p>

      </div>

      {/* Body */}

      <div className="p-8">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Clock3 className="h-5 w-5 text-blue-600"/>

            <span className="font-medium">

              {duration}

            </span>

          </div>

          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold">

            {difficulty}

          </div>

        </div>

        <div className="mt-8 space-y-4">
                  {features.map((feature, index) => (

            <motion.div
              key={feature}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="flex items-start gap-3"
            >

              <div className="mt-1 rounded-full bg-green-100 p-1">

                <CheckCircle2 className="h-4 w-4 text-green-600"/>

              </div>

              <span className="leading-7 text-muted-foreground">

                {feature}

              </span>

            </motion.div>

          ))}

        </div>

        {/* AI Powered */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: .35,
          }}
          className="mt-8 rounded-2xl border bg-gradient-to-r from-blue-50 to-violet-50 p-5"
        >

          <div className="flex items-start gap-4">

            <div className="rounded-xl bg-blue-100 p-3">

              <BrainCircuit className="h-5 w-5 text-blue-600"/>

            </div>

            <div>

              <h3 className="font-semibold">

                AI Powered Evaluation

              </h3>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">

                Receive detailed AI feedback
                covering communication,
                technical accuracy,
                confidence,
                and improvement areas.

              </p>

            </div>

          </div>

        </motion.div>

        {/* CTA */}

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
          className="mt-8"
        >

          <Button
            className="group w-full justify-between rounded-2xl py-6 text-base"
            onClick={onStart}
          >

            <div className="flex items-center gap-3">

              <Sparkles className="h-5 w-5"/>

              Start AI Interview

            </div>

            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1"/>

          </Button>

        </motion.div>

      </div>
            {/* Footer */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.55,
        }}
        className="border-t bg-slate-50 px-8 py-6"
      >

        <div className="grid gap-6 sm:grid-cols-3">

          <div>

            <p className="text-sm text-muted-foreground">

              Questions

            </p>

            <h3 className="mt-2 text-2xl font-bold">

              10+

            </h3>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              AI Feedback

            </p>

            <h3 className="mt-2 text-2xl font-bold">

              Instant

            </h3>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              Difficulty

            </p>

            <h3 className="mt-2 text-2xl font-bold">

              Adaptive

            </h3>

          </div>

        </div>

      </motion.div>

    </motion.div>

  );

}