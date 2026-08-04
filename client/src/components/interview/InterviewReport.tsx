import { motion, animate } from "framer-motion";
import { Button } from "../ui/button";
import {
  Award,
  BrainCircuit,
  TrendingUp,
  MessageCircle,
  Code2,
  Lightbulb,
  Share2,
  Download
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

interface QuestionFeedback {

  question: string;

  answer: string;

  feedback: string;

  score: number;

}

interface InterviewReportProps {

  overallScore: number;

  communicationScore: number;

  technicalScore: number;

  problemSolvingScore: number;

  confidenceScore: number;

  strengths: string[];

  improvements: string[];

  recommendations: string[];

  feedback: QuestionFeedback[];

}

export default function InterviewReport({

  overallScore,

  communicationScore,

  technicalScore,

  problemSolvingScore,

  confidenceScore,

  strengths,

  improvements,

  recommendations,

  feedback,

}: InterviewReportProps) {

  const [

    animatedScore,

    setAnimatedScore,

  ] = useState(0);

  useEffect(() => {

    const controls = animate(

      0,

      overallScore,

      {

        duration: 1.3,

        onUpdate(value) {

          setAnimatedScore(

            Math.round(value)

          );

        },

      }

    );

    return () => controls.stop();

  }, [overallScore]);

  const radius = 95;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (animatedScore / 100) *
      circumference;

  return (

    <motion.section

      initial={{

        opacity: 0,

      }}

      animate={{

        opacity: 1,

      }}

      className="rounded-[36px] border bg-white p-8 shadow-sm"

    >

      {/* Header */}

      <div className="mb-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-3xl bg-blue-100 p-4">

              <BrainCircuit className="h-8 w-8 text-blue-600"/>

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Interview Report

              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">

                Your interview has been
                analyzed by InterviewIQ AI.
                Review your performance,
                strengths,
                and personalized
                recommendations below.

              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-white">

          <p className="text-sm text-blue-100">

            Overall Rating

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {overallScore >= 90
              ? "Excellent"
              : overallScore >= 80
              ? "Very Good"
              : overallScore >= 70
              ? "Good"
              : overallScore >= 60
              ? "Average"
              : "Needs Improvement"}

          </h2>

        </div>

      </div>

      {/* Hero Score */}

      <div className="grid gap-10 xl:grid-cols-[320px,1fr]">
                {/* Overall Score */}

        <div className="flex flex-col items-center">

          <div className="relative h-60 w-60">

            <svg
              className="-rotate-90"
              width="240"
              height="240"
            >

              <circle
                cx="120"
                cy="120"
                r={radius}
                fill="transparent"
                stroke="#E5E7EB"
                strokeWidth="14"
              />

              <motion.circle
                cx="120"
                cy="120"
                r={radius}
                fill="transparent"
                stroke="#2563EB"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{
                  strokeDashoffset: offset,
                }}
                transition={{
                  duration: 1.2,
                }}
              />

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h2 className="text-6xl font-bold">

                {animatedScore}

              </h2>

              <p className="mt-2 text-muted-foreground">

                /100

              </p>

            </div>

          </div>

          <div className="mt-8 rounded-full bg-blue-100 px-6 py-3 font-semibold text-blue-700">

            Overall Performance

          </div>

        </div>

        {/* Metrics */}

        <div className="space-y-6">

          {[
            {
              title: "Communication",
              score: communicationScore,
              icon: (
                <MessageCircle className="h-6 w-6"/>
              ),
              color: "bg-blue-600",
            },
            {
              title: "Technical",
              score: technicalScore,
              icon: (
                <Code2 className="h-6 w-6"/>
              ),
              color: "bg-violet-600",
            },
            {
              title: "Problem Solving",
              score: problemSolvingScore,
              icon: (
                <Lightbulb className="h-6 w-6"/>
              ),
              color: "bg-amber-500",
            },
            {
              title: "Confidence",
              score: confidenceScore,
              icon: (
                <TrendingUp className="h-6 w-6"/>
              ),
              color: "bg-emerald-600",
            },
          ].map(metric => (

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
              className="rounded-3xl border bg-slate-50 p-6"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="rounded-2xl bg-white p-3 shadow-sm">

                    {metric.icon}

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      {metric.title}

                    </h3>

                    <p className="text-sm text-muted-foreground">

                      AI Evaluation

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <h2 className="text-3xl font-bold">

                    {metric.score}

                  </h2>

                  <p className="text-xs text-muted-foreground">

                    /100

                  </p>

                </div>

              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${metric.score}%`,
                  }}
                  transition={{
                    duration: 1.1,
                  }}
                  className={`h-full rounded-full ${metric.color}`}
                />

              </div>

            </motion.div>

          ))}

        </div>

      </div>
            {/* Performance Summary */}

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
          delay: .3,
        }}
        className="mt-12 grid gap-8 xl:grid-cols-2"
      >

        {/* Strengths */}

        <div className="rounded-[30px] border bg-white p-8 shadow-sm">

          <div className="mb-8 flex items-center gap-4">

            <div className="rounded-2xl bg-emerald-100 p-4">

              <Award className="h-7 w-7 text-emerald-600"/>

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Strengths

              </h2>

              <p className="mt-2 text-sm text-muted-foreground">

                Areas where you performed well.

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
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * .08,
                  }}
                  className="flex items-start gap-4 rounded-2xl bg-emerald-50 p-5"
                >

                  <div className="rounded-full bg-emerald-100 p-2">

                    <Award className="h-5 w-5 text-emerald-600"/>

                  </div>

                  <div>

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

              <div className="rounded-2xl border border-dashed py-12 text-center">

                <p className="text-muted-foreground">

                  No strengths available.

                </p>

              </div>

            )}

          </div>

        </div>

        {/* Improvements */}

        <div className="rounded-[30px] border bg-white p-8 shadow-sm">

          <div className="mb-8 flex items-center gap-4">

            <div className="rounded-2xl bg-amber-100 p-4">

              <TrendingUp className="h-7 w-7 text-amber-600"/>

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Areas to Improve

              </h2>

              <p className="mt-2 text-sm text-muted-foreground">

                Opportunities for future interviews.

              </p>

            </div>

          </div>

          <div className="space-y-5">

            {improvements.length > 0 ? (

              improvements.map((item, index) => (

                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * .08,
                  }}
                  className="flex items-start gap-4 rounded-2xl bg-amber-50 p-5"
                >

                  <div className="rounded-full bg-amber-100 p-2">

                    <TrendingUp className="h-5 w-5 text-amber-600"/>

                  </div>

                  <div>

                    <h4 className="font-semibold">

                      Improvement {index + 1}

                    </h4>

                    <p className="mt-2 leading-7 text-muted-foreground">

                      {item}

                    </p>

                  </div>

                </motion.div>

              ))

            ) : (

              <div className="rounded-2xl border border-dashed py-12 text-center">

                <p className="text-muted-foreground">

                  No improvements available.

                </p>

              </div>

            )}

          </div>

        </div>

      </motion.div>

      {/* Performance Highlights */}

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
        className="mt-12 rounded-[30px] border bg-gradient-to-r from-blue-50 via-white to-violet-50 p-8"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">

            <TrendingUp className="h-7 w-7 text-blue-600"/>

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Performance Highlights

            </h2>

            <p className="mt-2 text-muted-foreground">

              AI generated summary of your interview.

            </p>

          </div>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-sm text-muted-foreground">

              Strongest Skill

            </p>

            <h3 className="mt-3 text-2xl font-bold">

              {Math.max(
                communicationScore,
                technicalScore,
                confidenceScore,
                problemSolvingScore
              ) === communicationScore
                ? "Communication"
                : Math.max(
                    communicationScore,
                    technicalScore,
                    confidenceScore,
                    problemSolvingScore
                  ) === technicalScore
                ? "Technical"
                : Math.max(
                    communicationScore,
                    technicalScore,
                    confidenceScore,
                    problemSolvingScore
                  ) === confidenceScore
                ? "Confidence"
                : "Problem Solving"}

            </h3>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-sm text-muted-foreground">

              Overall Rating

            </p>

            <h3 className="mt-3 text-2xl font-bold">

              {overallScore >= 90
                ? "Excellent"
                : overallScore >= 80
                ? "Very Good"
                : overallScore >= 70
                ? "Good"
                : "Average"}

            </h3>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-sm text-muted-foreground">

              Recommendation

            </p>

            <h3 className="mt-3 text-2xl font-bold">

              Keep Practicing

            </h3>

          </div>

        </div>

      </motion.div>
            {/* AI Recommendations */}

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
          delay: .5,
        }}
        className="mt-12 rounded-[32px] border bg-white p-8 shadow-sm"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-violet-100 p-4">

            <BrainCircuit className="h-7 w-7 text-violet-600"/>

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              AI Recommendations

            </h2>

            <p className="mt-2 text-sm text-muted-foreground">

              Personalized recommendations generated
              specifically for your interview performance.

            </p>

          </div>

        </div>

        <div className="mt-8 space-y-6">

          {recommendations.length > 0 ? (

            recommendations.map(
              (recommendation, index) => (

                <motion.div
                  key={recommendation}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * .08,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="rounded-[24px] border bg-gradient-to-r from-slate-50 to-white p-6 transition-all hover:border-violet-300 hover:shadow-md"
                >

                  <div className="flex gap-5">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white">

                      {index + 1}

                    </div>

                    <div className="flex-1">

                      <div className="flex items-center gap-3">

                        <Lightbulb className="h-5 w-5 text-amber-500"/>

                        <h3 className="text-lg font-semibold">

                          Recommendation {index + 1}

                        </h3>

                      </div>

                      <p className="mt-4 leading-8 text-muted-foreground">

                        {recommendation}

                      </p>

                    </div>

                  </div>

                </motion.div>

              )

            )

          ) : (

            <div className="rounded-[24px] border border-dashed py-16 text-center">

              <Lightbulb className="mx-auto h-10 w-10 text-violet-500"/>

              <h3 className="mt-5 text-xl font-semibold">

                Excellent Performance

              </h3>

              <p className="mt-3 text-muted-foreground">

                No additional recommendations are available.

              </p>

            </div>

          )}

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
          delay: .6,
        }}
        className="mt-12 rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <div className="flex items-center gap-4">

              <BrainCircuit className="h-8 w-8"/>

              <h2 className="text-3xl font-bold">

                AI Career Coach

              </h2>

            </div>

            <p className="mt-6 max-w-3xl leading-8 text-blue-100">

              Based on your interview,
              InterviewIQ AI recommends focusing on
              structured communication,
              deeper technical explanations,
              and providing real-world examples.

              Consistent practice will significantly
              improve your interview performance.

            </p>

          </div>

          <div className="rounded-[28px] bg-white/10 p-8 backdrop-blur">

            <p className="text-blue-100">

              Estimated Improvement

            </p>

            <h2 className="mt-3 text-6xl font-bold">

              +15%

            </h2>

            <p className="mt-3 text-blue-100">

              After 5 practice interviews

            </p>

          </div>

        </div>

      </motion.div>
            {/* Question Feedback */}

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
          delay: .7,
        }}
        className="mt-12 rounded-[32px] border bg-white p-8 shadow-sm"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">

            <MessageCircle className="h-7 w-7 text-blue-600"/>

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Question-by-Question Review

            </h2>

            <p className="mt-2 text-sm text-muted-foreground">

              AI feedback for every interview response.

            </p>

          </div>

        </div>

        <div className="mt-10 space-y-8">

          {feedback.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .08,
              }}
              className="overflow-hidden rounded-[28px] border bg-slate-50"
            >

              {/* Header */}

              <div className="border-b bg-white p-6">

                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                  <div>

                    <p className="text-sm text-muted-foreground">

                      Question {index + 1}

                    </p>

                    <h3 className="mt-3 text-xl font-semibold leading-8">

                      {item.question}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-blue-600 px-6 py-4 text-center text-white">

                    <p className="text-xs text-blue-100">

                      AI Score

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                      {item.score}

                    </h2>

                  </div>

                </div>

              </div>

              {/* User Answer */}

              <div className="border-b p-6">

                <h4 className="mb-4 text-lg font-semibold">

                  Your Answer

                </h4>

                <div className="rounded-2xl bg-white p-6">

                  <p className="leading-8 text-muted-foreground">

                    {item.answer}

                  </p>

                </div>

              </div>

              {/* AI Feedback */}

              <div className="p-6">

                <h4 className="mb-4 text-lg font-semibold">

                  AI Feedback

                </h4>

                <div className="rounded-2xl bg-blue-50 p-6">

                  <p className="leading-8 text-muted-foreground">

                    {item.feedback}

                  </p>

                </div>

                <div className="mt-6">

                  <div className="mb-3 flex items-center justify-between">

                    <span className="font-medium">

                      Performance

                    </span>

                    <span className="font-semibold">

                      {item.score}%

                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${item.score}%`,
                      }}
                      transition={{
                        duration: 1,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                    />

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.div>
            {/* Interview Analytics */}

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
          delay: .8,
        }}
        className="mt-12 rounded-[32px] border bg-white p-8 shadow-sm"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-violet-100 p-4">

            <TrendingUp className="h-7 w-7 text-violet-600"/>

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Interview Analytics

            </h2>

            <p className="mt-2 text-sm text-muted-foreground">

              AI generated insights based on your interview performance.

            </p>

          </div>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">

          <div className="rounded-3xl bg-slate-50 p-6">

            <p className="text-sm text-muted-foreground">

              Overall Score

            </p>

            <h2 className="mt-3 text-4xl font-bold">

              {overallScore}%

            </h2>

            <p className="mt-3 text-sm text-muted-foreground">

              Final evaluation

            </p>

          </div>

          <div className="rounded-3xl bg-slate-50 p-6">

            <p className="text-sm text-muted-foreground">

              Strongest Area

            </p>

            <h2 className="mt-3 text-xl font-bold">

              {Math.max(
                communicationScore,
                technicalScore,
                confidenceScore,
                problemSolvingScore
              ) === communicationScore
                ? "Communication"
                : Math.max(
                    communicationScore,
                    technicalScore,
                    confidenceScore,
                    problemSolvingScore
                  ) === technicalScore
                ? "Technical"
                : Math.max(
                    communicationScore,
                    technicalScore,
                    confidenceScore,
                    problemSolvingScore
                  ) === confidenceScore
                ? "Confidence"
                : "Problem Solving"}

            </h2>

            <p className="mt-3 text-sm text-muted-foreground">

              Highest scoring category

            </p>

          </div>

          <div className="rounded-3xl bg-slate-50 p-6">

            <p className="text-sm text-muted-foreground">

              Questions Reviewed

            </p>

            <h2 className="mt-3 text-4xl font-bold">

              {feedback.length}

            </h2>

            <p className="mt-3 text-sm text-muted-foreground">

              AI evaluated answers

            </p>

          </div>

          <div className="rounded-3xl bg-slate-50 p-6">

            <p className="text-sm text-muted-foreground">

              AI Confidence

            </p>

            <h2 className="mt-3 text-4xl font-bold">

              98%

            </h2>

            <p className="mt-3 text-sm text-muted-foreground">

              Evaluation confidence

            </p>

          </div>

        </div>

      </motion.div>

      {/* Performance Badges */}

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
          delay: .9,
        }}
        className="mt-12 rounded-[32px] border bg-gradient-to-r from-blue-50 via-white to-violet-50 p-8"
      >

        <h2 className="text-2xl font-bold">

          Performance Badges

        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 text-center shadow-sm">

            <Award className="mx-auto h-10 w-10 text-amber-500"/>

            <h3 className="mt-5 font-semibold">

              Top Performer

            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Overall score above 90%.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-sm">

            <MessageCircle className="mx-auto h-10 w-10 text-blue-600"/>

            <h3 className="mt-5 font-semibold">

              Great Communicator

            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Strong communication skills.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-sm">

            <Code2 className="mx-auto h-10 w-10 text-violet-600"/>

            <h3 className="mt-5 font-semibold">

              Technical Thinker

            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Demonstrated technical knowledge.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-sm">

            <Lightbulb className="mx-auto h-10 w-10 text-emerald-600"/>

            <h3 className="mt-5 font-semibold">

              Problem Solver

            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Excellent analytical thinking.

            </p>

          </div>

        </div>

      </motion.div>
            {/* Action Center */}

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
          delay: 1,
        }}
        className="mt-12 rounded-[32px] border bg-white p-8 shadow-sm"
      >

        <div className="mb-10">

          <h2 className="text-2xl font-bold">

            Action Center

          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">

            Continue improving your interview
            skills or save this report for
            future reference.

          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-5">

          {/* Retry */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >

            <div className="rounded-2xl bg-blue-100 p-4 w-fit">

              <BrainCircuit className="h-6 w-6 text-blue-600"/>

            </div>

            <h3 className="mt-6 text-lg font-semibold">

              Retry Interview

            </h3>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">

              Practice again using
              different AI-generated
              interview questions.

            </p>

            <Button
              className="mt-6 w-full rounded-xl"
            >

              Retry

            </Button>

          </motion.div>

          {/* Download */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >

            <div className="rounded-2xl bg-emerald-100 p-4 w-fit">

              <Download className="h-6 w-6 text-emerald-600"/>

            </div>

            <h3 className="mt-6 text-lg font-semibold">

              Download PDF

            </h3>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">

              Export your interview
              report as a beautifully
              formatted PDF.

            </p>

            <Button
              variant="outline"
              className="mt-6 w-full rounded-xl"
            >

              Download

            </Button>

          </motion.div>

          {/* Share */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >

            <div className="rounded-2xl bg-violet-100 p-4 w-fit">

              <Share2 className="h-6 w-6 text-violet-600"/>

            </div>

            <h3 className="mt-6 text-lg font-semibold">

              Share Report

            </h3>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">

              Share your interview
              results with mentors
              or recruiters.

            </p>

            <Button
              variant="outline"
              className="mt-6 w-full rounded-xl"
            >

              Share

            </Button>

          </motion.div>

          {/* Compare */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >

            <div className="rounded-2xl bg-amber-100 p-4 w-fit">

              <TrendingUp className="h-6 w-6 text-amber-600"/>

            </div>

            <h3 className="mt-6 text-lg font-semibold">

              Compare

            </h3>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">

              Compare this report
              with your previous
              interview attempts.

            </p>

            <Button
              variant="outline"
              className="mt-6 w-full rounded-xl"
            >

              Compare

            </Button>

          </motion.div>

          {/* Dashboard */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-3xl border bg-slate-50 p-6"
          >

            <div className="rounded-2xl bg-slate-200 p-4 w-fit">

              <Award className="h-6 w-6"/>

            </div>

            <h3 className="mt-6 text-lg font-semibold">

              Dashboard

            </h3>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">

              Return to your
              interview dashboard
              and continue learning.

            </p>

            <Button
              variant="secondary"
              className="mt-6 w-full rounded-xl"
            >

              Dashboard

            </Button>

          </motion.div>

        </div>

      </motion.div>

      {/* AI Next Steps */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.1,
        }}
        className="mt-12 rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h2 className="text-3xl font-bold">

              Recommended Next Step

            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-blue-100">

              Complete another interview
              within the next 24 hours
              to reinforce what you've
              learned while the feedback
              is still fresh.

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

            <p className="text-blue-100">

              Recommended Practice

            </p>

            <h2 className="mt-3 text-5xl font-bold">

              30 min

            </h2>

            <p className="mt-3 text-blue-100">

              Tomorrow

            </p>

          </div>

        </div>

      </motion.div>
            {/* Completion Banner */}

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
          delay: 1.2,
        }}
        className="mt-12 rounded-[32px] border bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-8"
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-emerald-100 p-4">

                <Award className="h-8 w-8 text-emerald-600"/>

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  Interview Completed Successfully

                </h2>

                <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">

                  Your interview has been fully analyzed.
                  Continue practicing regularly to build
                  confidence, improve communication,
                  and strengthen your technical interview
                  performance.

                </p>

              </div>

            </div>

          </div>

          <div className="rounded-[28px] bg-white p-8 shadow">

            <p className="text-sm text-muted-foreground">

              Final Score

            </p>

            <h2 className="mt-3 text-6xl font-bold">

              {overallScore}

            </h2>

            <p className="mt-2 text-sm text-muted-foreground">

              AI Evaluated

            </p>

          </div>

        </div>

      </motion.div>

      {/* AI Footer */}

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
        className="mt-12 border-t pt-10"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <BrainCircuit className="h-6 w-6 text-blue-600"/>

              <h3 className="text-xl font-bold">

                InterviewIQ AI

              </h3>

            </div>

            <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">

              Every interview is evaluated using AI-driven
              communication analysis, technical assessment,
              confidence scoring, and structured feedback to
              help you continuously improve your interview
              performance.

            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <div className="rounded-full bg-blue-100 px-5 py-3 text-sm font-semibold text-blue-700">

              AI Powered

            </div>

            <div className="rounded-full bg-violet-100 px-5 py-3 text-sm font-semibold text-violet-700">

              Personalized Feedback

            </div>

            <div className="rounded-full bg-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-700">

              Interview Analytics

            </div>

          </div>

        </div>

      </motion.div>

    </motion.section>

  );

}