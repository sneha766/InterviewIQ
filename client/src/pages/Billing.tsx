import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

import { useBilling } from "../hooks/useBilling";
import { verifyCheckout } from "../services/billing.service";

export default function Billing() {
  const { usage, checkout } = useBilling();

  const [params] = useSearchParams();

  useEffect(() => {
    const success = params.get("success");
    const cancel = params.get("cancel");
    const sessionId = params.get("session_id");

    if (success && sessionId) {
      verifyCheckout(sessionId)
        .then(() => {
          toast.success("🎉 Welcome to InterviewIQ Pro!");
          usage.refetch();
        })
        .catch(() => {
          toast.error("Unable to verify payment.");
        });
    }

    if (cancel) {
      toast.error("Payment cancelled.");
    }
  }, []);

  if (usage.isLoading) {
    return (
      <div className="flex justify-center py-20">
        Loading Billing...
      </div>
    );
  }

  if (usage.isError || !usage.data) {
    return (
      <div className="flex justify-center py-20">
        Failed to load billing.
      </div>
    );
  }

  const billing = usage.data;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Billing & Subscription
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage your InterviewIQ subscription.
        </p>
      </div>

      <Card className="p-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            Current Plan
          </h2>

          <div className="mt-3">

            {billing.plan === "PRO" ? (
              <Badge className="bg-green-600">
                PRO
              </Badge>
            ) : (
              <Badge variant="secondary">
                FREE
              </Badge>
            )}

          </div>
        </div>

        {billing.plan === "FREE" && (
          <Button
            size="lg"
            disabled={checkout.isPending}
            onClick={() => checkout.mutate()}
          >
            {checkout.isPending
              ? "Redirecting..."
              : "Upgrade to Pro"}
          </Button>
        )}

      </Card>

      <div className="grid gap-5 md:grid-cols-3">

        <Card className="p-5">

          <h3 className="font-semibold">
            Resume Analysis
          </h3>

          <p className="mt-3 text-3xl font-bold">
            {billing.resumeAnalyses}
          </p>

          <p className="text-sm text-muted-foreground">
            {billing.resumeLimit === null
              ? "Unlimited"
              : `${billing.resumeLimit} per month`}
          </p>

        </Card>

        <Card className="p-5">

          <h3 className="font-semibold">
            AI Interviews
          </h3>

          <p className="mt-3 text-3xl font-bold">
            {billing.interviews}
          </p>

          <p className="text-sm text-muted-foreground">
            {billing.interviewLimit === null
              ? "Unlimited"
              : `${billing.interviewLimit} per month`}
          </p>

        </Card>

        <Card className="p-5">

          <h3 className="font-semibold">
            Resume Tailoring
          </h3>

          <p className="mt-3 text-3xl font-bold">
            {billing.tailorRequests}
          </p>

          <p className="text-sm text-muted-foreground">
            {billing.tailorLimit === null
              ? "Unlimited"
              : `${billing.tailorLimit} per month`}
          </p>

        </Card>

      </div>

      <Card className="p-6">

        <h2 className="text-xl font-semibold">
          Pro Features
        </h2>

        <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc ml-6">
          <li>Unlimited Resume Analysis</li>
          <li>Unlimited AI Interviews</li>
          <li>Unlimited Resume Tailoring</li>
          <li>Priority AI Processing</li>
          <li>Premium Analytics Dashboard</li>
          <li>Future Features Included</li>
        </ul>

      </Card>

    </div>
  );
}