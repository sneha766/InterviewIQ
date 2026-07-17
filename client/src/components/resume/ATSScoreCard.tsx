import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Target,
} from "lucide-react";

interface ATSScoreCardProps {
  score: number;
  strengths: string[];
}

export default function ATSScoreCard({
  score,
  strengths,
}: ATSScoreCardProps) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = () => {
    if (score >= 85) return "bg-green-100";
    if (score >= 70) return "bg-blue-100";
    if (score >= 50) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getLabel = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-white p-8 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            ATS Compatibility Score
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your resume has been evaluated against modern
            Applicant Tracking Systems.
          </p>
        </div>

        <div className={`rounded-2xl p-4 ${getScoreBg()}`}>
          <Award className={`h-8 w-8 ${getScoreColor()}`} />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[320px,1fr]">

        {/* Circular Score */}

        <div className="flex flex-col items-center">

          <div className="relative h-44 w-44">

            <svg
              className="rotate-[-90deg]"
              width="176"
              height="176"
            >
              <circle
                cx="88"
                cy="88"
                r={radius}
                fill="transparent"
                stroke="#E5E7EB"
                strokeWidth="12"
              />

              <motion.circle
                cx="88"
                cy="88"
                r={radius}
                fill="transparent"
                stroke="#2563EB"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset: progress,
                }}
                transition={{
                  duration: 1.2,
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h2 className="text-5xl font-bold">
                {score}
              </h2>

              <p className="text-sm text-muted-foreground">
                /100
              </p>

            </div>

          </div>

          <div
            className={`mt-6 rounded-full px-5 py-2 font-semibold ${getScoreBg()} ${getScoreColor()}`}
          >
            {getLabel()}
          </div>

        </div>

        {/* Analysis */}

        <div className="space-y-6">

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border bg-slate-50 p-5">

              <div className="mb-4 flex items-center gap-3">

                <Target className="h-5 w-5 text-blue-600" />

                <h3 className="font-semibold">
                  Recruiter Readiness
                </h3>

              </div>

              <p className="text-sm text-muted-foreground">
                Your resume has a
                <span className="font-semibold text-black">
                  {" "}
                  {score}%{" "}
                </span>
                chance of passing an ATS screening based on
                formatting, keyword optimization and overall
                structure.
              </p>

            </div>

            <div className="rounded-2xl border bg-slate-50 p-5">

              <div className="mb-4 flex items-center gap-3">

                <TrendingUp className="h-5 w-5 text-blue-600" />

                <h3 className="font-semibold">
                  Performance
                </h3>

              </div>

              <p className="text-sm text-muted-foreground">
                Continue optimizing keywords and formatting to
                improve visibility during recruiter searches.
              </p>

            </div>

          </div>

          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-lg font-semibold">
              Resume Strengths
            </h3>

            <div className="space-y-4">

              {strengths.length > 0 ? (
                strengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />

                    <p>{strength}</p>

                  </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No strengths available.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}