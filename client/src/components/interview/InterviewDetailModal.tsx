import { useInterview } from "@/hooks/useInterview";
import InterviewResult from "./InterviewResult";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterviewDetailModalProps {
  interviewId: string | null;
  onClose: () => void;
}

export default function InterviewDetailModal({
  interviewId,
  onClose,
}: InterviewDetailModalProps) {
  const interviewQuery = useInterview(interviewId || "");

  if (!interviewId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-50 w-full max-w-4xl rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl border">
        <Button
          size="sm"
          variant="ghost"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </Button>

        {interviewQuery.isPending ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span>Loading interview report...</span>
          </div>
        ) : !interviewQuery.data ? (
          <div className="p-12 text-center text-slate-500">
            Interview report not found.
          </div>
        ) : (
          <InterviewResult
            interview={interviewQuery.data}
            onBack={onClose}
          />
        )}
      </div>
    </div>
  );
}
