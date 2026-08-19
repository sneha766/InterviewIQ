import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Play,
  Send,
  Sparkles,
  Lightbulb,
  Loader2,
  Code2,
  Plus,
  Trash2,
  Maximize2,
  Minimize2,
  MessageSquare,
} from "lucide-react";

import CodingNav from "@/components/coding/CodingNav";
import CodingEditor from "@/components/interview/coding/CodingEditor";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProblem, useRunCode, useSubmitCode, useGenerateHints } from "@/hooks/useCoding";
import { sendCodingChat, type RunCodeResult } from "@/services/coding.service";

interface WorkspaceTestCase {
  id: string;
  title: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  executionTime?: string;
}

export default function CodingProblemWorkspace() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [activeLeftTab, setActiveLeftTab] = useState<"description" | "hints" | "chat">("description");
  const [activeBottomTab, setActiveBottomTab] = useState<"testcase" | "console" | "results">("testcase");
  const [isBottomExpanded, setIsBottomExpanded] = useState(false);

  const [testCases, setTestCases] = useState<WorkspaceTestCase[]>([]);
  const [selectedTestCaseId, setSelectedTestCaseId] = useState<string>("");
  const [aiHints, setAiHints] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [lastExecutionResult, setLastExecutionResult] = useState<RunCodeResult | null>(null);
  const [lastExecutionInput, setLastExecutionInput] = useState<string>("");
  const [lastExpectedOutput, setLastExpectedOutput] = useState<string>("");

  const problemQuery = useProblem(slug || "");

  // Load starter code when problem or language changes
  useEffect(() => {
    if (!problemQuery.data) return;
    const starter = problemQuery.data.starterCode?.[language] ?? "";
    setCode(starter);
  }, [problemQuery.data, language]);

  // Load test cases when problem loads
  useEffect(() => {
    if (!problemQuery.data) return;
    const examples = problemQuery.data.examples || [];
    const initialCases: WorkspaceTestCase[] = examples.map((ex, index) => ({
      id: `case-${index + 1}`,
      title: `Case ${index + 1}`,
      input: ex.input,
      expectedOutput: ex.output,
    }));

    setTestCases(initialCases);
    if (initialCases.length > 0) {
      setSelectedTestCaseId(initialCases[0].id);
    }
  }, [problemQuery.data]);

  const runMutation = useRunCode();
  const submitMutation = useSubmitCode();
  const hintsMutation = useGenerateHints();

  const activeTestCase = useMemo(() => {
    return testCases.find((tc) => tc.id === selectedTestCaseId) || testCases[0];
  }, [testCases, selectedTestCaseId]);

  const handleRun = async () => {
    if (!activeTestCase) {
      toast.error("No test case selected to run.");
      return;
    }

    setActiveBottomTab("console");

    try {
      const res = await runMutation.mutateAsync({
        language,
        code,
        input: activeTestCase.input,
      });

      setLastExecutionResult(res);
      setLastExecutionInput(activeTestCase.input);
      setLastExpectedOutput(activeTestCase.expectedOutput);

      const actualOut = res.stdout || res.stderr || res.compileOutput || "";
      const isPassed =
        res.status === "success" &&
        actualOut.trim().replace(/\s+/g, " ") ===
          activeTestCase.expectedOutput.trim().replace(/\s+/g, " ");

      setTestCases((prev) =>
        prev.map((tc) =>
          tc.id === activeTestCase.id
            ? {
                ...tc,
                actualOutput: actualOut,
                passed: isPassed,
                executionTime: res.executionTime,
              }
            : tc
        )
      );
      toast.success("Code executed — output updated in Console tab below.");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to execute code.");
    }
  };

  const handleRunAllTests = async () => {
    setActiveBottomTab("results");
    for (const tc of testCases) {
      try {
        const res = await runMutation.mutateAsync({
          language,
          code,
          input: tc.input,
        });

        const actualOut = res.stdout || res.stderr || res.compileOutput || "";
        const isPassed =
          res.status === "success" &&
          actualOut.trim().replace(/\s+/g, " ") ===
            tc.expectedOutput.trim().replace(/\s+/g, " ");

        setTestCases((prev) =>
          prev.map((item) =>
            item.id === tc.id
              ? {
                  ...item,
                  actualOutput: actualOut,
                  passed: isPassed,
                  executionTime: res.executionTime,
                }
              : item
          )
        );
      } catch {
        // Continue
      }
    }
  };

  const handleSubmit = () => {
    if (!problemQuery.data) return;

    submitMutation.mutate(
      {
        language,
        code,
        problemId: problemQuery.data.id,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["coding-history"] });
          queryClient.invalidateQueries({ queryKey: ["coding-reports"] });
          toast.success(`Solution verdict: ${data.status}`);
          navigate(`/coding/submissions/${data.submissionId}`);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Submission failed.");
        },
      }
    );
  };

  const handleAddTestCase = () => {
    const newId = `custom-${Date.now()}`;
    const newCase: WorkspaceTestCase = {
      id: newId,
      title: `Case ${testCases.length + 1}`,
      input: "",
      expectedOutput: "",
    };
    setTestCases((prev) => [...prev, newCase]);
    setSelectedTestCaseId(newId);
  };

  const handleDeleteTestCase = (id: string) => {
    if (testCases.length <= 1) {
      toast.error("At least one testcase is required.");
      return;
    }
    const filtered = testCases.filter((tc) => tc.id !== id);
    setTestCases(filtered);
    if (selectedTestCaseId === id) {
      setSelectedTestCaseId(filtered[0].id);
    }
  };

  const handleGenerateHints = () => {
    if (!problemQuery.data) return;
    hintsMutation.mutate(
      { problemId: problemQuery.data.id, code },
      {
        onSuccess: (data) => {
          setAiHints((prev) => [...prev, ...data.hints]);
          setActiveLeftTab("hints");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to generate hint.");
        },
      }
    );
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsChatLoading(true);

    try {
      const data = await sendCodingChat({
        problemId: problemQuery.data?.id,
        language,
        code,
        messages: [...chatMessages, { role: "user", content: userMsg }],
      });

      if (data?.content) {
        setChatMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "AI Assistant service failed.");
    } finally {
      setIsChatLoading(false);
    }
  };

  if (problemQuery.isPending) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <CodingNav />
        <div className="flex-1 flex items-center justify-center text-slate-400">
          Loading problem workspace...
        </div>
      </div>
    );
  }

  if (!problemQuery.data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <CodingNav />
        <div className="flex-1 flex items-center justify-center text-slate-400">
          Problem not found.
        </div>
      </div>
    );
  }

  const problem = problemQuery.data;
  const execResult = lastExecutionResult || runMutation.data;

  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      <CodingNav />

      {/* Workspace Sub-Header Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-2">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-white tracking-tight">{problem.title}</h2>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
              problem.difficulty === "Easy"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : problem.difficulty === "Medium"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-8 w-32 bg-slate-950 border-slate-800 text-xs text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800 text-xs text-white">
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="go">Go</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            onClick={handleRun}
            disabled={runMutation.isPending}
            className="h-8 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 shadow"
          >
            {runMutation.isPending ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="mr-1.5 h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
                Run Code
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="h-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Judging...
              </>
            ) : (
              <>
                <Send className="mr-1.5 h-3.5 w-3.5" />
                Submit
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-950">
        {/* Left Side: Problem Description / Hints / Chat */}
        <div className="lg:col-span-5 border-r border-slate-800 flex flex-col overflow-hidden bg-slate-900/40">
          {/* Left Panel Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900 px-3">
            <button
              onClick={() => setActiveLeftTab("description")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeLeftTab === "description"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              Description
            </button>

            <button
              onClick={() => setActiveLeftTab("hints")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeLeftTab === "hints"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              Hints {aiHints.length > 0 && `(${aiHints.length})`}
            </button>

            <button
              onClick={() => setActiveLeftTab("chat")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeLeftTab === "chat"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              AI Assistant
            </button>
          </div>

          {/* Left Panel Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {activeLeftTab === "description" && (
              <>
                {/* Description */}
                <div className="space-y-3">
                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {problem.description}
                  </div>
                </div>

                {/* Examples */}
                {Array.isArray(problem.examples) && problem.examples.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Examples
                    </h3>
                    {problem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs space-y-1.5 font-mono"
                      >
                        <div className="font-semibold text-slate-300">Example {idx + 1}:</div>
                        <div className="text-slate-400">
                          <span className="text-slate-500">Input: </span>
                          <span className="text-slate-200">{ex.input}</span>
                        </div>
                        <div className="text-slate-400">
                          <span className="text-slate-500">Output: </span>
                          <span className="text-emerald-400">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-slate-500 font-sans text-xs pt-1">
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {Array.isArray(problem.constraints) && problem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Constraints
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 font-mono">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeLeftTab === "hints" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    Progressive AI Hints
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleGenerateHints}
                    disabled={hintsMutation.isPending}
                    className="h-7 text-xs border-slate-700 bg-slate-900 text-slate-200"
                  >
                    {hintsMutation.isPending ? (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    ) : (
                      <Sparkles className="h-3 w-3 mr-1 text-amber-400" />
                    )}
                    Get Hint
                  </Button>
                </div>

                {Array.isArray(problem.hints) && problem.hints.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase">
                      Problem Hints:
                    </div>
                    {problem.hints.map((h, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-300"
                      >
                        Hint {i + 1}: {h}
                      </div>
                    ))}
                  </div>
                )}

                {aiHints.map((hint, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 text-xs text-blue-300"
                  >
                    AI Hint {idx + 1}: {hint}
                  </div>
                ))}
              </div>
            )}

            {activeLeftTab === "chat" && (
              <div className="flex flex-col h-full space-y-4">
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 min-h-[250px]">
                  {chatMessages.length === 0 ? (
                    <div className="text-xs text-slate-400 text-center py-8 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                      Ask AI Assistant for guidance on your algorithm approach or bug troubleshooting.
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          msg.role === "user"
                            ? "bg-blue-600/20 text-blue-200 border border-blue-500/30 ml-4"
                            : "bg-slate-950 text-slate-300 border border-slate-800 mr-4"
                        }`}
                      >
                        <div className="font-semibold mb-1 text-[10px] uppercase tracking-wider text-slate-500">
                          {msg.role === "user" ? "You" : "AI Engineer"}
                        </div>
                        {msg.content}
                      </div>
                    ))
                  )}
                  {isChatLoading && (
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-400" /> AI is generating response...
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask about this problem or code..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <Button
                    size="sm"
                    onClick={handleSendChat}
                    disabled={isChatLoading || !chatInput.trim()}
                    className="h-8 bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 font-semibold"
                  >
                    Send
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Editor & Bottom Panel */}
        <div className="lg:col-span-7 flex flex-col h-full overflow-hidden">
          {/* Editor Container */}
          <div className="flex-1 relative bg-slate-950 flex flex-col overflow-hidden">
            <CodingEditor language={language} code={code} onChange={setCode} />
          </div>

          {/* Bottom Panel: Testcases & Console Output */}
          <div
            className={`border-t border-slate-800 bg-slate-900 flex flex-col shrink-0 transition-all duration-200 ${
              isBottomExpanded ? "h-[420px]" : "h-72"
            }`}
          >
            {/* Bottom Tabs Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-3 py-1.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveBottomTab("testcase")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeBottomTab === "testcase"
                      ? "bg-slate-800 text-white border border-slate-700"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Testcase
                </button>

                <button
                  onClick={() => setActiveBottomTab("console")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors relative ${
                    activeBottomTab === "console"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Console Output
                  {execResult && (
                    <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>

                <button
                  onClick={() => setActiveBottomTab("results")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeBottomTab === "results"
                      ? "bg-slate-800 text-white border border-slate-700"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Results Summary
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsBottomExpanded((prev) => !prev)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                  title={isBottomExpanded ? "Collapse Output Window" : "Expand Output Window"}
                >
                  {isBottomExpanded ? (
                    <Minimize2 className="h-3.5 w-3.5" />
                  ) : (
                    <Maximize2 className="h-3.5 w-3.5" />
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRunAllTests}
                  disabled={runMutation.isPending}
                  className="h-6 text-[11px] text-blue-400 hover:text-blue-300 hover:bg-blue-950/40"
                >
                  Run All Cases
                </Button>
              </div>
            </div>

            {/* Bottom Content Body */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3">
              {activeBottomTab === "testcase" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {testCases.map((tc) => (
                      <button
                        key={tc.id}
                        onClick={() => setSelectedTestCaseId(tc.id)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          selectedTestCaseId === tc.id
                            ? "bg-slate-800 text-white border border-slate-700"
                            : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
                        }`}
                      >
                        {tc.title}
                        {tc.passed !== undefined && (
                          <span
                            className={`h-2 w-2 rounded-full ${
                              tc.passed ? "bg-emerald-400" : "bg-rose-400"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                    <button
                      onClick={handleAddTestCase}
                      className="p-1 rounded-md bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {activeTestCase && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold text-[11px]">
                          Input:
                        </span>
                        {testCases.length > 1 && (
                          <button
                            onClick={() => handleDeleteTestCase(activeTestCase.id)}
                            className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[11px]"
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        )}
                      </div>
                      <textarea
                        value={activeTestCase.input}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTestCases((prev) =>
                            prev.map((tc) =>
                              tc.id === activeTestCase.id ? { ...tc, input: val } : tc
                            )
                          );
                        }}
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
                      />

                      {activeTestCase.actualOutput !== undefined && (
                        <div>
                          <div className="text-slate-400 font-semibold text-[11px] flex items-center gap-2 mb-1">
                            <span>Actual Execution Output:</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                activeTestCase.passed
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-rose-500/20 text-rose-400"
                              }`}
                            >
                              {activeTestCase.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          <pre className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 font-mono text-xs whitespace-pre-wrap">
                            {activeTestCase.actualOutput || "(empty stdout)"}
                          </pre>
                        </div>
                      )}

                      <div className="text-slate-400 font-semibold text-[11px]">
                        Expected Output:
                      </div>
                      <input
                        type="text"
                        value={activeTestCase.expectedOutput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTestCases((prev) =>
                            prev.map((tc) =>
                              tc.id === activeTestCase.id
                                ? { ...tc, expectedOutput: val }
                                : tc
                            )
                          );
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-emerald-400 focus:outline-none focus:border-blue-500 font-mono text-xs"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeBottomTab === "console" && (
                <div className="space-y-3">
                  {runMutation.isPending ? (
                    <div className="text-slate-400 flex items-center gap-2 py-4">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      Executing code on Judge0 Engine...
                    </div>
                  ) : execResult ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span
                          className={`font-extrabold px-3 py-1 rounded text-xs ${
                            execResult.status === "success"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          Verdict: {execResult.verdictStatus || execResult.status.toUpperCase()}
                        </span>
                        <span className="text-slate-300 font-mono">
                          Runtime: <strong className="text-white">{execResult.executionTime}</strong>
                        </span>
                        <span className="text-slate-300 font-mono">
                          Memory: <strong className="text-white">{execResult.memory}</strong>
                        </span>
                      </div>

                      {/* Always show Execution Output Block */}
                      <div>
                        <div className="text-slate-300 font-bold mb-1 flex items-center justify-between">
                          <span>Standard Output (stdout):</span>
                          {lastExecutionInput && (
                            <span className="text-slate-400 font-normal text-[11px]">
                              Input: <code className="text-blue-300 font-semibold">{lastExecutionInput}</code>
                            </span>
                          )}
                        </div>
                        <pre className="bg-slate-950 border-2 border-slate-800 p-3.5 rounded-xl text-slate-100 overflow-x-auto whitespace-pre-wrap font-mono min-h-[60px] text-xs shadow-inner">
                          {execResult.stdout ? execResult.stdout : <span className="text-slate-500 italic">(Code executed with zero stdout output)</span>}
                        </pre>
                      </div>

                      {lastExpectedOutput && (
                        <div>
                          <div className="text-slate-300 font-bold mb-1">Expected Output:</div>
                          <pre className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-emerald-400 overflow-x-auto whitespace-pre-wrap font-mono text-xs">
                            {lastExpectedOutput}
                          </pre>
                        </div>
                      )}

                      {execResult.stderr && (
                        <div>
                          <div className="text-rose-400 font-bold mb-1">Standard Error (stderr):</div>
                          <pre className="bg-slate-950 border border-rose-900/60 p-3 rounded-xl text-rose-300 overflow-x-auto whitespace-pre-wrap font-mono text-xs">
                            {execResult.stderr}
                          </pre>
                        </div>
                      )}

                      {execResult.compileOutput && (
                        <div>
                          <div className="text-amber-400 font-bold mb-1">Compilation Output:</div>
                          <pre className="bg-slate-950 border border-amber-900/60 p-3 rounded-xl text-amber-300 overflow-x-auto whitespace-pre-wrap font-mono text-xs">
                            {execResult.compileOutput}
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-slate-400 py-8 text-center bg-slate-950/40 rounded-xl border border-slate-800/80">
                      Click <strong className="text-emerald-400 font-bold">"Run Code"</strong> above to execute your code on real Judge0 compiler engine and view standard output here.
                    </div>
                  )}
                </div>
              )}

              {activeBottomTab === "results" && (
                <div className="space-y-3">
                  <div className="text-slate-300 font-bold">Testcase Pass Summary:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {testCases.map((tc) => (
                      <div
                        key={tc.id}
                        className={`p-2.5 rounded border flex items-center justify-between ${
                          tc.passed === true
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : tc.passed === false
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <span className="font-semibold">{tc.title}</span>
                        <span>
                          {tc.passed === true ? (
                            "✓ Passed"
                          ) : tc.passed === false ? (
                            "✗ Failed"
                          ) : (
                            "Not Executed"
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
