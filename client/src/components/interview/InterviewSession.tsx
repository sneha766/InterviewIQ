import { motion } from "framer-motion";

import {

  Clock3,

  ChevronLeft,

  ChevronRight,

  BrainCircuit,

  CheckCircle2,

} from "lucide-react";

import {

  useEffect,

  useMemo,

  useState,

} from "react";

import { Button } from "../ui/button";

interface InterviewQuestion {

  id: string;

  question: string;

}

interface InterviewSessionProps {

  questions: InterviewQuestion[];

  duration: number;

  onFinish: (
    answers: Record<string, string>
  ) => void;

}

export default function InterviewSession({

  questions,

  duration,

  onFinish,

}: InterviewSessionProps) {

  const [

    currentQuestion,

    setCurrentQuestion,

  ] = useState(0);

  const [

    remainingSeconds,

    setRemainingSeconds,

  ] = useState(duration * 60);

  const [

    answers,

    setAnswers,

  ] = useState<Record<string, string>>({});

  useEffect(() => {

    const timer = setInterval(() => {

      setRemainingSeconds(prev => {

        if (prev <= 1) {

          clearInterval(timer);

          onFinish(answers);

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [answers, onFinish]);

  const question =

    questions[currentQuestion];

  const progress =

    ((currentQuestion + 1) /

      questions.length) * 100;

  const formattedTime =

    useMemo(() => {

      const minutes = Math.floor(

        remainingSeconds / 60

      );

      const seconds =

        remainingSeconds % 60;

      return `${minutes}:${seconds

        .toString()

        .padStart(2, "0")}`;

    }, [remainingSeconds]);

  return (

    <motion.section

      initial={{

        opacity: 0,

      }}

      animate={{

        opacity: 1,

      }}

      className="rounded-[32px] border bg-white p-8 shadow-sm"

    >

      {/* Header */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-3xl bg-blue-100 p-4">

              <BrainCircuit className="h-8 w-8 text-blue-600"/>

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                AI Interview

              </h2>

              <p className="mt-2 text-sm text-muted-foreground">

                Question

                {currentQuestion + 1}

                of

                {questions.length}

              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-red-50 px-6 py-4">

          <div className="flex items-center gap-3">

            <Clock3 className="h-6 w-6 text-red-600"/>

            <div>

              <p className="text-xs text-red-500">

                Time Remaining

              </p>

              <h3 className="text-2xl font-bold text-red-600">

                {formattedTime}

              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-10">

        <div className="mb-3 flex items-center justify-between">

          <span className="font-medium">

            Interview Progress

          </span>

          <span className="text-sm text-muted-foreground">

            {Math.round(progress)}%

          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <motion.div

            animate={{

              width: `${progress}%`,

            }}

            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"

          />

        </div>

      </div>
            {/* Question Card */}

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
          delay: .2,
        }}
        className="mt-10 rounded-[30px] border bg-gradient-to-br from-slate-50 to-white p-8"
      >

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-blue-100 p-3">

            <BrainCircuit className="h-6 w-6 text-blue-600"/>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              Current Question

            </p>

            <h3 className="text-lg font-semibold">

              AI Generated

            </h3>

          </div>

        </div>

        <motion.h2
          key={question.id}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .25,
          }}
          className="mt-8 text-3xl font-bold leading-relaxed"
        >

          {question.question}

        </motion.h2>

      </motion.div>

      {/* Answer */}

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
        className="mt-10 rounded-[30px] border bg-white p-8 shadow-sm"
      >

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              Your Answer

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              Explain your thought process clearly.

            </p>

          </div>

          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

            Auto Save

          </div>

        </div>

        <textarea
          value={
            answers[question.id] ?? ""
          }
          onChange={(e) =>
            setAnswers((prev) => ({
              ...prev,
              [question.id]:
                e.target.value,
            }))
          }
          placeholder="Type your answer here..."
          className="min-h-[320px] w-full resize-none rounded-2xl border p-6 text-base leading-8 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

          <div className="flex gap-3">

            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">

              Words{" "}
              {
                (
                  answers[
                    question.id
                  ] ?? ""
                )
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .length
              }

            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">

              Characters{" "}
              {
                (
                  answers[
                    question.id
                  ] ?? ""
                ).length
              }

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            <CheckCircle2 className="h-4 w-4"/>

            Saved

          </div>

        </div>

      </motion.div>
            {/* Navigation */}

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
        className="mt-10 rounded-[30px] border bg-white p-8 shadow-sm"
      >

        <div className="flex flex-wrap items-center justify-between gap-5">

          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.max(prev - 1, 0)
              )
            }
          >

            <ChevronLeft className="mr-2 h-4 w-4"/>

            Previous

          </Button>

          <div className="flex flex-wrap justify-center gap-2">

            {questions.map((q, index) => {

              const answered =
                Boolean(
                  answers[q.id]?.trim()
                );

              return (

                <motion.button
                  key={q.id}
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: .95,
                  }}
                  onClick={() =>
                    setCurrentQuestion(index)
                  }
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
                    currentQuestion === index
                      ? "border-blue-600 bg-blue-600 text-white"
                      : answered
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "hover:border-blue-300"
                  }`}
                >

                  {index + 1}

                </motion.button>

              );

            })}

          </div>

          <Button
            disabled={
              currentQuestion ===
              questions.length - 1
            }
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(
                  prev + 1,
                  questions.length - 1
                )
              )
            }
          >

            Next

            <ChevronRight className="ml-2 h-4 w-4"/>

          </Button>

        </div>

        {/* Progress Summary */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-sm text-muted-foreground">

              Answered

            </p>

            <h3 className="mt-3 text-3xl font-bold">

              {
                Object.values(
                  answers
                ).filter(
                  answer =>
                    answer.trim().length > 0
                ).length
              }

            </h3>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-sm text-muted-foreground">

              Remaining

            </p>

            <h3 className="mt-3 text-3xl font-bold">

              {
                questions.length -
                Object.values(
                  answers
                ).filter(
                  answer =>
                    answer.trim().length > 0
                ).length
              }

            </h3>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-sm text-muted-foreground">

              Completion

            </p>

            <h3 className="mt-3 text-3xl font-bold">

              {Math.round(
                (Object.values(
                  answers
                ).filter(
                  answer =>
                    answer.trim().length > 0
                ).length /
                  questions.length) *
                  100
              )}
              %

            </h3>

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
          delay: 0.5,
        }}
        className="mt-10 rounded-[30px] border bg-white p-8 shadow-sm"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              Interview Controls

            </h3>

            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">

              Save your progress,
              clear your current response,
              or finish the interview once
              you've answered every question.

            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <Button
              variant="outline"
              onClick={() =>

                setAnswers((prev) => ({
                  ...prev,
                  [question.id]: "",
                }))

              }
            >

              Reset Answer

            </Button>

            <Button
              variant="secondary"
            >

              Save Draft

            </Button>

            <Button
              className="rounded-xl"
              onClick={() =>
                onFinish(answers)
              }
            >

              Finish Interview

            </Button>

          </div>

        </div>

      </motion.div>

      {/* AI Tips */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.6,
        }}
        className="mt-10 rounded-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-white/15 p-4">

            <BrainCircuit className="h-7 w-7"/>

          </div>

          <div>

            <h3 className="text-2xl font-bold">

              AI Interview Tips

            </h3>

            <p className="mt-5 max-w-4xl leading-8 text-blue-100">

              Think aloud while solving problems.
              Explain trade-offs,
              mention alternative approaches,
              and communicate your reasoning
              clearly. InterviewIQ AI evaluates
              both technical correctness and
              communication quality.

            </p>

          </div>

        </div>

      </motion.div>

      {/* Keyboard Shortcuts */}

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
        className="mt-10 rounded-[30px] border bg-slate-50 p-8"
      >

        <h3 className="text-xl font-bold">

          Keyboard Shortcuts

        </h3>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div>

            <kbd className="rounded-lg border bg-white px-3 py-2 font-mono">

              ←

            </kbd>

            <p className="mt-4 text-sm text-muted-foreground">

              Previous Question

            </p>

          </div>

          <div>

            <kbd className="rounded-lg border bg-white px-3 py-2 font-mono">

              →

            </kbd>

            <p className="mt-4 text-sm text-muted-foreground">

              Next Question

            </p>

          </div>

          <div>

            <kbd className="rounded-lg border bg-white px-3 py-2 font-mono">

              Ctrl + S

            </kbd>

            <p className="mt-4 text-sm text-muted-foreground">

              Save Draft

            </p>

          </div>

          <div>

            <kbd className="rounded-lg border bg-white px-3 py-2 font-mono">

              Ctrl + Enter

            </kbd>

            <p className="mt-4 text-sm text-muted-foreground">

              Finish Interview

            </p>

          </div>

        </div>

      </motion.div>
            {/* Finish Review */}

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
        className="mt-10 rounded-[32px] border border-amber-200 bg-amber-50 p-8"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h3 className="text-2xl font-bold text-amber-800">

              Before You Finish

            </h3>

            <p className="mt-4 max-w-3xl leading-8 text-amber-700">

              Make sure you've reviewed every
              response before submitting.
              Once submitted,
              InterviewIQ AI will begin
              evaluating your interview and
              generating a detailed report.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <p className="text-sm text-muted-foreground">

              Questions Answered

            </p>

            <h2 className="mt-2 text-5xl font-bold">

              {
                Object.values(answers).filter(
                  answer =>
                    answer.trim().length > 0
                ).length
              }

              /

              {questions.length}

            </h2>

          </div>

        </div>

      </motion.div>

      {/* Review Grid */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .9,
        }}
        className="mt-10 rounded-[30px] border bg-white p-8 shadow-sm"
      >

        <h3 className="text-2xl font-bold">

          Question Overview

        </h3>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">

          {questions.map((questionItem, index) => {

            const answered =
              Boolean(
                answers[
                  questionItem.id
                ]?.trim()
              );

            return (

              <motion.button
                key={questionItem.id}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: .97,
                }}
                onClick={() =>
                  setCurrentQuestion(index)
                }
                className={`rounded-2xl border p-5 transition-all ${
                  answered
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-red-200 bg-red-50"
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="font-semibold">

                    Q{index + 1}

                  </span>

                  {answered ? (

                    <CheckCircle2 className="h-5 w-5 text-emerald-600"/>

                  ) : (

                    <div className="h-3 w-3 rounded-full bg-red-500"/>

                  )}

                </div>

                <p className="mt-4 text-left text-xs leading-6 text-muted-foreground">

                  {answered
                    ? "Answered"
                    : "Not Answered"}

                </p>

              </motion.button>

            );

          })}

        </div>

      </motion.div>

      {/* Final Actions */}

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
        className="mt-10 flex flex-col gap-5 border-t pt-8 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>

          <h3 className="text-xl font-bold">

            Ready to Submit?

          </h3>

          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">

            Your answers will be sent to
            InterviewIQ AI for evaluation.
            You'll receive detailed feedback,
            scores,
            strengths,
            weaknesses,
            and personalized recommendations.

          </p>

        </div>

        <div className="flex flex-wrap gap-4">

          <Button
            variant="outline"
          >

            Continue Reviewing

          </Button>

          <Button
            size="lg"
            className="rounded-2xl px-8"
            onClick={() =>
              onFinish(answers)
            }
          >

            Submit Interview

          </Button>

        </div>

      </motion.div>
            {/* AI Processing */}

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
        className="mt-10 rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <BrainCircuit className="h-7 w-7"/>

              <h2 className="text-2xl font-bold">

                AI Evaluation Pipeline

              </h2>

            </div>

            <p className="mt-5 max-w-3xl leading-8 text-blue-100">

              Once submitted,
              InterviewIQ AI evaluates every answer
              for technical accuracy,
              communication,
              confidence,
              clarity,
              and problem-solving ability.

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

            <p className="text-blue-100">

              Estimated Evaluation

            </p>

            <h2 className="mt-3 text-5xl font-bold">

              8-15s

            </h2>

            <p className="mt-2 text-blue-100">

              AI Processing Time

            </p>

          </div>

        </div>

      </motion.div>

      {/* Session Summary */}

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
        className="mt-10 rounded-[32px] border bg-slate-50 p-8"
      >

        <h3 className="text-2xl font-bold">

          Session Summary

        </h3>

        <div className="mt-8 grid gap-6 md:grid-cols-4">

          <div>

            <p className="text-sm text-muted-foreground">

              Questions

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {questions.length}

            </h2>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              Answered

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {
                Object.values(answers).filter(
                  answer =>
                    answer.trim().length > 0
                ).length
              }

            </h2>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              Duration

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {duration}m

            </h2>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">

              Remaining

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {formattedTime}

            </h2>

          </div>

        </div>

      </motion.div>

      {/* AI Tip */}

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
        className="mt-10 rounded-[32px] border bg-white p-8 shadow-sm"
      >

        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-blue-100 p-4">

            <BrainCircuit className="h-7 w-7 text-blue-600"/>

          </div>

          <div>

            <h3 className="text-2xl font-bold">

              AI Coaching Tip

            </h3>

            <p className="mt-5 leading-8 text-muted-foreground">

              Strong interview performance isn't
              just about giving the correct answer.
              InterviewIQ AI rewards candidates who
              communicate clearly,
              explain their reasoning,
              discuss trade-offs,
              and demonstrate structured thinking.

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
          delay: 1.4,
        }}
        className="mt-10 flex flex-col gap-4 border-t pt-8 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>

          <h3 className="text-lg font-semibold">

            InterviewIQ AI Session

          </h3>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">

            Complete every interview to build a
            stronger interview history,
            improve your communication skills,
            and receive increasingly personalized
            AI feedback.

          </p>

        </div>

        <div className="flex gap-3">

          <div className="rounded-full bg-blue-100 px-5 py-3 text-sm font-semibold text-blue-700">

            AI Powered

          </div>

          <div className="rounded-full bg-violet-100 px-5 py-3 text-sm font-semibold text-violet-700">

            Real-Time Evaluation

          </div>

        </div>

      </motion.div>

    </motion.section>

  );

}