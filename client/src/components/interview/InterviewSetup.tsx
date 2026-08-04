import { motion } from "framer-motion";

import {
  BrainCircuit,
  Sparkles,
  Briefcase,
  GraduationCap,
} from "lucide-react";

import { useState } from "react";

import { Button } from "../ui/button";

interface InterviewSetupProps {

  onStart: (config: {

    interviewType: string;

    difficulty: string;

    role: string;

    experience: string;

    duration: number;

    techStack: string[];

  }) => void;

}

const interviewTypes = [

  {
    id: "HR",
    title: "HR Interview",
    description:
      "Behavioral and communication questions.",
  },

  {
    id: "Technical",
    title: "Technical Interview",
    description:
      "Core CS and technology questions.",
  },

  {
    id: "Coding",
    title: "Coding Interview",
    description:
      "DSA and coding challenges.",
  },

];

const difficulties = [

  "Easy",

  "Medium",

  "Hard",

];

const durations = [

  15,

  30,

  45,

  60,

];

export default function InterviewSetup({

  onStart,

}: InterviewSetupProps) {

  const [
    interviewType,
    setInterviewType,
  ] = useState("Technical");

  const [
    difficulty,
    setDifficulty,
  ] = useState("Medium");

  const [
    duration,
    setDuration,
  ] = useState(30);

  const [
    role,
    setRole,
  ] = useState("");

  const [
    experience,
    setExperience,
  ] = useState("");

  const [
    techStack,
    setTechStack,
  ] = useState<string[]>([]);

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

      className="rounded-[32px] border bg-white p-8 shadow-sm"

    >

      <div className="mb-10 flex items-center gap-5">

        <div className="rounded-3xl bg-blue-100 p-4">

          <BrainCircuit className="h-8 w-8 text-blue-600"/>

        </div>

        <div>

          <h1 className="text-3xl font-bold">

            Configure AI Interview

          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">

            Customize your interview based on
            your target role,
            experience,
            technology stack,
            and preferred difficulty.

          </p>

        </div>

      </div>

      {/* Interview Type */}

      <div>

        <h3 className="mb-5 text-lg font-semibold">

          Interview Type

        </h3>

        <div className="grid gap-5 md:grid-cols-3">
                  {interviewTypes.map((type) => (

            <motion.button
              key={type.id}
              type="button"
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={() =>
                setInterviewType(type.id)
              }
              className={`rounded-[28px] border p-6 text-left transition-all ${
                interviewType === type.id
                  ? "border-blue-600 bg-blue-50 shadow-lg"
                  : "hover:border-blue-300 hover:shadow-md"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className="rounded-2xl bg-blue-100 p-4">

                  <BrainCircuit className="h-7 w-7 text-blue-600"/>

                </div>

                {interviewType === type.id && (

                  <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">

                    Selected

                  </div>

                )}

              </div>

              <h4 className="mt-6 text-xl font-semibold">

                {type.title}

              </h4>

              <p className="mt-3 leading-7 text-muted-foreground">

                {type.description}

              </p>

            </motion.button>

          ))}

        </div>

      </div>

      {/* Difficulty */}

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold">

          Difficulty

        </h3>

        <div className="flex flex-wrap gap-4">

          {difficulties.map((level) => (

            <motion.button
              key={level}
              type="button"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: .97,
              }}
              onClick={() =>
                setDifficulty(level)
              }
              className={`rounded-xl px-8 py-4 font-semibold transition-all ${
                difficulty === level
                  ? "bg-blue-600 text-white shadow-lg"
                  : "border bg-white hover:border-blue-400"
              }`}
            >

              {level}

            </motion.button>

          ))}

        </div>

      </div>

      {/* Job Role */}

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold">

          Target Role

        </h3>

        <div className="relative">

          <Briefcase className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

          <input
            type="text"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            placeholder="Frontend Developer"
            className="h-14 w-full rounded-xl border pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

        </div>

      </div>

      {/* Experience */}

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold">

          Experience Level

        </h3>

        <div className="relative">

          <GraduationCap className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>

          <select
            value={experience}
            onChange={(e) =>
              setExperience(
                e.target.value
              )
            }
            className="h-14 w-full rounded-xl border bg-white pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >

            <option value="">

              Select Experience

            </option>

            <option value="0-1 Years">

              0-1 Years

            </option>

            <option value="1-3 Years">

              1-3 Years

            </option>

            <option value="3-5 Years">

              3-5 Years

            </option>

            <option value="5+ Years">

              5+ Years

            </option>

          </select>

        </div>

      </div>
            {/* Tech Stack */}

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold">

          Technology Stack

        </h3>

        <div className="flex flex-wrap gap-3">

          {[
            "React",
            "Node.js",
            "Express",
            "TypeScript",
            "JavaScript",
            "Java",
            "Spring Boot",
            "Python",
            "C++",
            "MongoDB",
            "PostgreSQL",
            "Prisma",
          ].map((tech) => {

            const selected =
              techStack.includes(tech);

            return (

              <motion.button
                key={tech}
                type="button"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: .97,
                }}
                onClick={() => {

                  if (selected) {

                    setTechStack(
                      techStack.filter(
                        item =>
                          item !== tech
                      )
                    );

                  } else {

                    setTechStack([
                      ...techStack,
                      tech,
                    ]);

                  }

                }}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                  selected
                    ? "bg-blue-600 text-white shadow-lg"
                    : "border bg-white hover:border-blue-500"
                }`}
              >

                {tech}

              </motion.button>

            );

          })}

        </div>

      </div>

      {/* Duration */}

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold">

          Interview Duration

        </h3>

        <div className="grid gap-4 sm:grid-cols-4">

          {durations.map((item) => (

            <motion.button
              key={item}
              type="button"
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={() =>
                setDuration(item)
              }
              className={`rounded-2xl border p-6 transition-all ${
                duration === item
                  ? "border-blue-600 bg-blue-50 shadow-lg"
                  : "hover:border-blue-300"
              }`}
            >

              <h4 className="text-3xl font-bold">

                {item}

              </h4>

              <p className="mt-2 text-sm text-muted-foreground">

                Minutes

              </p>

            </motion.button>

          ))}

        </div>

      </div>

      {/* AI Preview */}

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
        className="mt-12 rounded-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <Sparkles className="h-7 w-7"/>

              <h2 className="text-2xl font-bold">

                AI Interview Preview

              </h2>

            </div>

            <p className="mt-5 max-w-2xl leading-8 text-blue-100">

              InterviewIQ AI will generate
              personalized questions based on
              your selections.

              Every interview is unique and
              adapts to your performance.

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

            <p className="text-sm text-blue-100">

              Configuration

            </p>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between gap-10">

                <span>Interview</span>

                <span className="font-semibold">

                  {interviewType}

                </span>

              </div>

              <div className="flex justify-between gap-10">

                <span>Difficulty</span>

                <span className="font-semibold">

                  {difficulty}

                </span>

              </div>

              <div className="flex justify-between gap-10">

                <span>Duration</span>

                <span className="font-semibold">

                  {duration} min

                </span>

              </div>

              <div className="flex justify-between gap-10">

                <span>Tech Stack</span>

                <span className="font-semibold">

                  {techStack.length}

                </span>

              </div>

            </div>

          </div>

        </div>

      </motion.div>
            {/* Interview Expectations */}

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
        className="mt-10 rounded-[30px] border bg-white p-8 shadow-sm"
      >

        <div className="flex items-center gap-3">

          <Sparkles className="h-6 w-6 text-blue-600"/>

          <h3 className="text-2xl font-bold">

            What to Expect

          </h3>

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">

          <div className="rounded-2xl bg-slate-50 p-6">

            <h4 className="text-lg font-semibold">

              Questions

            </h4>

            <h2 className="mt-4 text-4xl font-bold">

              {duration < 20
                ? 8
                : duration < 40
                ? 12
                : duration < 60
                ? 16
                : 20}

            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              AI-generated interview
              questions customized for
              your profile.

            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-6">

            <h4 className="text-lg font-semibold">

              Feedback

            </h4>

            <h2 className="mt-4 text-4xl font-bold">

              AI

            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Instant evaluation with
              strengths,
              weaknesses,
              and recommendations.

            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-6">

            <h4 className="text-lg font-semibold">

              Difficulty

            </h4>

            <h2 className="mt-4 text-4xl font-bold">

              {difficulty}

            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Questions are selected
              according to the chosen
              difficulty level.

            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-6">

            <h4 className="text-lg font-semibold">

              Role

            </h4>

            <h2 className="mt-4 text-2xl font-bold break-words">

              {role || "Not Selected"}

            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">

              Interview questions will
              focus on your target
              position.

            </p>

          </div>

        </div>

      </motion.div>

      {/* AI Readiness */}

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
        className="mt-10 rounded-[30px] border bg-gradient-to-r from-emerald-50 to-blue-50 p-8"
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              Interview Readiness

            </h3>

            <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">

              InterviewIQ AI will dynamically
              adjust questions based on your
              answers to simulate a realistic
              technical interview experience.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow">

            <p className="text-sm text-muted-foreground">

              Estimated Readiness

            </p>

            <div className="mt-4 flex gap-2">

              {Array.from({ length: 5 }).map(
                (_, index) => (

                  <div
                    key={index}
                    className={`h-3 w-10 rounded-full ${
                      index <
                      (difficulty === "Easy"
                        ? 3
                        : difficulty === "Medium"
                        ? 4
                        : 5)
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  />

                )
              )}

            </div>

            <p className="mt-5 text-sm text-muted-foreground">

              Based on selected difficulty.

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
          delay: .65,
        }}
        className="mt-10 rounded-[30px] border bg-slate-50 p-8"
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              Ready to Generate Your Interview?

            </h3>

            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">

              Once your interview starts,
              InterviewIQ AI will generate a
              personalized interview based on
              your selected role,
              experience,
              difficulty,
              and technology stack.

            </p>

          </div>

          <Button
            size="lg"
            disabled={
              !role ||
              !experience ||
              techStack.length === 0
            }
            className="rounded-2xl px-10 py-7 text-lg"
            onClick={() =>
              onStart({
                interviewType,
                difficulty,
                role,
                experience,
                duration,
                techStack,
              })
            }
          >

            <Sparkles className="mr-3 h-5 w-5"/>

            Generate AI Interview

          </Button>

        </div>

      </motion.div>

      {/* Tips */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .8,
        }}
        className="mt-10 rounded-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <h3 className="text-2xl font-bold">

          Before You Start

        </h3>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div>

            <h4 className="font-semibold">

              Quiet Environment

            </h4>

            <p className="mt-3 text-sm leading-7 text-blue-100">

              Choose a distraction-free
              environment to stay focused.

            </p>

          </div>

          <div>

            <h4 className="font-semibold">

              Think Aloud

            </h4>

            <p className="mt-3 text-sm leading-7 text-blue-100">

              Explain your reasoning just like
              you would during a real interview.

            </p>

          </div>

          <div>

            <h4 className="font-semibold">

              Stay Confident

            </h4>

            <p className="mt-3 text-sm leading-7 text-blue-100">

              Confidence and communication
              matter as much as technical skills.

            </p>

          </div>

          <div>

            <h4 className="font-semibold">

              Learn From Feedback

            </h4>

            <p className="mt-3 text-sm leading-7 text-blue-100">

              Every completed interview includes
              detailed AI suggestions for
              improvement.

            </p>

          </div>

        </div>

      </motion.div>

    </motion.section>

  );

}