import { useState } from "react";
import InterviewDashboard from "@/components/interview/InterviewDashboard";
import InterviewSetup from "@/components/interview/InterviewSetup";
import LiveInterview from "@/components/interview/LiveInterview";
import InterviewResult from "@/components/interview/InterviewResult";
import InterviewDetailModal from "@/components/interview/InterviewDetailModal";
import { useCreateInterview, useSubmitInterview } from "@/hooks/useInterview";
import type { Interview, InterviewType, InterviewDifficulty } from "@/services/interview.service";
import { toast } from "sonner";

export default function Interview() {
  const [view, setView] = useState<"dashboard" | "setup" | "live" | "result">("dashboard");
  const [activeInterview, setActiveInterview] = useState<Interview | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);

  const createMutation = useCreateInterview();
  const submitMutation = useSubmitInterview();

  const handleStartSetup = () => {
    setView("setup");
  };

  const handleCreateSubmit = (config: {
    role: string;
    type: InterviewType;
    difficulty: InterviewDifficulty;
  }) => {
    createMutation.mutate(config, {
      onSuccess: (data) => {
        setActiveInterview(data);
        setView("live");
        toast.success("AI Interview generated! Best of luck.");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to create interview session.");
      },
    });
  };

  const handleLiveSubmit = (answers: Array<{ question: string; answer: string }>) => {
    if (!activeInterview) return;

    submitMutation.mutate(
      {
        id: activeInterview.id,
        payload: { answers },
      },
      {
        onSuccess: (updatedInterview) => {
          setActiveInterview(updatedInterview);
          setView("result");
          toast.success("Interview submitted & evaluated by AI!");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to submit interview.");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {view === "dashboard" && (
        <InterviewDashboard
          onStartSetup={handleStartSetup}
          onViewDetail={(id) => setDetailId(id)}
        />
      )}

      {view === "setup" && (
        <InterviewSetup
          onBack={() => setView("dashboard")}
          onSubmit={handleCreateSubmit}
          isLoading={createMutation.isPending}
        />
      )}

      {view === "live" && activeInterview && (
        <LiveInterview
          interview={activeInterview}
          onSubmit={handleLiveSubmit}
          isSubmitting={submitMutation.isPending}
        />
      )}

      {view === "result" && activeInterview && (
        <InterviewResult
          interview={activeInterview}
          onBack={() => {
            setActiveInterview(null);
            setView("dashboard");
          }}
        />
      )}

      {detailId && (
        <InterviewDetailModal
          interviewId={detailId}
          onClose={() => setDetailId(null)}
        />
      )}
    </div>
  );
}
