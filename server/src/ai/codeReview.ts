import { callAIForJSON } from "../services/ai.service";
import { buildCodeReviewPrompt } from "./codeReviewPrompt";

interface ReviewCodeInput {
  language: string;
  code: string;
  problemTitle?: string;
  problemDescription?: string;
}

export const reviewCode = async (input: ReviewCodeInput) => {
  return callAIForJSON(buildCodeReviewPrompt(input));
};
