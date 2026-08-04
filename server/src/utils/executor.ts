export interface ExecutionResult {
  stdout: string;
  stderr: string;
  compileOutput: string;
  executionTime: string;
  memory: string;
  status: "success" | "error";
}

export async function executeCode(
  language: string,
  code: string,
  input = ""
): Promise<ExecutionResult> {
  // Compilation Error
  if (
    code.includes("syntax_error") ||
    code.includes("compile_error")
  ) {
    return {
      stdout: "",
      stderr: "",
      compileOutput:
        `${language} compilation failed.`,
      executionTime: "--",
      memory: "--",
      status: "error",
    };
  }

  // Runtime Error
  if (
    code.includes("runtime_error") ||
    code.includes("throw")
  ) {
    return {
      stdout: "",
      stderr: "Runtime Error",
      compileOutput: "",
      executionTime: "5 ms",
      memory: "8 MB",
      status: "error",
    };
  }

  // Simulate output

  let output = "Program executed successfully.";

  if (code.includes("Hello")) {
    output = "Hello";
  }

  if (code.includes("cout")) {
    output = "Output generated.";
  }

  if (input) {
    output += `\nInput:\n${input}`;
  }

  return {
    stdout: output,
    stderr: "",
    compileOutput: "",
    executionTime: "12 ms",
    memory: "14 MB",
    status: "success",
  };
}