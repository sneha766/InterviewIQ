export interface RunCodePayload {
  language: string;
  code: string;
  input?: string;
}

export interface RunCodeResult {
  stdout: string;
  stderr: string;
  compileOutput: string;
  executionTime: string;
  memory: string;
  status: "idle" | "running" | "success" | "error";
}