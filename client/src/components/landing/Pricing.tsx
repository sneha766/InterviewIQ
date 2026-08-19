import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Essential tools to kickstart your preparation.",
    features: [
      "5 Resume ATS Analyses / Month",
      "3 AI Mock Interviews / Month",
      "Coding Workspace & Judge0 Execution",
      "Basic Performance Summary",
    ],
    button: "Get Started Free",
    link: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "Complete AI suite to crack top SDE & Tech interviews.",
    features: [
      "Unlimited Resume ATS Analyses",
      "Unlimited AI Mock Interviews",
      "Unlimited Resume Tailoring",
      "AI Code Reviews & Complexity Analysis",
      "Full Global Readiness Reports",
      "Priority AI Processing",
    ],
    button: "Upgrade to Pro",
    link: "/billing",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For universities, bootcamps, and organizations.",
    features: [
      "Unlimited Team Members",
      "Organization Admin Dashboard",
      "Custom Interview Question Sets",
      "Cohort Performance Analytics",
      "Dedicated Account Manager",
    ],
    button: "Contact Sales",
    link: "/register",
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
            Transparent Pricing
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Choose the membership tier that fits your tech career journey.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${
                plan.featured
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {plan.name}
                </h3>

                <p className="mt-3 text-slate-600 text-sm">{plan.description}</p>

                <div className="mt-8">
                  <span className="text-5xl font-bold text-slate-900">
                    {plan.price}
                  </span>

                  {plan.price !== "Custom" && (
                    <span className="text-slate-500 font-medium"> / month</span>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-slate-700 font-medium"
                    >
                      <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                asChild
                className="mt-8 w-full font-bold py-6 rounded-xl"
                variant={plan.featured ? "default" : "outline"}
              >
                <Link to={plan.link}>{plan.button}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}