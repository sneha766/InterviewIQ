import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import ATSScoreCard from "./ATSScoreCard";
import KeywordAnalysis from "./KeywordAnalysis";
import Suggestions from "./Suggestions";
import ResumeActions from "./ResumeActions";

import type { ResumeAnalysis } from "../../types/resume";

interface AnalysisResultProps {
  file: File;
  analysis: ResumeAnalysis;

  onAnalyzeAgain?: () => void;
  onDownload?: () => void;
  onReplace?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export default function AnalysisResult({
  file,
  analysis,
  onAnalyzeAgain,
  onDownload,
  onReplace,
  onShare,
  onDelete,
}: AnalysisResultProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="space-y-8"
    >
      {/* Hero */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 flex items-center gap-3">

              <div className="rounded-xl bg-white/20 p-3 backdrop-blur">

                <Sparkles className="h-6 w-6" />

              </div>

              <h2 className="text-3xl font-bold">
                Resume Analysis Complete
              </h2>

            </div>

            <p className="max-w-3xl leading-7 text-blue-100">
              Your resume has been successfully analyzed using our
              AI-powered ATS engine. Review your score, identify
              missing keywords, and follow the personalized
              recommendations to maximize your chances of getting
              shortlisted.
            </p>

          </div>

          <div className="rounded-2xl bg-white/15 p-6 backdrop-blur">

            <p className="text-sm text-blue-100">
              Resume
            </p>

            <h3 className="mt-2 max-w-xs break-all text-lg font-semibold">
              {file.name}
            </h3>

            <p className="mt-3 text-sm text-blue-100">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

          </div>

        </div>

      </section>

      {/* ATS Score */}

      <ATSScoreCard
        score={analysis.score}
        strengths={analysis.strengths}
      />

      {/* Keyword Analysis */}

      <KeywordAnalysis
        missingKeywords={analysis.missingKeywords}
      />

      {/* AI Suggestions */}

      <Suggestions
        suggestions={analysis.suggestions}
      />

      {/* Action Center */}

      <ResumeActions
        onAnalyzeAgain={onAnalyzeAgain}
        onDownload={onDownload}
        onReplace={onReplace}
        onShare={onShare}
        onDelete={onDelete}
      />

    </motion.div>
  );
}