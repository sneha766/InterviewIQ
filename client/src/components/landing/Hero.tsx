import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

const stats = [
  {
    value: "10K+",
    label: "Users",
  },
  {
    value: "50K+",
    label: "Interviews",
  },
  {
    value: "94%",
    label: "Success Rate",
  },
  {
    value: "200+",
    label: "Companies",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
    </div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 py-24 lg:flex-row lg:px-8">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <CheckCircle className="h-4 w-4" />
            AI Powered Interview Platform
          </div>

          {/* Heading */}

          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl xl:text-7xl">
            Crack Your
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              Dream Job
            </span>
            with AI
          </h1>

          {/* Paragraph */}

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Practice real interviews, improve your resume, increase your ATS
            score, and receive instant AI feedback designed to help you land
            interviews at top companies.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight size={18} />
            </Button>

            <Button variant="outline" size="lg" className="gap-2">
              <Play size={18} />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>

                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-1 justify-center"
        >
          {/* Laptop */}

          <div className="relative w-full max-w-lg rounded-3xl border bg-white p-6 shadow-2xl">
            <div className="rounded-2xl bg-slate-900 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-white">
                  AI Interview Report
                </h3>

                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                  Ready
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm text-white">
                    <span>ATS Score</span>
                    <span>92%</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-700">
                    <div className="h-3 w-[92%] rounded-full bg-green-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm text-white">
                    <span>Confidence</span>
                    <span>95%</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-700">
                    <div className="h-3 w-[95%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm text-white">
                    <span>Communication</span>
                    <span>90%</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-700">
                    <div className="h-3 w-[90%] rounded-full bg-purple-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute -left-10 top-12 rounded-xl border bg-white p-4 shadow-xl"
            >
              <p className="text-sm text-slate-500">Resume Uploaded</p>

              <h4 className="font-bold text-green-600">Success ✓</h4>
            </motion.div>

            {/* Floating Card 2 */}

            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -right-10 bottom-10 rounded-xl border bg-white p-4 shadow-xl"
            >
              <p className="text-sm text-slate-500">Interview Ready</p>

              <h4 className="font-bold text-blue-600">Google SDE I</h4>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}