import { motion } from "framer-motion";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

interface KeywordAnalysisProps {
  missingKeywords: string[];
}

export default function KeywordAnalysis({
  missingKeywords,
}: KeywordAnalysisProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-white p-8 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Keyword Analysis
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Improve your resume by adding the missing keywords
            that recruiters and ATS software frequently look for.
          </p>
        </div>

        <div className="rounded-2xl bg-blue-100 p-4">
          <Search className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">

        {/* Missing Keywords */}

        <div className="rounded-2xl border p-6">

          <div className="mb-6 flex items-center gap-3">

            <AlertTriangle className="h-5 w-5 text-yellow-500" />

            <h3 className="text-lg font-semibold">
              Missing Keywords
            </h3>

          </div>

          {missingKeywords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">

              <CheckCircle2 className="mb-4 h-10 w-10 text-green-600" />

              <h4 className="font-semibold">
                Great Job!
              </h4>

              <p className="mt-2 text-sm text-muted-foreground">
                Your resume already contains all the important
                keywords identified by our ATS engine.
              </p>

            </div>
          ) : (
            <div className="flex flex-wrap gap-3">

              {missingKeywords.map((keyword, index) => (
                <motion.div
                  key={keyword}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
                >
                  {keyword}
                </motion.div>
              ))}

            </div>
          )}

        </div>

        {/* ATS Tips */}

        <div className="rounded-2xl border bg-slate-50 p-6">

          <div className="mb-6 flex items-center gap-3">

            <Lightbulb className="h-5 w-5 text-yellow-500" />

            <h3 className="font-semibold">
              ATS Tips
            </h3>

          </div>

          <div className="space-y-5 text-sm text-muted-foreground">

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />

              <p>
                Include important technical skills naturally
                inside your work experience instead of listing
                them separately.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />

              <p>
                Match the wording from the job description
                whenever it accurately reflects your experience.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />

              <p>
                Avoid keyword stuffing. Recruiters value
                meaningful context more than repetition.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />

              <p>
                Keep section headings simple, such as
                <strong> Experience</strong>,
                <strong> Education</strong>, and
                <strong> Skills</strong>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}