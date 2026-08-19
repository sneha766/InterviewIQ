import { Link } from "react-router-dom";
import { History, CheckCircle2, XCircle, Clock, AlertTriangle, ArrowUpRight } from "lucide-react";
import { useSubmissionHistory } from "@/hooks/useCoding";
import CodingNav from "@/components/coding/CodingNav";

export default function CodingSubmissions() {
  const historyQuery = useSubmissionHistory();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <CodingNav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <History className="h-6 w-6 text-blue-500" />
              Submission History
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Review your past coding solutions, verdicts, execution performance, and test case outcomes.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
          {historyQuery.isPending ? (
            <div className="p-12 text-center text-slate-400">Loading submission history...</div>
          ) : !historyQuery.data || historyQuery.data.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No submissions recorded yet. Select a problem from the Problem list and execute your solution!
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Problem</th>
                  <th className="py-3.5 px-4 w-32">Language</th>
                  <th className="py-3.5 px-4 w-40">Status</th>
                  <th className="py-3.5 px-4 w-32">Runtime</th>
                  <th className="py-3.5 px-4 w-32">Memory</th>
                  <th className="py-3.5 px-4 w-44">Submitted At</th>
                  <th className="py-3.5 px-4 w-24 text-right">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {historyQuery.data.map((submission) => {
                  const isAccepted = submission.status === "Accepted";
                  const isCompileError = submission.status === "Compilation Error";
                  const isRuntimeError = submission.status === "Runtime Error";

                  return (
                    <tr
                      key={submission.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-4 font-semibold text-white">
                        <Link
                          to={`/coding/problems/${submission.problem.slug}`}
                          className="hover:text-blue-400 transition-colors"
                        >
                          {submission.problem.title}
                        </Link>
                      </td>

                      <td className="py-4 px-4">
                        <span className="bg-slate-800 text-slate-300 font-mono text-xs px-2.5 py-1 rounded border border-slate-700 uppercase">
                          {submission.language}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            isAccepted
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : isCompileError || isRuntimeError
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {isAccepted ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : isCompileError ? (
                            <AlertTriangle className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}
                          {submission.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">
                        {submission.runtime || "--"}
                      </td>

                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">
                        {submission.memory || "--"}
                      </td>

                      <td className="py-4 px-4 text-slate-400 text-xs flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                        {new Date(submission.createdAt).toLocaleDateString()} {" "}
                        {new Date(submission.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <Link
                          to={`/coding/submissions/${submission.id}`}
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-xs font-semibold"
                        >
                          View <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
