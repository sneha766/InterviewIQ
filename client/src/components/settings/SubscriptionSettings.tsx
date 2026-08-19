import { CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBilling } from "@/hooks/useBilling";

export default function SubscriptionSettings() {
  const { usage } = useBilling();
  const plan = usage.data?.plan || "FREE";

  return (
    <Card className="p-8 space-y-6 rounded-3xl">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Subscription & Billing</h2>
            <p className="text-sm text-slate-500">Manage your active plan status and payment details.</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
            plan === "PRO"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          {plan} PLAN
        </span>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {plan === "PRO" ? "InterviewIQ Pro Subscription" : "InterviewIQ Free Plan"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {plan === "PRO"
                ? "Unlimited access to all AI interviews, resume tailoring, ATS analyses, and coding practice."
                : "Basic tier with monthly usage limits for resume analyses and AI mock sessions."}
            </p>
          </div>

          <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
            <Link to="/billing">
              Manage Billing <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {plan === "PRO" && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 pt-2 border-t border-slate-200">
            <CheckCircle2 className="h-4 w-4" /> Active Pro Membership — All Premium Features Unlocked
          </div>
        )}
      </div>
    </Card>
  );
}
