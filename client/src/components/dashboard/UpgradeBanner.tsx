import { Crown } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useBilling } from "../../hooks/useBilling";

export default function UpgradeBanner() {
  const { usage, checkout } = useBilling();

  if (!usage.data || usage.data.plan === "PRO")
    return null;

  return (
    <Card className="border-yellow-300 bg-yellow-50 p-6">

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Crown className="text-yellow-600" />

            <h2 className="text-xl font-bold">
              Upgrade to InterviewIQ Pro
            </h2>

          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Unlock unlimited AI interviews,
            resume analysis,
            coding rounds,
            and premium analytics.
          </p>

        </div>

        <Button
          onClick={() => checkout.mutate()}
          disabled={checkout.isPending}
        >
          Upgrade
        </Button>

      </div>

    </Card>
  );
}