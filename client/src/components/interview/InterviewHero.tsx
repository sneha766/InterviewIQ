import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Clock3,
  Trophy,
} from "lucide-react";

import { Button } from "../ui/button";

interface InterviewHeroProps {
  totalInterviews: number;
  averageScore: number;
  onStartInterview?: () => void;
}

export default function InterviewHero({
  totalInterviews,
  averageScore,
  onStartInterview,
}: InterviewHeroProps) {
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
        duration: 0.35,
      }}
      className="relative overflow-hidden rounded-[32px] border bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 text-white shadow-xl"
    >
      {/* Decorative Blur */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-12 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">

            <Sparkles className="h-4 w-4" />

            <span className="text-sm font-medium">

              Gemini Powered AI Interviews

            </span>

          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">

            Practice AI Interviews
            <br />

            Like Real Companies

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">

            Prepare for HR,
            Technical,
            and Coding interviews
            with realistic AI-generated
            questions, live evaluation,
            and personalized feedback.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Button
              size="lg"
              className="rounded-xl bg-white text-blue-700 hover:bg-slate-100"
              onClick={onStartInterview}
            >
              Start Interview

              <ArrowRight className="ml-2 h-5 w-5" />

            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              View History
            </Button>

          </div>

        </div>

        {/* Right */}

        <div className="grid gap-5 sm:grid-cols-3 xl:grid-cols-1">
                  <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white/15 p-3">

                <BrainCircuit className="h-7 w-7"/>

              </div>

              <div>

                <p className="text-sm text-blue-100">

                  Interviews Completed

                </p>

                <h3 className="mt-1 text-4xl font-bold">

                  {totalInterviews}

                </h3>

              </div>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white/15 p-3">

                <Trophy className="h-7 w-7"/>

              </div>

              <div>

                <p className="text-sm text-blue-100">

                  Average Score

                </p>

                <h3 className="mt-1 text-4xl font-bold">

                  {averageScore}%

                </h3>

              </div>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white/15 p-3">

                <Clock3 className="h-7 w-7"/>

              </div>

              <div>

                <p className="text-sm text-blue-100">

                  Avg Session

                </p>

                <h3 className="mt-1 text-4xl font-bold">

                  18 min

                </h3>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

      {/* Highlights */}

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
          delay: 0.5,
        }}
        className="relative z-10 mt-12 grid gap-5 lg:grid-cols-4"
      >

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h4 className="text-lg font-semibold">

            HR Interview

          </h4>

          <p className="mt-3 text-sm leading-6 text-blue-100">

            Behavioral and communication
            interviews based on STAR methodology.

          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h4 className="text-lg font-semibold">

            Technical

          </h4>

          <p className="mt-3 text-sm leading-6 text-blue-100">

            System design,
            CS fundamentals,
            backend,
            frontend,
            and DSA discussions.

          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h4 className="text-lg font-semibold">

            Coding

          </h4>

          <p className="mt-3 text-sm leading-6 text-blue-100">

            Solve coding challenges with
            AI evaluation and detailed feedback.

          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h4 className="text-lg font-semibold">

            AI Feedback

          </h4>

          <p className="mt-3 text-sm leading-6 text-blue-100">

            Receive instant insights,
            strengths,
            weaknesses,
            and improvement suggestions.

          </p>

        </div>

      </motion.div>
            {/* Bottom CTA */}

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
        className="relative z-10 mt-12 rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur"
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              Ready to Practice?

            </h3>

            <p className="mt-4 max-w-2xl leading-8 text-blue-100">

              Start an AI interview tailored to your
              role, experience level, and preferred
              technology stack. Receive detailed
              feedback after every interview and
              continuously improve your performance.

            </p>

          </div>

          <Button
            size="lg"
            className="rounded-2xl bg-white px-8 py-6 text-blue-700 hover:bg-slate-100"
            onClick={onStartInterview}
          >

            Start Your Interview

            <ArrowRight className="ml-2 h-5 w-5"/>

          </Button>

        </div>

      </motion.div>

      {/* AI Features */}

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
        className="relative z-10 mt-8 flex flex-wrap justify-center gap-3"
      >

        {[
          "Realistic AI Questions",
          "Instant Evaluation",
          "Detailed Feedback",
          "Coding Challenges",
          "Behavioral Questions",
          "Technical Interviews",
        ].map((feature) => (

          <div
            key={feature}
            className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur"
          >

            {feature}

          </div>

        ))}

      </motion.div>

    </motion.section>

  );

}