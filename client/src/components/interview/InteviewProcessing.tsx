import { motion } from "framer-motion";

import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

interface InterviewProcessingProps {

  onComplete: () => void;

}

const steps = [

  "Collecting interview responses",

  "Analyzing communication skills",

  "Evaluating technical accuracy",

  "Measuring confidence",

  "Generating AI recommendations",

  "Preparing interview report",

];

export default function InterviewProcessing({

  onComplete,

}: InterviewProcessingProps) {

  const [

    progress,

    setProgress,

  ] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setProgress(prev => {

        if (prev >= 100) {

          clearInterval(interval);

          setTimeout(() => {

            onComplete();

          }, 700);

          return 100;

        }

        return prev + 2;

      });

    }, 120);

    return () => clearInterval(interval);

  }, [onComplete]);

  const activeStep = useMemo(() => {

    return Math.min(

      Math.floor(

        progress / (100 / steps.length)

      ),

      steps.length - 1

    );

  }, [progress]);

  return (

    <motion.section

      initial={{

        opacity: 0,

      }}

      animate={{

        opacity: 1,

      }}

      className="flex min-h-[80vh] items-center justify-center"

    >

      <div className="w-full max-w-5xl rounded-[36px] border bg-white p-10 shadow-xl">

        <div className="flex flex-col items-center text-center">

          <motion.div

            animate={{

              rotate: 360,

            }}

            transition={{

              duration: 8,

              repeat: Infinity,

              ease: "linear",

            }}

            className="rounded-full bg-blue-100 p-8"

          >

            <BrainCircuit className="h-16 w-16 text-blue-600"/>

          </motion.div>

          <h1 className="mt-10 text-5xl font-bold">

            AI is Evaluating

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">

            Please wait while InterviewIQ AI
            analyzes your interview responses
            and prepares personalized feedback.

          </p>
                    {/* Progress */}

          <div className="mt-12 w-full max-w-3xl">

            <div className="mb-4 flex items-center justify-between">

              <span className="font-medium">

                Overall Progress

              </span>

              <span className="font-bold">

                {progress}%

              </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-200">

              <motion.div
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: .25,
                }}
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"
              />

            </div>

          </div>

          {/* Current Stage */}

          <motion.div
            key={activeStep}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-10 rounded-3xl border bg-slate-50 p-7"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-blue-100 p-3">

                <Sparkles className="h-6 w-6 text-blue-600"/>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">

                  Current Step

                </p>

                <h3 className="mt-1 text-xl font-semibold">

                  {steps[activeStep]}

                </h3>

              </div>

            </div>

          </motion.div>

          {/* Processing Steps */}

          <div className="mt-10 w-full max-w-3xl space-y-4">

            {steps.map((step, index) => {

              const completed =
                index < activeStep;

              const current =
                index === activeStep;

              return (

                <motion.div
                  key={step}
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
                  className={`flex items-center justify-between rounded-2xl border p-5 transition-all ${
                    current
                      ? "border-blue-300 bg-blue-50"
                      : completed
                      ? "border-emerald-300 bg-emerald-50"
                      : "bg-white"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    {completed ? (

                      <div className="rounded-full bg-emerald-100 p-2">

                        <CheckCircle2 className="h-5 w-5 text-emerald-600"/>

                      </div>

                    ) : current ? (

                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="rounded-full bg-blue-100 p-2"
                      >

                        <BrainCircuit className="h-5 w-5 text-blue-600"/>

                      </motion.div>

                    ) : (

                      <div className="h-9 w-9 rounded-full border-2 border-slate-300"/>

                    )}

                    <span className="font-medium">

                      {step}

                    </span>

                  </div>

                  <div>

                    {completed ? (

                      <span className="text-sm font-semibold text-emerald-600">

                        Complete

                      </span>

                    ) : current ? (

                      <span className="text-sm font-semibold text-blue-600">

                        Processing...

                      </span>

                    ) : (

                      <span className="text-sm text-muted-foreground">

                        Waiting

                      </span>

                    )}

                  </div>

                </motion.div>

              );

            })}

          </div>
                    {/* AI Metrics */}

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
              delay: .4,
            }}
            className="mt-10 grid w-full max-w-3xl gap-6 md:grid-cols-3"
          >

            <div className="rounded-3xl bg-slate-50 p-6">

              <p className="text-sm text-muted-foreground">

                Responses

              </p>

              <h2 className="mt-3 text-4xl font-bold">

                {progress >= 100 ? "✓" : "..."}

              </h2>

              <p className="mt-3 text-sm text-muted-foreground">

                Successfully processed

              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-6">

              <p className="text-sm text-muted-foreground">

                AI Models

              </p>

              <h2 className="mt-3 text-4xl font-bold">

                3

              </h2>

              <p className="mt-3 text-sm text-muted-foreground">

                Evaluation pipelines

              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-6">

              <p className="text-sm text-muted-foreground">

                Report Status

              </p>

              <h2 className="mt-3 text-4xl font-bold">

                {progress >= 100 ? "Ready" : "..."}

              </h2>

              <p className="mt-3 text-sm text-muted-foreground">

                Preparing insights

              </p>

            </div>

          </motion.div>

          {/* Redirect */}

          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-6 text-white"
          >

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <div>

                <h3 className="text-xl font-bold">

                  Preparing Interview Report

                </h3>

                <p className="mt-2 text-blue-100">

                  You'll be redirected automatically
                  once evaluation is complete.

                </p>

              </div>

              <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur">

                <p className="text-sm text-blue-100">

                  Redirect

                </p>

                <h2 className="text-3xl font-bold">

                  {progress >= 100
                    ? "Now"
                    : "Soon"}

                </h2>

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
              delay: .6,
            }}
            className="mt-10 border-t pt-8"
          >

            <p className="text-center text-sm leading-7 text-muted-foreground">

              InterviewIQ AI securely evaluates your
              interview using multiple AI models to
              generate detailed performance analysis,
              technical feedback,
              communication insights,
              and personalized improvement
              recommendations.

            </p>

          </motion.div>

        </div>

      </div>

    </motion.section>

  );

}