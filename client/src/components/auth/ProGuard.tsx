import { ReactNode } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Crown } from "lucide-react";
import { useBilling } from "../../hooks/useBilling";

interface ProGuardProps {
  children: ReactNode;
}

export default function ProGuard({
  children,
}: ProGuardProps) {
  const { usage, checkout } = useBilling();

  if (usage.isLoading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  if (usage.isError || !usage.data) {
    return (
      <div className="flex justify-center py-20">
        Failed to load subscription.
      </div>
    );
  }

  if (usage.data.plan === "PRO") {
    return <>{children}</>;
  }

  return (
    <div className="flex justify-center py-20">
      <Card className="max-w-xl p-8 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
          <Crown className="h-8 w-8 text-yellow-600" />
        </div>

        <h2 className="text-3xl font-bold">
          InterviewIQ Pro
        </h2>

        <p className="mt-3 text-muted-foreground">
          This feature is available only for Pro users.
          Upgrade your subscription to unlock premium AI
          interview preparation.
        </p>

        <Button
          className="mt-6 w-full"
          disabled={checkout.isPending}
          onClick={() => checkout.mutate()}
        >
          {checkout.isPending
            ? "Redirecting..."
            : "Upgrade to Pro"}
        </Button>

      </Card>
    </div>
  );
}