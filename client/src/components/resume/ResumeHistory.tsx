import { motion } from "framer-motion";
import {
  Clock3,
  FileText,
  Eye,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { Button } from "../ui/button";

interface ResumeHistoryItem {
  id: string;
  fileName: string;
  score: number;
  uploadedAt: string;
}

interface ResumeHistoryProps {
  history?: ResumeHistoryItem[];

  onView?: (id: string) => void;

  onDelete?: (id: string) => void;
}

export default function ResumeHistory({
  history = [],
  onView,
  onDelete,
}: ResumeHistoryProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-white p-8 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Resume History
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Access your previous resume analyses and compare
            improvements over time.
          </p>

        </div>

        <div className="rounded-2xl bg-blue-100 p-4">

          <Clock3 className="h-8 w-8 text-blue-600" />

        </div>

      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20">

          <FileText className="mb-5 h-12 w-12 text-slate-400" />

          <h3 className="text-lg font-semibold">
            No Resume History
          </h3>

          <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
            Your previous resume analyses will appear here after
            you analyze your first resume.
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {history.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="rounded-2xl border bg-slate-50 p-6 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-5">

                  <div className="rounded-2xl bg-blue-100 p-4">

                    <FileText className="h-7 w-7 text-blue-600" />

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {resume.fileName}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Uploaded on {resume.uploadedAt}
                    </p>

                  </div>

                </div>

                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">

                  <div className="flex items-center gap-3 rounded-full bg-green-100 px-5 py-2">

                    <TrendingUp className="h-4 w-4 text-green-600" />

                    <span className="font-semibold text-green-700">
                      ATS {resume.score}/100
                    </span>

                  </div>

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => onView?.(resume.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" />

                    View
                  </Button>

                  <Button
                    variant="destructive"
                    className="rounded-xl"
                    onClick={() => onDelete?.(resume.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />

                    Delete
                  </Button>

                </div>

              </div>
            </motion.div>
          ))}

        </div>
      )}
    </motion.section>
  );
}