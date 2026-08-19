import { useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import {
  Copy,
  RotateCcw,
  Maximize2,
  Minimize2,
  Type,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodingEditorProps {
  language: string;
  code: string;
  onChange: (value: string) => void;
}

const starterCode: Record<string, string> = {
  cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your solution here
        return 0;
    }
};`,
  java: `import java.util.*;

class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }
}`,
  python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        # Write your solution here
        return 0`,
  javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Write your solution here
    return 0;
};`,
  go: `package main

func maxProfit(prices []int) int {
    // Write your solution here
    return 0
}`,
};

export default function CodingEditor({
  language,
  code,
  onChange,
}: CodingEditorProps) {
  const [fontSize, setFontSize] = useState(14);
  const [fullscreen, setFullscreen] = useState(false);

  const editorValue = useMemo(() => {
    if (code && code.trim().length > 0) return code;
    return starterCode[language] ?? "";
  }, [language, code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editorValue);
  };

  const handleReset = () => {
    const starter = starterCode[language] ?? "";
    onChange(starter);
  };

  return (
    <div
      className={`bg-[#1E1E1E] flex flex-col overflow-hidden transition-all ${
        fullscreen ? "fixed inset-0 z-50 p-4 bg-slate-950" : "h-full w-full flex-1"
      }`}
    >
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#252526] px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Code Editor
          </span>
          <span className="rounded-full bg-blue-600/30 border border-blue-500/40 px-2.5 py-0.5 text-[11px] font-bold text-blue-300 uppercase">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-slate-400 hover:bg-slate-700 hover:text-white"
            onClick={handleCopy}
            title="Copy Code"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-slate-400 hover:bg-slate-700 hover:text-white"
            onClick={handleReset}
            title="Reset Starter Code"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-slate-400 hover:bg-slate-700 hover:text-white"
            onClick={() => setFontSize((prev) => Math.max(prev - 1, 11))}
            title="Decrease Font Size"
          >
            <Type className="h-3 w-3" />
          </Button>

          <span className="text-xs font-mono font-medium text-slate-300 px-1">
            {fontSize}px
          </span>

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-slate-400 hover:bg-slate-700 hover:text-white"
            onClick={() => setFontSize((prev) => Math.min(prev + 1, 22))}
            title="Increase Font Size"
          >
            <Type className="h-4 w-4" />
          </Button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> Saved
          </span>

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-slate-400 hover:bg-slate-700 hover:text-white"
            onClick={() => setFullscreen((prev) => !prev)}
            title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {fullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Monaco Editor Canvas */}
      <div className="flex-1 w-full relative min-h-0 bg-[#1E1E1E]">
        <Editor
          height="100%"
          language={language === "cpp" || language === "c++" ? "cpp" : language}
          theme="vs-dark"
          value={editorValue}
          onChange={(value) => onChange(value ?? "")}
          options={{
            fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 4,
            insertSpaces: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
}