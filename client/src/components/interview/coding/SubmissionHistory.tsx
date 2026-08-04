import { useState } from "react";
import { Clock } from "lucide-react";

import { useSubmissionHistory } from "@/hooks/useCoding";

import SubmissionDetails from "./SubmissionDetails";

export default function SubmissionHistory() {

  const { data, isPending } =
    useSubmissionHistory();

  const [selectedSubmission,
    setSelectedSubmission] =
      useState("");

  if (isPending) {
    return (
      <div className="rounded-xl border p-6">

        Loading...

      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">

          Submission History

        </h2>

        <div className="space-y-3">

          {data?.map((submission) => (

            <button
              key={submission.id}
              onClick={() =>
                setSelectedSubmission(
                  submission.id
                )
              }
              className="flex w-full items-center justify-between rounded-lg border p-4 transition hover:bg-neutral-50"
            >

              <div>

                <p className="font-semibold">

                  {submission.problem.title}

                </p>

                <p className="text-sm text-gray-500">

                  {submission.language}

                </p>

              </div>

              <div className="text-right">

                <p
                  className={
                    submission.status === "Accepted"
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >

                  {submission.status}

                </p>

                <p className="flex items-center gap-1 text-xs text-gray-500">

                  <Clock className="h-3 w-3"/>

                  {new Date(
                    submission.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            </button>

          ))}

        </div>

      </div>

      {selectedSubmission && (

        <SubmissionDetails
          submissionId={
            selectedSubmission
          }
          open
          onOpenChange={() =>
            setSelectedSubmission("")
          }
        />

      )}
    </>
  );
}