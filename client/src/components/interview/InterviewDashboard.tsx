import { useMemo } from "react";
import { Brain, Plus, Trophy, Target, CheckCircle2, History, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInterviewHistory, useDeleteInterview } from "@/hooks/useInterview";
import { toast } from "sonner";

interface InterviewDashboardProps {
  onStartSetup: () => void;
  onViewDetail: (id: string) => void;
}

export default function InterviewDashboard({
  onStartSetup,
  onViewDetail,
}: InterviewDashboardProps) {
  const historyQuery = useInterviewHistory();
  const deleteMutation = useDeleteInterview();

  const history = historyQuery.data || [];

  const stats = useMemo(() => {
    const completed = history.filter((i) => i.completed);
    const totalCount = history.length;
    const completedCount = completed.length;
    const scores = completed
      .map((i) => i.score)
      .filter((s): s is number => typeof s === "number");

    const avgScore =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

    return {
      totalCount,
      completedCount,
      avgScore,
      bestScore,
      recent: completed[0] || history[0],
    };
  }, [history]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Interview deleted."),
      onError: () => toast.error("Failed to delete interview."),
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl border bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/20">
            <Brain className="h-3.5 w-3.5" /> AI Mock Interviews
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Practice Real Tech & HR Interviews
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Simulate realistic technical and behavioral interviews with instant AI feedback on communication, accuracy, and problem solving.
          </p>
        </div>

        <Button
          size="lg"
          onClick={onStartSetup}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 text-base shrink-0"
        >
          <Plus className="h-5 w-5" /> Start New Interview
        </Button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Interviews Completed</span>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.completedCount}</div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Average Score</span>
            <Target className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-blue-600">
            {stats.completedCount > 0 ? `${stats.avgScore}%` : "--"}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Best Score</span>
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-500">
            {stats.completedCount > 0 ? `${stats.bestScore}%` : "--"}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Total Mock Sessions</span>
            <History className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalCount}</div>
        </div>
      </div>

      {/* Main Content Area */}
      {historyQuery.isPending ? (
        <div className="rounded-3xl border bg-white p-12 text-center text-muted-foreground shadow-sm">
          Loading interview sessions...
        </div>
      ) : history.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl border bg-white p-16 text-center space-y-5 shadow-sm max-w-2xl mx-auto">
          <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto">
            <Brain className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">No interviews completed yet</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Configure your first AI mock interview for HR or Technical roles to start building confidence and receiving detailed AI evaluations.
            </p>
          </div>
          <Button
            onClick={onStartSetup}
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-8"
          >
            Start Your First Interview
          </Button>
        </div>
      ) : (
        /* History & Recent Session */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />
              Interview Sessions & History
            </h2>
          </div>

          <div className="rounded-3xl border bg-white overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
                <tr>
                  <th className="py-4 px-6">Role & Type</th>
                  <th className="py-4 px-6">Difficulty</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Score</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onViewDetail(item.id)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{item.role}</div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {item.type} Interview
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          item.difficulty === "EASY"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.difficulty === "MEDIUM"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      {item.completed ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                          In Progress
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-900">
                      {typeof item.score === "number" ? `${item.score}%` : "--"}
                    </td>

                    <td className="py-4 px-6 text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail(item.id);
                          }}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          View <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleDelete(e, item.id)}
                          className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
