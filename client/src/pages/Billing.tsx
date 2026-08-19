import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { CreditCard, Check, Zap, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useBilling } from "@/hooks/useBilling";
import { verifyCheckout } from "@/services/billing.service";

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
      toast.error("Payment process cancelled.");
    }
  }, []);

  if (usage.isLoading) {
    return (
      <div className="flex h-[60vh] justify-center items-center text-slate-500 font-medium">
        Loading Subscription & Billing...
      </div>
    );
  }

  if (usage.isError || !usage.data) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-600 text-center font-medium">
        Failed to load billing status.
      </div>
    );
  }

  const billing = usage.data;
  const isPro = billing.plan === "PRO";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-blue-600" />
          Subscription & Billing
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your InterviewIQ membership, usage quotas, and unlock unlimited AI features.
        </p>
      </div>

      {/* Current Active Plan Card */}
      <Card className="p-8 rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Current Membership</span>
            {isPro ? (
              <Badge className="bg-emerald-500 text-white font-bold px-3 py-0.5">
                PRO ACTIVE
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-slate-700 text-slate-200 font-bold px-3 py-0.5">
                FREE TIER
              </Badge>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isPro ? "InterviewIQ Pro Subscription" : "InterviewIQ Starter Free Plan"}
          </h2>
          <p className="text-sm text-slate-300 max-w-md">
            {isPro
              ? "Enjoy unlimited AI resume analyses, mock interviews, resume tailoring, and priority code execution."
              : "Upgrade to Pro to remove monthly quotas and accelerate your tech interview preparation."}
          </p>
        </div>

        {!isPro && (
          <Button
            size="lg"
            disabled={checkout.isPending}
            onClick={() => checkout.mutate()}
            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base px-8 py-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 shrink-0"
          >
            {checkout.isPending ? "Redirecting to Stripe..." : "Upgrade to Pro"}
          </Button>
        )}
      </Card>

      {/* Usage Quotas Progress Bars */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Current Usage & Limits</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Resume Analysis</span>
              <span className="text-xs font-semibold text-slate-400">
                {billing.resumeLimit === null ? "Unlimited" : `Limit: ${billing.resumeLimit}/mo`}
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">{billing.resumeAnalyses}</div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600"
                style={{
                  width: `${
                    billing.resumeLimit
                      ? Math.min(100, (billing.resumeAnalyses / billing.resumeLimit) * 100)
                      : 100
                  }%`,
                }}
              />
            </div>
          </Card>

          <Card className="p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Mock Interviews</span>
              <span className="text-xs font-semibold text-slate-400">
                {billing.interviewLimit === null ? "Unlimited" : `Limit: ${billing.interviewLimit}/mo`}
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">{billing.interviews}</div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-purple-600"
                style={{
                  width: `${
                    billing.interviewLimit
                      ? Math.min(100, (billing.interviews / billing.interviewLimit) * 100)
                      : 100
                  }%`,
                }}
              />
            </div>
          </Card>

          <Card className="p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Resume Tailoring</span>
              <span className="text-xs font-semibold text-slate-400">
                {billing.tailorLimit === null ? "Unlimited" : `Limit: ${billing.tailorLimit}/mo`}
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">{billing.tailorRequests}</div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-emerald-600"
                style={{
                  width: `${
                    billing.tailorLimit
                      ? Math.min(100, (billing.tailorRequests / billing.tailorLimit) * 100)
                      : 100
                  }%`,
                }}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Plan Comparison Grid */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900">Compare Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan Card */}
          <Card className="p-8 rounded-3xl border space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Free Tier</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Starter</h3>
                <div className="text-3xl font-extrabold text-slate-900 mt-2">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></div>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Up to 5 Resume Analyses / month</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Up to 3 AI Mock Interviews / month</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Access to Coding Problem Set & Judge0 Execution</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Basic Job Readiness Index Analytics</li>
              </ul>
            </div>

            <Button disabled variant="outline" className="w-full rounded-xl mt-6">
              {isPro ? "Previous Plan" : "Current Plan"}
            </Button>
          </Card>

          {/* Pro Plan Card */}
          <Card className="p-8 rounded-3xl border-2 border-blue-600 bg-blue-50/20 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="h-3 w-3 fill-current" /> Recommended
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">Pro Tier</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">InterviewIQ Pro</h3>
                <div className="text-3xl font-extrabold text-blue-600 mt-2">$19 <span className="text-sm font-normal text-slate-500">/ month</span></div>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-blue-600" /> Unlimited Resume Analyses & ATS Scoring</li>
                <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-blue-600" /> Unlimited AI Mock Interviews (HR, Technical, Coding)</li>
                <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-blue-600" /> Unlimited Resume Tailoring to Job Descriptions</li>
                <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-blue-600" /> Detailed AI Code Reviews & Optimization Suggestions</li>
                <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-blue-600" /> Priority Processing & Full Performance Reports</li>
              </ul>
            </div>

            {!isPro ? (
              <Button
                disabled={checkout.isPending}
                onClick={() => checkout.mutate()}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mt-6 py-6"
              >
                {checkout.isPending ? "Redirecting..." : "Upgrade to Pro Now"}
              </Button>
            ) : (
              <Button disabled variant="outline" className="w-full rounded-xl mt-6 border-emerald-300 bg-emerald-50 text-emerald-700 font-bold">
                <ShieldCheck className="mr-2 h-4 w-4" /> Active Pro Membership
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}