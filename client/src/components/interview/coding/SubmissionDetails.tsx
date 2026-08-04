import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSubmission } from "@/hooks/useCoding";

interface SubmissionDetailsProps {
  submissionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SubmissionDetails({
  submissionId,
  open,
  onOpenChange,
}: SubmissionDetailsProps) {
  const { data, isPending } =
    useSubmission(submissionId);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-5xl">

        <DialogHeader>
          <DialogTitle>

            Submission Details

          </DialogTitle>
        </DialogHeader>

        {isPending && (
          <p>Loading...</p>
        )}

        {data && (
          <div className="space-y-6">

            <div>

              <h3 className="font-semibold">

                Problem

              </h3>

              <p>{data.problem.title}</p>

            </div>

            <div>

              <h3 className="font-semibold">

                Status

              </h3>

              <p>{data.status}</p>

            </div>

            <div>

              <h3 className="font-semibold">

                Runtime

              </h3>

              <p>{data.runtime}</p>

            </div>

            <div>

              <h3 className="font-semibold">

                Memory

              </h3>

              <p>{data.memory}</p>

            </div>

            <div>

              <h3 className="font-semibold">

                Code

              </h3>

              <pre className="overflow-auto rounded-lg bg-neutral-900 p-4 text-sm text-green-400">

{data.code}

              </pre>

            </div>

            <div>

              <h3 className="font-semibold">

                Output

              </h3>

              <pre className="rounded-lg bg-neutral-900 p-4 text-sm text-white">

{data.stdout}

              </pre>

            </div>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}