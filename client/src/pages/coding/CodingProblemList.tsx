import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, CheckCircle2, Circle, ArrowUpRight, Code2, Percent } from "lucide-react";
import { useProblems, useSubmissionHistory } from "@/hooks/useCoding";
import CodingNav from "@/components/coding/CodingNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CodingProblemList() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const problemsQuery = useProblems();
  const historyQuery = useSubmissionHistory();

  // Map of problemId -> status ('Accepted' or 'Attempted')
  const problemStatusMap = useMemo(() => {
    const map = new Map<string, "Accepted" | "Attempted">();
    if (historyQuery.data) {
      for (const sub of historyQuery.data) {
        const existing = map.get(sub.problem.id);
        if (sub.status === "Accepted") {
          map.set(sub.problem.id, "Accepted");
        } else if (!existing) {
          map.set(sub.problem.id, "Attempted");
        }
      }
    }
    return map;
  }, [historyQuery.data]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    if (!problemsQuery.data) return [];
    const tagsSet = new Set<string>();
    for (const p of problemsQuery.data) {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => tagsSet.add(t));
      }
    }
    return Array.from(tagsSet).sort();
  }, [problemsQuery.data]);

  // Filter problems based on search, difficulty, and tag
  const filteredProblems = useMemo(() => {
    if (!problemsQuery.data) return [];
    return problemsQuery.data.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase());

      const matchesDiff =
        selectedDifficulty === "All" ||
        p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      const matchesTag =
        selectedTag === "All" ||
        (Array.isArray(p.tags) && p.tags.includes(selectedTag));

      return matchesSearch && matchesDiff && matchesTag;
    });
  }, [problemsQuery.data, search, selectedDifficulty, selectedTag]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <CodingNav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-6">
        {/* Header Hero Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 p-6 shadow-xl">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Code2 className="h-6 w-6 text-blue-500" />
              Interview Coding Problems
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Master data structures and algorithms with real multi-language execution and AI-powered hints.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-300">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/50 text-center">
              <div className="text-xl font-extrabold text-blue-400">
                {problemsQuery.data?.length ?? 0}
              </div>
              <div className="text-xs text-slate-400">Total Problems</div>
            </div>
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/50 text-center">
              <div className="text-xl font-extrabold text-emerald-400">
                {Array.from(problemStatusMap.values()).filter((s) => s === "Accepted").length}
              </div>
              <div className="text-xs text-slate-400">Solved</div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search problems by title or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty Filter */}
            <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800">
              {["All", "Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedDifficulty === diff
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Topic Filter */}
            {allTags.length > 0 && (
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-slate-950 text-xs font-medium text-slate-300 border border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Topics</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Problems Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
          {problemsQuery.isPending ? (
            <div className="p-12 text-center text-slate-400">Loading problem set...</div>
          ) : filteredProblems.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No problems found matching your criteria.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">Status</th>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4 w-32">Difficulty</th>
                  <th className="py-3.5 px-4 w-36">Acceptance</th>
                  <th className="py-3.5 px-4">Topics</th>
                  <th className="py-3.5 px-4 w-24 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProblems.map((problem) => {
                  const status = problemStatusMap.get(problem.id);
                  const isSolved = status === "Accepted";

                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-4 px-4 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 mx-auto" />
                        ) : status === "Attempted" ? (
                          <Circle className="h-5 w-5 text-amber-400 fill-amber-400/20 mx-auto" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-700 mx-auto" />
                        )}
                      </td>

                      <td className="py-4 px-4 font-semibold text-white group-hover:text-blue-400 transition-colors">
                        <Link to={`/coding/problems/${problem.slug}`}>
                          {problem.title}
                        </Link>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            problem.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : problem.difficulty === "Medium"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-400 flex items-center gap-1 font-mono">
                        <Percent className="h-3.5 w-3.5 text-slate-500" />
                        {problem.acceptanceRate}%
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(problem.tags) &&
                            problem.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded border border-slate-700/50"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <Button
                          asChild
                          size="sm"
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/50"
                        >
                          <Link to={`/coding/problems/${problem.slug}`}>
                            Solve <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </Button>
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
