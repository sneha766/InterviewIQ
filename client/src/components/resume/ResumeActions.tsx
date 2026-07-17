import { motion } from "framer-motion";
import {
  RotateCcw,
  Download,
  Share2,
  Trash2,
  RefreshCcw,
} from "lucide-react";

import { Button } from "../ui/button";

interface ResumeActionsProps {
  onAnalyzeAgain?: () => void;
  onDownload?: () => void;
  onReplace?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  variant?: "default" | "outline" | "destructive";
  onClick?: () => void;
}

function ActionCard({
  title,
  description,
  icon,
  buttonText,
  variant = "default",
  onClick,
}: ActionCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-2xl border bg-white p-6 shadow-sm transition-all"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 min-h-[60px] text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <Button
        variant={variant}
        className="mt-6 w-full rounded-xl"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </motion.div>
  );
}

export default function ResumeActions({
  onAnalyzeAgain,
  onDownload,
  onReplace,
  onShare,
  onDelete,
}: ResumeActionsProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border bg-white p-8 shadow-sm"
    >
      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          Action Center
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your resume, rerun the analysis, or export your
          results.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <ActionCard
          title="Analyze Again"
          description="Run another AI analysis after updating your resume."
          buttonText="Analyze"
          icon={<RotateCcw className="h-6 w-6" />}
          onClick={onAnalyzeAgain}
        />

        <ActionCard
          title="Download Report"
          description="Download your AI resume report for future reference."
          buttonText="Download"
          icon={<Download className="h-6 w-6" />}
          onClick={onDownload}
        />

        <ActionCard
          title="Replace Resume"
          description="Upload a newer version of your resume for analysis."
          buttonText="Replace"
          variant="outline"
          icon={<RefreshCcw className="h-6 w-6" />}
          onClick={onReplace}
        />

        <ActionCard
          title="Share Results"
          description="Share your resume analysis with mentors or recruiters."
          buttonText="Share"
          variant="outline"
          icon={<Share2 className="h-6 w-6" />}
          onClick={onShare}
        />

        <ActionCard
          title="Delete Resume"
          description="Remove your uploaded resume and analysis history."
          buttonText="Delete"
          variant="destructive"
          icon={<Trash2 className="h-6 w-6" />}
          onClick={onDelete}
        />

      </div>
    </motion.section>
  );
}