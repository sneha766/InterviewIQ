import {
  Upload,
  Brain,
  Code2,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "Upload Resume",
    description: "Analyze ATS score",
    icon: Upload,
  },
  {
    title: "AI Interview",
    description: "Practice HR rounds",
    icon: Brain,
  },
  {
    title: "Coding Practice",
    description: "Solve interview questions",
    icon: Code2,
  },
  {
    title: "View Reports",
    description: "Track progress",
    icon: BarChart3,
  },
];

export default function QuickActions() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            className="rounded-2xl border bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3">
              <Icon className="text-blue-600" size={22} />
            </div>

            <h3 className="font-semibold">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {action.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}