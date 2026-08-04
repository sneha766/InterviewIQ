import { motion } from "framer-motion";

import {
  RotateCcw,
  Download,
  Share2,
  Trash2,
  RefreshCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { Button } from "../ui/button";

interface ResumeActionsProps {
  onAnalyzeAgain?: () => void;
  onDownload?: () => void;
  onReplace?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

interface ActionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  button: string;
  badge: string;
  variant?: "default" | "outline" | "destructive";
  onClick?: () => void;
}

function ActionCard({
  item,
}: {
  item: ActionItem;
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: .2,
      }}
      className="group rounded-[28px] border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
    >

      <div className="flex items-start justify-between">

        <div className="rounded-2xl bg-blue-100 p-4 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">

          {item.icon}

        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">

          {item.badge}

        </span>

      </div>

      <h3 className="mt-6 text-xl font-semibold">

        {item.title}

      </h3>

      <p className="mt-3 min-h-[72px] leading-7 text-muted-foreground">

        {item.description}

      </p>

      <Button
        variant={item.variant}
        className="mt-6 w-full justify-between rounded-xl"
        onClick={item.onClick}
      >

        {item.button}

        <ArrowRight className="h-4 w-4"/>

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

  const actions: ActionItem[] = [

    {
      title: "Analyze Again",
      description:
        "Run another AI ATS analysis after updating your resume to receive the latest insights and recommendations.",
      button: "Start Analysis",
      badge: "AI",
      icon: <RotateCcw className="h-6 w-6"/>,
      onClick: onAnalyzeAgain,
    },

    {
      title: "Download Report",
      description:
        "Download your AI analysis report and ATS results for future reference or sharing.",
      button: "Download",
      badge: "PDF",
      icon: <Download className="h-6 w-6"/>,
      onClick: onDownload,
    },

    {
      title: "Replace Resume",
      description:
        "Upload a newer version of your resume while keeping your workflow uninterrupted.",
      button: "Replace",
      badge: "Update",
      icon: <RefreshCcw className="h-6 w-6"/>,
      variant: "outline",
      onClick: onReplace,
    },

    {
      title: "Share Results",
      description:
        "Share your ATS report with mentors, recruiters, or teammates for feedback.",
      button: "Share",
      badge: "Link",
      icon: <Share2 className="h-6 w-6"/>,
      variant: "outline",
      onClick: onShare,
    },

    {
      title: "Delete Resume",
      description:
        "Remove this resume together with its AI analysis history permanently.",
      button: "Delete",
      badge: "Danger",
      icon: <Trash2 className="h-6 w-6"/>,
      variant: "destructive",
      onClick: onDelete,
    },

  ];

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
        duration: .35,
      }}
      className="rounded-[30px] border bg-white p-8 shadow-sm"
    >

      {/* Header */}

      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-100 p-4">

              <Sparkles className="h-7 w-7 text-blue-600"/>

            </div>

            <div>

              <h2 className="text-3xl font-bold tracking-tight">

                Resume Action Center

              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">

                Manage your resume,
                rerun AI analysis,
                export reports,
                replace files,
                or permanently remove
                your resume from InterviewIQ AI.

              </p>

            </div>

          </div>

        </div>

        <div className="hidden rounded-2xl border bg-slate-50 p-5 lg:block">

          <div className="flex items-center gap-3">

            <ShieldCheck className="h-5 w-5 text-emerald-600"/>

            <div>

              <p className="font-semibold">

                Secure Actions

              </p>

              <p className="text-xs text-muted-foreground">

                All operations are encrypted.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Quick Stats */}

      <div className="grid gap-6 lg:grid-cols-3">
                <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-3xl border bg-gradient-to-br from-blue-50 to-white p-6"
        >

          <div className="flex items-center gap-3">

            <Clock3 className="h-6 w-6 text-blue-600"/>

            <div>

              <p className="text-sm text-muted-foreground">
                Average Analysis
              </p>

              <h3 className="text-3xl font-bold">
                12s
              </h3>

            </div>

          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">

            Resume analysis usually completes
            in under 15 seconds.

          </p>

        </motion.div>

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
            delay: .1,
          }}
          className="rounded-3xl border bg-gradient-to-br from-emerald-50 to-white p-6"
        >

          <div className="flex items-center gap-3">

            <ShieldCheck className="h-6 w-6 text-emerald-600"/>

            <div>

              <p className="text-sm text-muted-foreground">
                Resume Status
              </p>

              <h3 className="text-3xl font-bold">
                Secure
              </h3>

            </div>

          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">

            Files are stored securely and only
            accessible by your authenticated account.

          </p>

        </motion.div>

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
          className="rounded-3xl border bg-gradient-to-br from-violet-50 to-white p-6"
        >

          <div className="flex items-center gap-3">

            <Sparkles className="h-6 w-6 text-violet-600"/>

            <div>

              <p className="text-sm text-muted-foreground">
                AI Ready
              </p>

              <h3 className="text-3xl font-bold">
                100%
              </h3>

            </div>

          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">

            Your resume can be analyzed,
            tailored,
            or shared anytime.

          </p>

        </motion.div>

      </div>

      {/* Actions */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action, index) => (

          <motion.div
            key={action.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .15 * index,
            }}
          >

            <ActionCard
              item={action}
            />

          </motion.div>

        ))}

      </div>

      {/* AI Recommendation */}

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
        className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
      >

        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

            <Sparkles className="h-7 w-7"/>

          </div>

          <div>

            <h3 className="text-2xl font-semibold">

              AI Recommendation

            </h3>

            <p className="mt-5 max-w-3xl leading-8 text-blue-100">

              Before downloading or sharing your
              resume, consider running another AI
              analysis after every major update.
              Small improvements in keywords,
              measurable achievements and technical
              skills can significantly improve ATS
              rankings and recruiter visibility.

            </p>

          </div>

        </div>

      </motion.div>
            {/* Safety Notice */}

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
          delay: 0.55,
        }}
        className="mt-10 rounded-3xl border bg-slate-50 p-7"
      >

        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-amber-100 p-4">

            <ShieldCheck className="h-7 w-7 text-amber-600"/>

          </div>

          <div>

            <h3 className="text-xl font-semibold">

              Safe Operations

            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">

              Downloading, replacing, and reanalyzing
              your resume are completely safe and do
              not affect previous AI reports unless
              you intentionally overwrite or delete
              them.

            </p>

          </div>

        </div>

      </motion.div>

      {/* Danger Zone */}

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
          delay: .65,
        }}
        className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-7"
      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-xl font-semibold text-red-700">

              Danger Zone

            </h3>

            <p className="mt-4 max-w-2xl leading-7 text-red-600">

              Deleting your resume permanently removes
              the uploaded PDF together with its ATS
              analysis, AI suggestions, and associated
              history. This action cannot be undone.

            </p>

          </div>

          <Button
            variant="destructive"
            size="lg"
            className="rounded-xl"
            onClick={onDelete}
          >

            <Trash2 className="mr-2 h-5 w-5"/>

            Delete Resume

          </Button>

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
          delay: .8,
        }}
        className="mt-10 flex flex-col gap-4 border-t pt-8 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>

          <h3 className="text-lg font-semibold">

            InterviewIQ AI

          </h3>

          <p className="mt-2 text-sm text-muted-foreground">

            Build better resumes,
            improve ATS scores,
            and prepare confidently
            for your next interview.

          </p>

        </div>

        <Button
          size="lg"
          className="rounded-xl"
          onClick={onAnalyzeAgain}
        >

          <RotateCcw className="mr-2 h-5 w-5"/>

          Analyze Resume Again

        </Button>

      </motion.div>

    </motion.section>

  );

}