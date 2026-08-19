"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = executeCode;
const axios_1 = __importDefault(require("axios"));
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const LANGUAGE_MAP = {
    cpp: 54,
    c_cpp: 54,
    "c++": 54,
    java: 62,
    python: 71,
    py: 71,
    python3: 71,
    javascript: 63,
    js: 63,
    go: 60,
    golang: 60,
};
const decodeB64 = (str) => {
    if (!str)
        return "";
    try {
        return Buffer.from(str, "base64").toString("utf-8");
    }
    catch {
        return str;
    }
};
/**
 * Wraps LeetCode function/class code with a complete driver harness including
 * all standard headers and main function runner.
 */
function wrapCodeForExecution(language, code) {
    const normLang = language.toLowerCase();
    const trimmed = code.trim();
    // 1. C++ LeetCode Harness
    if (normLang === "cpp" || normLang === "c++" || normLang === "c_cpp") {
        if (trimmed.includes("int main") || trimmed.includes("void main")) {
            return trimmed;
        }
        // Detect target method name
        let mainRunner = "";
        if (trimmed.includes("maxProfit")) {
            mainRunner = `
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string line;
    vector<string> lines;
    while (getline(cin, line)) {
        if (!line.empty()) lines.push_back(line);
    }
    if (lines.empty()) return 0;

    Solution sol;
    vector<int> prices = parseVectorInt(lines[0]);
    printVal(sol.maxProfit(prices));
    return 0;
}`;
        }
        else if (trimmed.includes("twoSum")) {
            mainRunner = `
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string line;
    vector<string> lines;
    while (getline(cin, line)) {
        if (!line.empty()) lines.push_back(line);
    }
    if (lines.empty()) return 0;

    Solution sol;
    vector<int> nums = parseVectorInt(lines[0]);
    int target = lines.size() >= 2 ? stoi(lines[1]) : 0;
    printVal(sol.twoSum(nums, target));
    return 0;
}`;
        }
        else if (trimmed.includes("isValid")) {
            mainRunner = `
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string line;
    vector<string> lines;
    while (getline(cin, line)) {
        if (!line.empty()) lines.push_back(line);
    }
    if (lines.empty()) return 0;

    Solution sol;
    string s = lines[0];
    if (s.length() >= 2 && s.front() == '"' && s.back() == '"') s = s.substr(1, s.length() - 2);
    printVal(sol.isValid(s));
    return 0;
}`;
        }
        else {
            // Default generic main
            mainRunner = `
int main() {
    return 0;
}`;
        }
        return `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <queue>
#include <stack>
#include <climits>
#include <cmath>
#include <map>
#include <set>
#include <numeric>
#include <utility>
using namespace std;

${trimmed}

static vector<int> parseVectorInt(const string& s) {
    vector<int> res;
    string cur = "";
    for (char c : s) {
        if (isdigit(c) || c == '-') {
            cur += c;
        } else if ((c == ',' || c == ']' || c == '}') && !cur.empty()) {
            res.push_back(stoi(cur));
            cur = "";
        }
    }
    return res;
}

static void printVal(int val) { cout << val << endl; }
static void printVal(long long val) { cout << val << endl; }
static void printVal(bool val) { cout << (val ? "true" : "false") << endl; }
static void printVal(const string& val) { cout << val << endl; }
static void printVal(const vector<int>& val) {
    cout << "[";
    for (size_t i = 0; i < val.size(); i++) {
        cout << val[i] << (i + 1 < val.size() ? "," : "");
    }
    cout << "]" << endl;
}

${mainRunner}
`;
    }
    // 2. Python LeetCode Harness
    if (normLang === "python" || normLang === "py" || normLang === "python3") {
        if (trimmed.includes("if __name__ ==") || trimmed.includes("def main(")) {
            return trimmed;
        }
        const pyCode = trimmed.replace(/list\[/g, "List[");
        return `import sys, json
from typing import List, Dict, Tuple, Optional, Set

${pyCode}

if __name__ == '__main__':
    raw = sys.stdin.read().strip()
    if raw:
        lines = [l.strip() for l in raw.split('\\n') if l.strip()]
        if hasattr(sys.modules[__name__], 'Solution'):
            sol = Solution()
            methods = [m for m in dir(sol) if not m.startswith('_')]
            if methods:
                func = getattr(sol, methods[0])
                args = []
                for l in lines:
                    try:
                        args.append(json.loads(l))
                    except Exception:
                        args.append(l)
                try:
                    res = func(*args)
                    if res is not None:
                        print(json.dumps(res) if isinstance(res, (list, dict, bool)) else res)
                except Exception:
                    if args:
                        try:
                            res = func(args[0])
                            if res is not None:
                                print(json.dumps(res) if isinstance(res, (list, dict, bool)) else res)
                        except Exception as e:
                            print(f"Execution Error: {e}", file=sys.stderr)
`;
    }
    // 3. JavaScript LeetCode Harness
    if (normLang === "javascript" || normLang === "js") {
        if (trimmed.includes("process.stdin")) {
            return trimmed;
        }
        return `const fs = require('fs');

${trimmed}

try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
        const lines = raw.split('\\n').map(l => l.trim()).filter(Boolean);
        const args = lines.map(line => {
            try { return JSON.parse(line); } catch { return line; }
        });

        let res;
        if (typeof Solution === 'function') {
            const sol = new Solution();
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(sol)).filter(m => m !== 'constructor');
            if (methods.length > 0) {
                res = sol[methods[0]](...args);
            }
        } else if (typeof maxProfit === 'function') {
            res = maxProfit(...args);
        } else if (typeof twoSum === 'function') {
            res = twoSum(...args);
        }

        if (res !== undefined) {
            console.log(typeof res === 'object' ? JSON.stringify(res) : res);
        }
    }
} catch (err) {
    console.error(err);
}
`;
    }
    // 4. Java LeetCode Harness
    if (normLang === "java") {
        if (trimmed.includes("public static void main")) {
            return trimmed;
        }
        return `import java.util.*;
import java.io.*;

${trimmed}

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            if (!line.trim().isEmpty()) sb.append(line.trim()).append("\n");
        }
        String input = sb.toString().trim();
        if (input.isEmpty()) return;

        String[] lines = input.split("\n");
        Solution sol = new Solution();
        java.lang.reflect.Method[] methods = Solution.class.getDeclaredMethods();
        for (java.lang.reflect.Method m : methods) {
            if (!m.getName().equals("main")) {
                m.setAccessible(true);
                Class<?>[] params = m.getParameterTypes();
                if (params.length == 1 && params[0] == int[].class) {
                    int[] arr = parseArray(lines[0]);
                    Object res = m.invoke(sol, arr);
                    System.out.println(res);
                    return;
                } else if (params.length == 2 && params[0] == int[].class && params[1] == int.class) {
                    int[] arr = parseArray(lines[0]);
                    int target = Integer.parseInt(lines[1].trim());
                    Object res = m.invoke(sol, arr, target);
                    if (res instanceof int[]) {
                        System.out.println(Arrays.toString((int[]) res));
                    } else {
                        System.out.println(res);
                    }
                    return;
                }
            }
        }
    }

    private static int[] parseArray(String s) {
        s = s.replaceAll("[\\[\\]\\s]", "");
        if (s.isEmpty()) return new int[0];
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}
`;
    }
    return trimmed;
}
/**
 * Executes code using Judge0 CE API with Base64 encoding as primary engine,
 * falling back gracefully to local host compilers.
 */
async function executeCode(language, code, input = "") {
    const normLang = language.toLowerCase();
    const judge0LangId = LANGUAGE_MAP[normLang];
    if (!judge0LangId) {
        return {
            stdout: "",
            stderr: `Unsupported language: ${language}`,
            compileOutput: "",
            executionTime: "--",
            memory: "--",
            status: "error",
            verdictStatus: "Execution Error",
        };
    }
    const executableCode = wrapCodeForExecution(normLang, code || "");
    const safeInput = input || "";
    // Attempt 1: Base64-encoded Judge0 CE execution
    try {
        const b64Code = Buffer.from(executableCode).toString("base64");
        const b64Input = Buffer.from(safeInput).toString("base64");
        const response = await axios_1.default.post("https://ce.judge0.com/submissions?base64_encoded=true&wait=true", {
            source_code: b64Code,
            language_id: judge0LangId,
            stdin: b64Input,
        }, {
            headers: { "Content-Type": "application/json" },
            timeout: 12000,
        });
        const data = response.data;
        const stdout = decodeB64(data.stdout);
        const stderr = decodeB64(data.stderr);
        const compileOutput = decodeB64(data.compile_output);
        const timeInSec = parseFloat(data.time || "0");
        const executionTime = timeInSec > 0 ? `${Math.round(timeInSec * 1000)} ms` : "< 1 ms";
        const memoryInKb = parseInt(data.memory || "0", 10);
        const memory = memoryInKb > 1024
            ? `${(memoryInKb / 1024).toFixed(1)} MB`
            : memoryInKb > 0
                ? `${memoryInKb} KB`
                : "--";
        const statusDesc = data.status?.description || "Unknown";
        const isSuccess = data.status?.id === 3; // 3 = Accepted in Judge0
        let verdictStatus = statusDesc;
        if (data.status?.id === 6) {
            verdictStatus = "Compilation Error";
        }
        else if (data.status?.id === 7 ||
            data.status?.id === 8 ||
            data.status?.id === 9 ||
            data.status?.id === 10 ||
            data.status?.id === 11 ||
            data.status?.id === 12) {
            verdictStatus = "Runtime Error";
        }
        else if (data.status?.id === 5) {
            verdictStatus = "Time Limit Exceeded";
        }
        return {
            stdout,
            stderr,
            compileOutput,
            executionTime,
            memory,
            status: isSuccess ? "success" : "error",
            verdictStatus,
        };
    }
    catch (apiError) {
        console.warn("Judge0 CE execution failed or timed out, trying local host execution fallback...", apiError?.message);
        return executeLocalFallback(normLang, executableCode, safeInput);
    }
}
/**
 * Fallback host process execution for offline/unreachable Judge0 cases.
 */
async function executeLocalFallback(language, code, input) {
    const tmpDir = fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), "iq-exec-"));
    const startTime = Date.now();
    try {
        if (language === "python" || language === "py") {
            const filePath = path_1.default.join(tmpDir, "script.py");
            fs_1.default.writeFileSync(filePath, code);
            return runProcess("python", [filePath], input, tmpDir, startTime);
        }
        if (language === "javascript" || language === "js") {
            const filePath = path_1.default.join(tmpDir, "script.js");
            fs_1.default.writeFileSync(filePath, code);
            return runProcess("node", [filePath], input, tmpDir, startTime);
        }
        if (language === "cpp" || language === "c++") {
            const filePath = path_1.default.join(tmpDir, "solution.cpp");
            const exePath = path_1.default.join(tmpDir, os_1.default.platform() === "win32" ? "solution.exe" : "solution");
            fs_1.default.writeFileSync(filePath, code);
            const compileRes = await runCmd(`g++ -O2 -std=c++17 "${filePath}" -o "${exePath}"`, tmpDir);
            if (compileRes.exitCode !== 0) {
                return {
                    stdout: "",
                    stderr: "",
                    compileOutput: compileRes.stderr || compileRes.stdout,
                    executionTime: "--",
                    memory: "--",
                    status: "error",
                    verdictStatus: "Compilation Error",
                };
            }
            return runProcess(exePath, [], input, tmpDir, startTime);
        }
        return {
            stdout: "",
            stderr: `Local fallback not supported for language: ${language}`,
            compileOutput: "",
            executionTime: "--",
            memory: "--",
            status: "error",
            verdictStatus: "Execution Error",
        };
    }
    finally {
        try {
            fs_1.default.rmSync(tmpDir, { recursive: true, force: true });
        }
        catch {
            // Cleanup best effort
        }
    }
}
function runProcess(cmd, args, input, cwd, startTime) {
    return new Promise((resolve) => {
        const proc = (0, child_process_1.execFile)(cmd, args, { cwd, timeout: 5000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
            const elapsed = Date.now() - startTime;
            if (error && error.killed) {
                return resolve({
                    stdout: stdout || "",
                    stderr: "Time Limit Exceeded (5s limit)",
                    compileOutput: "",
                    executionTime: "5000 ms",
                    memory: "--",
                    status: "error",
                    verdictStatus: "Time Limit Exceeded",
                });
            }
            const isError = Boolean(error);
            resolve({
                stdout: stdout || "",
                stderr: stderr || (error ? error.message : ""),
                compileOutput: "",
                executionTime: `${elapsed} ms`,
                memory: "--",
                status: isError ? "error" : "success",
                verdictStatus: isError ? "Runtime Error" : "Accepted",
            });
        });
        if (input && proc.stdin) {
            proc.stdin.write(input);
            proc.stdin.end();
        }
    });
}
function runCmd(cmd, cwd) {
    return new Promise((resolve) => {
        (0, child_process_1.exec)(cmd, { cwd, timeout: 10000 }, (error, stdout, stderr) => {
            resolve({
                exitCode: error ? (typeof error.code === "number" ? error.code : 1) : 0,
                stdout,
                stderr,
            });
        });
    });
}
