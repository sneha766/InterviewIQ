import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  Bug,
  Gauge,
  ShieldCheck,
  Sparkles,
   

} from "lucide-react";
import { Button } from "../../ui/button";

interface CodeReviewProps {
  score: number;
  readability: number;
  maintainability: number;
  bugs: number;
  complexity: string;
  security: string;
}

export default function CodeReview({
  score,
  readability,
  maintainability,
  bugs,
  complexity,
  security,
}: CodeReviewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border bg-white shadow-sm"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">

            <BrainCircuit className="h-7 w-7 text-blue-600" />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              AI Code Review

            </h2>

            <p className="text-sm text-muted-foreground">

              Comprehensive interview-style evaluation.

            </p>

          </div>

        </div>

        <div className="rounded-full bg-emerald-100 px-5 py-2 font-semibold text-emerald-700">

          Review Complete

        </div>

      </div>

      {/* Score Cards */}

      <div className="grid gap-5 border-b p-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-blue-50 p-5">

          <Gauge className="h-6 w-6 text-blue-600" />

          <p className="mt-3 text-sm text-muted-foreground">

            Overall Score

          </p>

          <h3 className="mt-2 text-4xl font-bold">

            {score}

          </h3>

        </div>

        <div className="rounded-2xl bg-emerald-50 p-5">

          <CheckCircle2 className="h-6 w-6 text-emerald-600" />

          <p className="mt-3 text-sm text-muted-foreground">

            Readability

          </p>

          <h3 className="mt-2 text-4xl font-bold">

            {readability}%

          </h3>

        </div>

        <div className="rounded-2xl bg-violet-50 p-5">

          <Sparkles className="h-6 w-6 text-violet-600" />

          <p className="mt-3 text-sm text-muted-foreground">

            Maintainability

          </p>

          <h3 className="mt-2 text-4xl font-bold">

            {maintainability}%

          </h3>

        </div>

        <div className="rounded-2xl bg-red-50 p-5">

          <Bug className="h-6 w-6 text-red-600" />

          <p className="mt-3 text-sm text-muted-foreground">

            Potential Bugs

          </p>

          <h3 className="mt-2 text-4xl font-bold">

            {bugs}

          </h3>

        </div>

      </div>
            {/* Analysis */}

      <div className="grid gap-6 border-b p-6 lg:grid-cols-2">

        <div className="space-y-5">

          <h3 className="text-xl font-bold">
            Complexity Analysis
          </h3>

          <div className="rounded-2xl border bg-slate-50 p-5">

            <div className="flex items-center justify-between">

              <span className="font-medium">
                Time Complexity
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
                {complexity}
              </span>

            </div>

          </div>

          <div className="rounded-2xl border bg-slate-50 p-5">

            <div className="flex items-center justify-between">

              <span className="font-medium">
                Space Complexity
              </span>

              <span className="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700">
                O(1)
              </span>

            </div>

          </div>

          <div className="rounded-2xl border bg-slate-50 p-5">

            <div className="flex items-center justify-between">

              <span className="font-medium">
                Security
              </span>

              <span
                className={`rounded-full px-3 py-1 font-semibold ${
                  security === "Excellent"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {security}
              </span>

            </div>

          </div>

        </div>

        <div className="space-y-5">

          <h3 className="text-xl font-bold">
            AI Evaluation
          </h3>

          {[
            {
              title: "Interview Score",
              value: 94,
              color: "bg-blue-600",
            },
            {
              title: "Optimization",
              value: 91,
              color: "bg-emerald-600",
            },
            {
              title: "Code Quality",
              value: 96,
              color: "bg-violet-600",
            },
          ].map(item => (

            <div
              key={item.title}
              className="rounded-2xl border bg-slate-50 p-5"
            >

              <div className="mb-3 flex justify-between">

                <span className="font-medium">

                  {item.title}

                </span>

                <span className="font-semibold">

                  {item.value}%

                </span>

              </div>

              <div className="h-3 rounded-full bg-slate-200">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  className={`h-full rounded-full ${item.color}`}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* AI Recommendations */}

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          AI Recommendations
        </h2>

        <div className="mt-6 space-y-4">

          {[
            {
              type: "success",
              title: "Excellent readability",
              desc: "Your code is easy to understand with meaningful variable names.",
            },
            {
              type: "warning",
              title: "Optimize nested loops",
              desc: "A hash map can reduce the overall runtime complexity.",
            },
            {
              type: "info",
              title: "Improve edge case handling",
              desc: "Handle empty input and duplicate values before processing.",
            },
          ].map(item => (

            <div
              key={item.title}
              className={`rounded-2xl border p-5 ${
                item.type === "success"
                  ? "border-emerald-200 bg-emerald-50"
                  : item.type === "warning"
                  ? "border-amber-200 bg-amber-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Interview Feedback */}

      <div className="space-y-6 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Interview Feedback
          </h2>

          <p className="text-sm text-muted-foreground">
            AI-generated interviewer observations.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {[
            {
              title: "Problem Solving",
              score: "9.5/10",
              color: "bg-blue-600",
              feedback:
                "You identified an optimal solution quickly and followed a logical implementation strategy.",
            },
            {
              title: "Code Quality",
              score: "9.7/10",
              color: "bg-emerald-600",
              feedback:
                "Excellent naming conventions, modular structure and consistent formatting.",
            },
            {
              title: "Optimization",
              score: "9.2/10",
              color: "bg-violet-600",
              feedback:
                "Very efficient solution with minor opportunities for simplifying lookups.",
            },
            {
              title: "Communication",
              score: "9.0/10",
              color: "bg-amber-500",
              feedback:
                "Explain edge cases and complexity before coding to strengthen interview performance.",
            },
          ].map(item => (

            <motion.div
              key={item.title}
              whileHover={{ y: -3 }}
              className="rounded-3xl border bg-white p-6"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <span
                  className={`${item.color} rounded-full px-3 py-1 text-sm font-semibold text-white`}
                >
                  {item.score}
                </span>

              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                {item.feedback}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

      {/* Strengths & Improvements */}

      <div className="border-t p-6">

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

            <h3 className="text-xl font-bold text-emerald-700">
              Strengths
            </h3>

            <ul className="mt-5 space-y-3 text-muted-foreground">

              <li>✓ Clean and readable code</li>
              <li>✓ Good algorithm selection</li>
              <li>✓ Efficient runtime</li>
              <li>✓ Consistent coding style</li>
              <li>✓ Good modularization</li>

            </ul>

          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">

            <h3 className="text-xl font-bold text-amber-700">
              Areas to Improve
            </h3>

            <ul className="mt-5 space-y-3 text-muted-foreground">

              <li>• Discuss complexity earlier</li>
              <li>• Validate edge cases first</li>
              <li>• Explain trade-offs clearly</li>
              <li>• Reduce unnecessary iterations</li>
              <li>• Add more defensive checks</li>

            </ul>

          </div>

        </div>

      </div>

      {/* Hiring Recommendation */}

      <div className="border-t p-6">

        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 p-8 text-white">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-3xl font-bold">

                Hiring Recommendation

              </h2>

              <p className="mt-5 max-w-3xl leading-7 text-blue-100">

                Based on this coding interview,
                InterviewIQ AI predicts that the candidate
                demonstrates strong problem-solving ability,
                writes clean production-quality code,
                and would likely perform well in an SDE interview.

              </p>

            </div>

            <div className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur">

              <p className="text-blue-100">
                Recommendation
              </p>

              <h2 className="mt-3 text-5xl font-bold">
                Hire
              </h2>

              <p className="mt-2 text-blue-100">
                Confidence: 94%
              </p>

            </div>

          </div>

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Code Quality Inspector */}

      <div className="space-y-6 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Code Quality Inspector
          </h2>

          <p className="text-sm text-muted-foreground">
            AI evaluation based on software engineering best practices.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {[
            {
              title: "Naming Conventions",
              score: 96,
              desc: "Variables and methods are descriptive and consistent.",
              color: "bg-blue-600",
            },
            {
              title: "Code Structure",
              score: 94,
              desc: "Functions are modular with clear responsibilities.",
              color: "bg-emerald-600",
            },
            {
              title: "Reusability",
              score: 89,
              desc: "Logic can be extracted into reusable helpers.",
              color: "bg-violet-600",
            },
            {
              title: "Maintainability",
              score: 95,
              desc: "Code is easy to extend and debug.",
              color: "bg-amber-500",
            },
          ].map(item => (

            <motion.div
              key={item.title}
              whileHover={{ y: -2 }}
              className="rounded-3xl border bg-white p-6"
            >

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <span className="font-bold">
                  {item.score}%
                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-200">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  className={`h-full rounded-full ${item.color}`}
                />

              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

      {/* Clean Code Principles */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Clean Code Checklist
        </h2>

        <div className="mt-6 space-y-4">

          {[
            ["Meaningful variable names", true],
            ["Small focused functions", true],
            ["Avoid duplicated logic", true],
            ["Consistent formatting", true],
            ["Proper edge-case handling", false],
            ["Defensive programming", false],
          ].map(([title, ok]) => (

            <div
              key={title}
              className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5"
            >

              <span className="font-medium">
                {title}
              </span>

              {ok ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              ) : (
                <Bug className="h-6 w-6 text-red-500" />
              )}

            </div>

          ))}

        </div>

      </div>

      {/* SOLID Principles */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          SOLID Principles
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">

          {[
            ["S", "Single Responsibility", true],
            ["O", "Open / Closed", true],
            ["L", "Liskov Substitution", true],
            ["I", "Interface Segregation", false],
            ["D", "Dependency Inversion", false],
          ].map(([letter, name, ok]) => (

            <div
              key={letter}
              className="rounded-2xl border bg-slate-50 p-5 text-center"
            >

              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                  ok
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {letter}
              </div>

              <p className="mt-4 text-sm font-medium">
                {name}
              </p>

            </div>

          ))}

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Company Readiness */}

      <div className="space-y-6 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Company Readiness
          </h2>

          <p className="text-sm text-muted-foreground">
            Estimated interview performance across top companies.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {[
            { name: "Google", score: 92 },
            { name: "Amazon", score: 95 },
            { name: "Microsoft", score: 90 },
            { name: "Meta", score: 88 },
          ].map(company => (

            <div
              key={company.name}
              className="rounded-3xl border bg-white p-6"
            >

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  {company.name}
                </h3>

                <span className="text-lg font-bold">
                  {company.score}%
                </span>

              </div>

              <div className="mt-5 h-2 rounded-full bg-slate-200">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${company.score}%` }}
                  className="h-full rounded-full bg-blue-600"
                />

              </div>

              <p className="mt-4 text-sm text-muted-foreground">

                {
                  company.score >= 90
                    ? "Strong candidate"
                    : "Needs more practice"
                }

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Improvement Roadmap */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Improvement Roadmap
        </h2>

        <div className="mt-6 space-y-5">

          {[
            {
              step: "Explain your approach before coding.",
              progress: 100,
            },
            {
              step: "Handle edge cases first.",
              progress: 80,
            },
            {
              step: "Reduce unnecessary iterations.",
              progress: 70,
            },
            {
              step: "Discuss time & space complexity.",
              progress: 95,
            },
          ].map(item => (

            <div key={item.step}>

              <div className="mb-2 flex justify-between">

                <span className="font-medium">
                  {item.step}
                </span>

                <span className="font-semibold">
                  {item.progress}%
                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-200">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  className="h-full rounded-full bg-emerald-600"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* AI Learning Recommendations */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          AI Learning Recommendations
        </h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">

          {[
            {
              title: "Hash Maps",
              desc: "Improve lookup-based problems.",
            },
            {
              title: "Dynamic Programming",
              desc: "Practice optimization patterns.",
            },
            {
              title: "Graphs & Trees",
              desc: "Master traversal techniques.",
            },
          ].map(topic => (

            <motion.div
              key={topic.title}
              whileHover={{ y: -2 }}
              className="rounded-2xl border bg-slate-50 p-5"
            >

              <ShieldCheck className="h-6 w-6 text-blue-600" />

              <h3 className="mt-4 font-semibold">
                {topic.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {topic.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Interview Report */}

      <div className="space-y-6 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Interview Report
          </h2>

          <p className="text-sm text-muted-foreground">
            AI-generated evaluation from technical and behavioral perspectives.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl border bg-blue-50 p-6">

            <p className="text-sm text-muted-foreground">
              AI Confidence
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              94%
            </h2>

            <div className="mt-5 h-2 rounded-full bg-blue-200">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                className="h-full rounded-full bg-blue-600"
              />

            </div>

          </div>

          <div className="rounded-3xl border bg-emerald-50 p-6">

            <p className="text-sm text-muted-foreground">
              Final Grade
            </p>

            <h2 className="mt-3 text-5xl font-bold text-emerald-600">
              A+
            </h2>

            <p className="mt-3 text-sm text-emerald-700">
              Outstanding Performance
            </p>

          </div>

          <div className="rounded-3xl border bg-violet-50 p-6">

            <p className="text-sm text-muted-foreground">
              Recommendation
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Hire
            </h2>

            <p className="mt-3 text-sm text-violet-700">
              High confidence recommendation
            </p>

          </div>

        </div>

      </div>

      {/* Interview Timeline */}

      <div className="border-t p-6">

        <h2 className="text-2xl font-bold">
          Interview Timeline
        </h2>

        <div className="mt-6 space-y-5">

          {[
            {
              title: "Problem Understanding",
              time: "02:15",
              status: "Completed",
            },
            {
              title: "Algorithm Planning",
              time: "04:30",
              status: "Completed",
            },
            {
              title: "Implementation",
              time: "12:45",
              status: "Completed",
            },
            {
              title: "Testing & Debugging",
              time: "03:20",
              status: "Completed",
            },
          ].map(item => (

            <div
              key={item.title}
              className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5"
            >

              <div className="flex items-center gap-4">

                <div className="h-3 w-3 rounded-full bg-emerald-500" />

                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {item.time}
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                {item.status}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Interviewer Feedback */}

      <div className="border-t p-6">

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border bg-slate-50 p-6">

            <h3 className="text-xl font-bold">
              HR Feedback
            </h3>

            <p className="mt-5 leading-7 text-muted-foreground">
              The candidate communicated clearly, remained calm during the
              interview, and demonstrated confidence while explaining the
              solution. Overall collaboration and professionalism were strong.
            </p>

          </div>

          <div className="rounded-3xl border bg-slate-50 p-6">

            <h3 className="text-xl font-bold">
              Senior Engineer Feedback
            </h3>

            <p className="mt-5 leading-7 text-muted-foreground">
              The solution is efficient, well-structured, and easy to maintain.
              With slightly stronger discussion around edge cases and trade-offs,
              this would represent an excellent interview performance.
            </p>

          </div>

        </div>

      </div>

      {/* Final Summary */}

      <div className="border-t p-6">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">

          <h2 className="text-3xl font-bold">
            Final AI Summary
          </h2>

          <p className="mt-5 max-w-4xl leading-8 text-blue-100">
            This submission demonstrates strong data structure knowledge,
            excellent code readability, efficient algorithm selection,
            and professional coding practices. Continue practicing edge
            cases and interview communication to consistently perform
            at the highest level in technical interviews.

          </p>

        </div>

      </div>
            {/* Divider */}

      <div className="border-t" />

      {/* Actions */}

      <div className="flex flex-wrap items-center justify-between gap-4 p-6">

        <div>

          <h2 className="text-xl font-bold">
            Next Steps
          </h2>

          <p className="text-sm text-muted-foreground">
            Save your report or continue practicing to improve your score.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Button>
            Download Report
          </Button>

          <Button variant="outline">
            Share Report
          </Button>

          <Button variant="outline">
            Compare Attempts
          </Button>

          <Button variant="secondary">
            Practice Similar Problems
          </Button>

        </div>

      </div>

      {/* InterviewIQ Insights */}

      <div className="border-t p-6">

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-blue-50 p-5">

            <p className="text-sm text-muted-foreground">
              Problems Solved
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              681
            </h3>

          </div>

          <div className="rounded-2xl bg-emerald-50 p-5">

            <p className="text-sm text-muted-foreground">
              Interview Accuracy
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              94%
            </h3>

          </div>

          <div className="rounded-2xl bg-violet-50 p-5">

            <p className="text-sm text-muted-foreground">
              AI Confidence
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              High
            </h3>

          </div>

          <div className="rounded-2xl bg-amber-50 p-5">

            <p className="text-sm text-muted-foreground">
              Interview Level
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              SDE-1
            </h3>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-5">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="font-semibold">
              InterviewIQ AI Review Engine
            </h3>

            <p className="text-sm text-muted-foreground">
              AI-powered interview analysis with code quality, performance,
              hiring recommendations and personalized learning insights.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              AI Review
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Hiring Report
            </span>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
              Code Analysis
            </span>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
              Interview Ready
            </span>

          </div>

        </div>

      </div>

    </motion.section>
  );
}