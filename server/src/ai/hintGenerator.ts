import { callAIForJSON } from "../services/ai.service";
import { buildHintPrompt } from "./hintPrompt";

interface GenerateHintsInput {
  title: string;
  description: string;
  existingHints: string[];
  currentCode?: string;
}

export const generateHints = async (input: GenerateHintsInput) => {
  return callAIForJSON(buildHintPrompt(input));
};
