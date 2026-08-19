import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock3, MemoryStick } from "lucide-react";

import CodingLayout from "../components/interview/coding/CodingLayout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

import { useSubmission } from "@/hooks/useCoding";

const STATUS_BADGE: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  "Wrong Answer": "bg-red-100 text-red-700",
  "Runtime Error": "bg-red-100 text-red-700",
  "Compilation Error": "bg-amber-100 text-amber-700",
};

export default function CodingSubmissionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: submission, isPending, isError } = useSubmission(id ?? "");

  if (isPending) {
    return (
      <CodingLayout>
        <div className="flex h-[50vh] items-center justify-center text-lg font-semibold">
          Loading submission...
        </div>
      </CodingLayout>
    );
  }

  if (isError || !submission) {
    return (
      <CodingLayout>
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-xl font-semibold">
            We couldn't find that submission.
          </h2>
          <Button onClick={() => navigate("/coding")}>
            Back to Coding
          </Button>
        </div>
      </CodingLayout>
    );
  }

  const statusClass =
    STATUS_BADGE[submission.status] ?? "bg-slate-100 text-slate-700";

  return (
    <CodingLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/coding"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Coding
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                {submission.problem.title}
              </p>
              <h1 className="mt-1 text-2xl font-bold">
                Submission Details
              </h1>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${statusClass}`}
            >
              {submission.status}
            </span>
          </div>

          {/* Stats */}
          <div className="grid gap-5 border-b p-6 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-muted-foreground">Difficulty</p>
              <Badge variant="outline" className="mt-2 text-sm">
                {submission.problem.difficulty}
              </Badge>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-muted-foreground">Language</p>
              <h3 className="mt-2 text-xl font-bold">
                {submission.language}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <Clock3 className="h-5 w-5 text-blue-600" />
              <p className="mt-2 text-sm text-muted-foreground">Runtime</p>
              <h3 className="text-xl font-bold">
                {submission.runtime || "--"}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <MemoryStick className="h-5 w-5 text-violet-600" />
              <p className="mt-2 text-sm text-muted-foreground">Memory</p>
              <h3 className="text-xl font-bold">
                {submission.memory || "--"}
              </h3>
            </div>
          </div>

          {/* Code */}
          <div className="space-y-4 border-b p-6">
            <h3 className="text-lg font-semibold">Submitted Code</h3>
            <pre className="max-h-[500px] overflow-auto rounded-2xl bg-[#0D1117] p-5 text-sm text-emerald-400">
              {submission.code}
            </pre>
          </div>

          {/* Output */}
          <div className="grid gap-6 p-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Output</h3>
              <pre className="min-h-[120px] overflow-auto rounded-2xl bg-[#0D1117] p-5 text-sm text-white">
                {submission.stdout || "No output."}
              </pre>
            </div>

            {(submission.stderr || submission.compileOutput) && (
              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  {submission.compileOutput
                    ? "Compiler Output"
                    : "Error Output"}
                </h3>
                <pre className="min-h-[120px] overflow-auto rounded-2xl bg-[#0D1117] p-5 text-sm text-red-400">
                  {submission.compileOutput || submission.stderr}
                </pre>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t bg-slate-50 px-6 py-5">
            <p className="text-sm text-muted-foreground">
              Submitted {new Date(submission.createdAt).toLocaleString()}
            </p>

            <Button
              variant="outline"
              onClick={() =>
                navigate(`/coding?problem=${submission.problem.slug}`)
              }
            >
              Practice This Problem Again
            </Button>
          </div>
        </div>
      </div>
    </CodingLayout>
  );
}
