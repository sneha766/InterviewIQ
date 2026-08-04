import { motion } from "framer-motion";

import Editor from "@monaco-editor/react";

import {
  Copy,
  RotateCcw,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Type,
  Save,
  BrainCircuit,
  Sparkles,
    Code2,
    Bug,
    Lightbulb,
    MessageSquareText,
} from "lucide-react";


import {
  useMemo,
  useState,
} from "react";

import { Button } from "../../ui/button";

interface CodingEditorProps {

  language: string;

  code: string;

  onChange: (value: string) => void;

}

const starterCode = {

  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {

public:

    // Write your solution here

};

int main() {

    return 0;

}`,

  java: `class Solution {

    public void solve() {

    }

}`,

  python: `class Solution:

    def solve(self):

        pass`,

  javascript: `function solve() {

}`,

  go: `package main

import "fmt"

func main() {

}`,

};

export default function CodingEditor({

  language,

  code,

  onChange,

}: CodingEditorProps) {

  const [

    fontSize,

    setFontSize,

  ] = useState(15);

  const [

    fullscreen,

    setFullscreen,

  ] = useState(false);

  const editorValue = useMemo(() => {

    if (code.length > 0)

      return code;

    return starterCode[
      language as keyof typeof starterCode
    ] ?? "";

  }, [language, code]);

  return (

    <motion.section

      layout

      className={`overflow-hidden rounded-[30px] border bg-[#1E1E1E] shadow-sm ${
        fullscreen
          ? "fixed inset-4 z-50"
          : "flex-1"
      }`}

    >

      {/* Toolbar */}

      <div className="flex items-center justify-between border-b border-slate-700 bg-[#252526] px-6 py-4">

        <div className="flex items-center gap-4">

          <h3 className="font-semibold text-white">

            Code Editor

          </h3>

          <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">

            {language.toUpperCase()}

          </div>

        </div>

        <div className="flex items-center gap-2">
                  <Button
            size="icon"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={() =>
              navigator.clipboard.writeText(editorValue)
            }
          >

            <Copy className="h-4 w-4"/>

          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={() =>
              onChange(
                starterCode[
                  language as keyof typeof starterCode
                ] ?? ""
              )
            }
          >

            <RotateCcw className="h-4 w-4"/>

          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={() =>
              setFontSize(prev =>
                Math.max(prev - 1, 12)
              )
            }
          >

            <Type className="h-4 w-4"/>

            <span className="sr-only">

              Decrease Font

            </span>

          </Button>

          <div className="flex items-center rounded-lg bg-slate-800 px-3 py-1">

            <span className="text-sm font-medium text-white">

              {fontSize}px

            </span>

          </div>

          <Button
            size="icon"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={() =>
              setFontSize(prev =>
                Math.min(prev + 1, 24)
              )
            }
          >

            <Type className="h-5 w-5"/>

            <span className="sr-only">

              Increase Font

            </span>

          </Button>

          <Button
            variant="secondary"
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >

            <Save className="mr-2 h-4 w-4"/>

            Saved

          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={() =>
              setFullscreen(prev => !prev)
            }
          >

            {fullscreen ? (

              <Minimize2 className="h-4 w-4"/>

            ) : (

              <Maximize2 className="h-4 w-4"/>

            )}

          </Button>

        </div>

      </div>

      {/* Monaco Editor */}

      <div className="h-[650px]">

        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={editorValue}
          onChange={(value) =>
            onChange(value ?? "")
          }
          options={{
            fontSize,
            minimap: {
              enabled: true,
            },
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
            {/* Status Bar */}

      <div className="border-t border-slate-700 bg-[#252526] px-6 py-3">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* Left */}

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">

            <div>

              Language

              <span className="ml-2 font-semibold text-white">

                {language.toUpperCase()}

              </span>

            </div>

            <div>

              Font

              <span className="ml-2 font-semibold text-white">

                {fontSize}px

              </span>

            </div>

            <div>

              Characters

              <span className="ml-2 font-semibold text-white">

                {editorValue.length}

              </span>

            </div>

            <div>

              Words

              <span className="ml-2 font-semibold text-white">

                {
                  editorValue
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .length
                }

              </span>

            </div>

            <div>

              Lines

              <span className="ml-2 font-semibold text-white">

                {
                  editorValue.split("\n").length
                }

              </span>

            </div>

          </div>

          {/* Right */}

          <div className="flex flex-wrap items-center gap-3">

            <div className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">

              Auto Save Enabled

            </div>

            <div className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white">

              UTF-8

            </div>

            <div className="rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold text-white">

              LF

            </div>

          </div>

        </div>

      </div>

      {/* Keyboard Shortcuts */}

      <div className="border-t border-slate-700 bg-[#1E1E1E] px-6 py-5">

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl bg-[#252526] p-4">

            <kbd className="rounded border border-slate-600 bg-slate-700 px-2 py-1 text-xs text-white">

              Ctrl + S

            </kbd>

            <p className="mt-3 text-sm text-slate-300">

              Save Code

            </p>

          </div>

          <div className="rounded-xl bg-[#252526] p-4">

            <kbd className="rounded border border-slate-600 bg-slate-700 px-2 py-1 text-xs text-white">

              Ctrl + C

            </kbd>

            <p className="mt-3 text-sm text-slate-300">

              Copy Selection

            </p>

          </div>

          <div className="rounded-xl bg-[#252526] p-4">

            <kbd className="rounded border border-slate-600 bg-slate-700 px-2 py-1 text-xs text-white">

              Ctrl + /

            </kbd>

            <p className="mt-3 text-sm text-slate-300">

              Toggle Comment

            </p>

          </div>

          <div className="rounded-xl bg-[#252526] p-4">

            <kbd className="rounded border border-slate-600 bg-slate-700 px-2 py-1 text-xs text-white">

              Alt + Shift + F

            </kbd>

            <p className="mt-3 text-sm text-slate-300">

              Format Document

            </p>

          </div>

        </div>

      </div>
            {/* AI Assistant */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .2,
        }}
        className="border-t border-slate-700 bg-[#161616] p-6"
      >

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-blue-600 p-3">

            <Sparkles className="h-6 w-6 text-white"/>

          </div>

          <div>

            <h3 className="text-xl font-semibold text-white">

              AI Coding Assistant

            </h3>

            <p className="mt-1 text-sm text-slate-400">

              Explain, optimize and review your code in real time.

            </p>

          </div>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-2xl border border-slate-700 bg-[#252526] p-5"
          >

            <Sparkles className="h-7 w-7 text-blue-500"/>

            <h4 className="mt-5 font-semibold text-white">

              Explain Code

            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-400">

              Get a detailed explanation
              of the selected algorithm
              and every important step.

            </p>

            <Button
              variant="secondary"
              className="mt-6 w-full"
            >

              Explain

            </Button>

          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-2xl border border-slate-700 bg-[#252526] p-5"
          >

            <Code2 className="h-7 w-7 text-violet-500"/>

            <h4 className="mt-5 font-semibold text-white">

              Optimize Solution

            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-400">

              Improve runtime,
              reduce memory,
              and generate
              a cleaner implementation.

            </p>

            <Button
              variant="secondary"
              className="mt-6 w-full"
            >

              Optimize

            </Button>

          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-2xl border border-slate-700 bg-[#252526] p-5"
          >

            <Bug className="h-7 w-7 text-red-500"/>

            <h4 className="mt-5 font-semibold text-white">

              Find Bugs

            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-400">

              Detect logical errors,
              edge cases,
              and possible runtime failures.

            </p>

            <Button
              variant="secondary"
              className="mt-6 w-full"
            >

              Analyze

            </Button>

          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-2xl border border-slate-700 bg-[#252526] p-5"
          >

            <BrainCircuit className="h-7 w-7 text-emerald-500"/>

            <h4 className="mt-5 font-semibold text-white">

              Complexity Analysis

            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-400">

              Calculate time and
              space complexity
              with optimization advice.

            </p>

            <Button
              variant="secondary"
              className="mt-6 w-full"
            >

              Analyze

            </Button>

          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-2xl border border-slate-700 bg-[#252526] p-5"
          >

            <Lightbulb className="h-7 w-7 text-amber-500"/>

            <h4 className="mt-5 font-semibold text-white">

              Generate Hints

            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-400">

              Receive interview-friendly
              hints without revealing
              the full solution.

            </p>

            <Button
              variant="secondary"
              className="mt-6 w-full"
            >

              Generate

            </Button>

          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-2xl border border-slate-700 bg-[#252526] p-5"
          >

            <MessageSquareText className="h-7 w-7 text-cyan-500"/>

            <h4 className="mt-5 font-semibold text-white">

              Interview Feedback

            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-400">

              Review your coding style,
              readability,
              and interview communication.

            </p>

            <Button
              variant="secondary"
              className="mt-6 w-full"
            >

              Review

            </Button>

          </motion.div>

        </div>

      </motion.div>
            {/* AI Chat */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .3,
        }}
        className="border-t border-slate-700 bg-[#111111] p-6"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-600 p-3">

            <BrainCircuit className="h-6 w-6 text-white"/>

          </div>

          <div>

            <h3 className="text-xl font-bold text-white">

              AI Coding Chat

            </h3>

            <p className="mt-1 text-sm text-slate-400">

              Ask InterviewIQ AI anything about your solution.

            </p>

          </div>

        </div>

        {/* Conversation */}

        <div className="mt-8 space-y-5">

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="max-w-4xl rounded-2xl bg-[#1F1F1F] p-5"
          >

            <p className="text-sm font-semibold text-blue-400">

              AI

            </p>

            <p className="mt-3 leading-8 text-slate-300">

              Need help with this coding problem?

              I can explain algorithms,
              analyze complexity,
              optimize your solution,
              or review your interview approach.

            </p>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="ml-auto max-w-4xl rounded-2xl bg-blue-600 p-5 text-white"
          >

            <p className="text-sm font-semibold">

              You

            </p>

            <p className="mt-3 leading-8">

              How can I optimize this solution?

            </p>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: .2,
            }}
            className="max-w-4xl rounded-2xl bg-[#1F1F1F] p-5"
          >

            <p className="text-sm font-semibold text-blue-400">

              AI

            </p>

            <p className="mt-3 leading-8 text-slate-300">

              Your current approach appears correct.

              Consider reducing nested loops,
              using a hash map for O(1) lookups,
              and discussing time-space trade-offs
              during the interview.

            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <Button
                size="sm"
                variant="secondary"
              >

                Insert Code

              </Button>

              <Button
                size="sm"
                variant="secondary"
              >

                Copy

              </Button>

              <Button
                size="sm"
                variant="secondary"
              >

                Regenerate

              </Button>

            </div>

          </motion.div>

        </div>

        {/* Input */}

        <div className="mt-8 flex gap-4">

          <input
            placeholder="Ask AI about your code..."
            className="flex-1 rounded-2xl border border-slate-700 bg-[#1F1F1F] px-5 py-4 text-white outline-none transition-all focus:border-blue-500"
          />

          <Button
            className="rounded-2xl px-8"
          >

            <Sparkles className="mr-2 h-4 w-4"/>

            Send

          </Button>

        </div>

      </motion.div>
            {/* AI Code Review */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .4,
        }}
        className="border-t border-slate-700 bg-[#161616] p-6"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-emerald-600 p-3">

            <BrainCircuit className="h-6 w-6 text-white"/>

          </div>

          <div>

            <h3 className="text-2xl font-bold text-white">

              AI Code Review

            </h3>

            <p className="mt-2 text-sm text-slate-400">

              Instant analysis of your solution quality.

            </p>

          </div>

        </div>

        {/* Metrics */}

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Code Quality

            </p>

            <h2 className="mt-3 text-4xl font-bold text-emerald-400">

              91%

            </h2>

            <div className="mt-5 h-2 rounded-full bg-slate-700">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "91%",
                }}
                className="h-full rounded-full bg-emerald-500"
              />

            </div>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Readability

            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-400">

              95%

            </h2>

            <div className="mt-5 h-2 rounded-full bg-slate-700">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "95%",
                }}
                className="h-full rounded-full bg-blue-500"
              />

            </div>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Time Complexity

            </p>

            <h2 className="mt-3 text-3xl font-bold text-violet-400">

              O(n)

            </h2>

            <p className="mt-4 text-sm text-slate-400">

              Optimal

            </p>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Space Complexity

            </p>

            <h2 className="mt-3 text-3xl font-bold text-amber-400">

              O(1)

            </h2>

            <p className="mt-4 text-sm text-slate-400">

              Excellent

            </p>

          </div>

        </div>

        {/* AI Suggestions */}

        <div className="mt-10">

          <h3 className="mb-6 text-xl font-semibold text-white">

            AI Suggestions

          </h3>

          <div className="space-y-5">

            <motion.div
              whileHover={{
                x: 5,
              }}
              className="rounded-2xl border border-emerald-700 bg-emerald-950/30 p-5"
            >

              <div className="flex gap-4">

                <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-400"/>

                <div>

                  <h4 className="font-semibold text-white">

                    Excellent Variable Naming

                  </h4>

                  <p className="mt-2 leading-7 text-slate-300">

                    Your variables are descriptive and
                    easy to understand, making the code
                    much more readable.

                  </p>

                </div>

              </div>

            </motion.div>

            <motion.div
              whileHover={{
                x: 5,
              }}
              className="rounded-2xl border border-amber-700 bg-amber-950/20 p-5"
            >

              <div className="flex gap-4">

                <Lightbulb className="mt-1 h-6 w-6 text-amber-400"/>

                <div>

                  <h4 className="font-semibold text-white">

                    Consider HashMap Optimization

                  </h4>

                  <p className="mt-2 leading-7 text-slate-300">

                    A hash map could reduce lookup time
                    and simplify your implementation.

                  </p>

                </div>

              </div>

            </motion.div>

            <motion.div
              whileHover={{
                x: 5,
              }}
              className="rounded-2xl border border-red-700 bg-red-950/20 p-5"
            >

              <div className="flex gap-4">

                <Bug className="mt-1 h-6 w-6 text-red-400"/>

                <div>

                  <h4 className="font-semibold text-white">

                    Edge Case Missing

                  </h4>

                  <p className="mt-2 leading-7 text-slate-300">

                    Handle empty arrays and
                    single-element inputs before
                    processing.

                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

        {/* Summary */}

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 text-white">

          <div className="flex items-start gap-5">

            <BrainCircuit className="mt-1 h-8 w-8"/>

            <div>

              <h3 className="text-2xl font-bold">

                Overall AI Assessment

              </h3>

              <p className="mt-4 leading-8 text-blue-100">

                This solution is clean,
                well-structured,
                and close to interview-ready.
                Adding edge case handling,
                explaining complexity,
                and discussing trade-offs aloud
                would make this an excellent
                technical interview answer.

              </p>

            </div>

          </div>

        </div>

      </motion.div>
            {/* Version History */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .5,
        }}
        className="border-t border-slate-700 bg-[#111111] p-6"
      >

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold text-white">

              Version History

            </h3>

            <p className="mt-2 text-sm text-slate-400">

              Automatically saved snapshots of your code.

            </p>

          </div>

          <div className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">

            Auto Save Enabled

          </div>

        </div>

        <div className="mt-8 space-y-5">

          <motion.div
            whileHover={{
              x: 4,
            }}
            className="rounded-2xl border border-slate-700 bg-[#1E1E1E] p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <h4 className="font-semibold text-white">

                  Current Version

                </h4>

                <p className="mt-2 text-sm text-slate-400">

                  Saved just now

                </p>

              </div>

              <Button
                size="sm"
                variant="secondary"
              >

                Current

              </Button>

            </div>

          </motion.div>

          <motion.div
            whileHover={{
              x: 4,
            }}
            className="rounded-2xl border border-slate-700 bg-[#1E1E1E] p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <h4 className="font-semibold text-white">

                  Version #4

                </h4>

                <p className="mt-2 text-sm text-slate-400">

                  2 minutes ago

                </p>

              </div>

              <Button
                size="sm"
                variant="outline"
              >

                Restore

              </Button>

            </div>

          </motion.div>

          <motion.div
            whileHover={{
              x: 4,
            }}
            className="rounded-2xl border border-slate-700 bg-[#1E1E1E] p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <h4 className="font-semibold text-white">

                  Version #3

                </h4>

                <p className="mt-2 text-sm text-slate-400">

                  5 minutes ago

                </p>

              </div>

              <Button
                size="sm"
                variant="outline"
              >

                Restore

              </Button>

            </div>

          </motion.div>

        </div>

      </motion.div>

      {/* Coding Activity */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .6,
        }}
        className="border-t border-slate-700 bg-[#161616] p-6"
      >

        <h3 className="text-2xl font-bold text-white">

          Coding Activity

        </h3>

        <div className="mt-8 grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Last Saved

            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">

              Just Now

            </h2>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Edit Count

            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">

              47

            </h2>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Typing Speed

            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">

              62 WPM

            </h2>

          </div>

          <div className="rounded-2xl bg-[#252526] p-6">

            <p className="text-sm text-slate-400">

              Session Time

            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">

              18 min

            </h2>

          </div>

        </div>

      </motion.div>

      {/* Interview Performance */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .7,
        }}
        className="border-t border-slate-700 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 text-white"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              Live Interview Performance

            </h3>

            <p className="mt-5 max-w-3xl leading-8 text-blue-100">

              InterviewIQ AI continuously evaluates
              your coding style,
              communication,
              problem-solving,
              and optimization choices while you work.

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

            <p className="text-blue-100">

              Current Rating

            </p>

            <h2 className="mt-3 text-5xl font-bold">

              A

            </h2>

            <p className="mt-2 text-blue-100">

              Excellent Progress

            </p>

          </div>

        </div>

      </motion.div>
            {/* Footer */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .8,
        }}
        className="border-t border-slate-700 bg-[#111111] px-8 py-6"
      >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <BrainCircuit className="h-6 w-6 text-blue-500"/>

              <h3 className="text-xl font-bold text-white">

                InterviewIQ AI Editor

              </h3>

            </div>

            <p className="mt-4 max-w-3xl leading-7 text-slate-400">

              Powered by Monaco Editor with integrated AI interview
              assistance. Practice coding interviews with intelligent
              feedback, automatic code review, complexity analysis,
              optimization suggestions, and real-time coaching.

            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">

              Monaco Editor

            </span>

            <span className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white">

              AI Review

            </span>

            <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">

              Auto Save

            </span>

            <span className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black">

              Interview Mode

            </span>

          </div>

        </div>

      </motion.div>

    </motion.section>

  );

}