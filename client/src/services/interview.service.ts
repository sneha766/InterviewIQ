import api from "@/lib/axios";

export type InterviewType = "HR" | "TECHNICAL" | "CODING";
export type InterviewDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface CreateInterviewPayload {
  role: string;
  type: InterviewType;
  difficulty: InterviewDifficulty;
}

export interface SubmitInterviewPayload {
  answers: Array<{ question: string; answer: string }>;
}

export interface InterviewQuestion {
  id?: string;
  question: string;
}

export interface InterviewFeedback {
  overallScore: number;
  communication: number;
  technicalKnowledge: number;
  problemSolving: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  questionFeedback?: Array<{
    question: string;
    answer: string;
    score: number;
    feedback: string;
  }>;
}

export interface Interview {
  id: string;
  role: string;
  type: InterviewType;
  difficulty: InterviewDifficulty;
  questions: InterviewQuestion[];
  answers?: Array<{ question: string; answer: string }>;
  feedback?: InterviewFeedback;
  score?: number;
  completed: boolean;
  createdAt: string;
}

export async function createInterview(payload: CreateInterviewPayload) {
  const { data } = await api.post("/interview", payload);
  return data.data as Interview;
}

export async function submitInterview(id: string, payload: SubmitInterviewPayload) {
  const { data } = await api.post(`/interview/${id}/submit`, payload);
  return data.data as Interview;
}

export async function getInterviewHistory() {
  const { data } = await api.get("/interview");
  return data.data as Interview[];
}

export async function getInterviewById(id: string) {
  const { data } = await api.get(`/interview/${id}`);
  return data.data as Interview;
}

export async function deleteInterview(id: string) {
  const { data } = await api.delete(`/interview/${id}`);
  return data;
}
