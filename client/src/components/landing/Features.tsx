import {
  ArrowRight,
  Brain,
  Code2,
  FileSearch,
  BarChart3,
  Mic,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mock Interviews",
    description:
      "Practice realistic HR and technical interviews powered by AI with instant personalized feedback.",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    description:
      "Optimize your resume with ATS insights, keyword suggestions and formatting improvements.",
  },
  {
    icon: Mic,
    title: "Voice Interviews",
    description:
      "Experience conversational AI interviews that evaluate communication and confidence.",
  },
  {
    icon: Code2,
    title: "Coding Assessment",
    description:
      "Solve coding problems inside an interview-like coding environment with real-time evaluation.",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    description:
      "Track interview history, strengths, weaknesses and improvement through analytics.",
  },
  {
    icon: Trophy,
    title: "Company Preparation",
    description:
      "Practice company-specific interview questions for Google, Meta, Netflix and more.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Features
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Everything You Need To
            <span className="block text-blue-600">Ace Every Interview</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            InterviewIQ combines AI, resume analysis, coding interviews and
            performance tracking into one powerful platform.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 transition-all duration-300 group-hover:bg-blue-600">
                    <Icon className="h-8 w-8 text-blue-600 transition-all duration-300 group-hover:text-white group-hover:rotate-6" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-5 leading-8 text-slate-600">
                    {feature.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600">
                    Learn More

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}