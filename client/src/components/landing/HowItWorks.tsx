import {
  Upload,
  ScanSearch,
  MessageSquare,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    desc: "Upload your latest resume and let AI analyze every section.",
  },
  {
    icon: ScanSearch,
    title: "Analyze ATS Score",
    desc: "Receive ATS score, keyword analysis and optimization tips.",
  },
  {
    icon: MessageSquare,
    title: "Practice Interviews",
    desc: "Take AI-powered mock interviews with voice and text support.",
  },
  {
    icon: Trophy,
    title: "Get Hired",
    desc: "Improve continuously using reports and performance insights.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            How InterviewIQ Works
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Get interview ready in just four simple steps.
          </p>
        </div>

        <div className="relative mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-10 hidden h-1 bg-slate-200 lg:block"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl">
                  <Icon size={36} />
                </div>

                <div className="mt-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    Step {index + 1}
                  </span>

                  <h3 className="mt-5 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>)
}