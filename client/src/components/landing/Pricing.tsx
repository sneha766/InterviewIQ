import { Check } from "lucide-react";
import { Button } from "../ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started.",
    features: [
      "3 AI Interviews / Month",
      "Basic ATS Resume Score",
      "Interview History",
      "Community Support",
    ],
    button: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "₹499",
    description: "Everything you need to crack interviews.",
    features: [
      "Unlimited AI Interviews",
      "Advanced ATS Analysis",
      "Resume Optimization",
      "Company Specific Questions",
      "Voice Interviews",
      "Performance Reports",
      "Priority Support",
    ],
    button: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For colleges and organizations.",
    features: [
      "Unlimited Users",
      "Admin Dashboard",
      "Custom Branding",
      "Team Analytics",
      "Dedicated Support",
    ],
    button: "Contact Sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Pricing
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Simple Pricing
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Choose the plan that fits your interview preparation journey.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.featured
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-slate-900">
                {plan.name}
              </h3>

              <p className="mt-3 text-slate-600">{plan.description}</p>

              <div className="mt-8">
                <span className="text-5xl font-bold text-slate-900">
                  {plan.price}
                </span>

                {plan.price !== "Custom" && (
                  <span className="text-slate-500"> / month</span>
                )}
              </div>

              <Button
                className="mt-8 w-full"
                variant={plan.featured ? "default" : "outline"}
              >
                {plan.button}
              </Button>

              <div className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <Check className="h-5 w-5 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}