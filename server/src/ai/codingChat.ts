import { callAIForChat, type AIMessage } from "../services/ai.service";
import { buildCodingChatSystemPrompt } from "./codingChatPrompt";

export interface CodingChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SendCodingChatMessageInput {
  language: string;
  code: string;
  problemTitle?: string;
  problemDescription?: string;
  messages: CodingChatMessage[];
}

export const sendCodingChatMessage = async ({
  language,
  code,
  problemTitle,
  problemDescription,
  messages,
}: SendCodingChatMessageInput) => {
  const systemMessage: AIMessage = {
    role: "system",
    content: buildCodingChatSystemPrompt({
      language,
      code,
      problemTitle,
      problemDescription,
    }),
  };

  return callAIForChat(
    [systemMessage, ...messages],
    { temperature: 0.4 }
  );
};
