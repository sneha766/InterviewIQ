import openrouter from "./openrouter";
import { resumePrompt } from "./prompt";
import { parseAIResponse } from "./parser";

import AppError from "../utils/AppError";

const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export const analyzeResumeText = async (
  resumeText: string
) => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(
        `OpenRouter Attempt ${attempt}`
      );

      const response =
        await openrouter.chat.completions.create({
          model:
            process.env.OPENROUTER_MODEL!,

          messages: [
            {
              role: "system",
              content: resumePrompt,
            },
            {
              role: "user",
              content: resumeText,
            },
          ],

          response_format: {
            type: "json_object",
          },

          temperature: 0.2,
        });

      const content =
        response.choices[0]?.message
          ?.content;

      if (!content) {
        throw new Error(
          "Empty AI response."
        );
      }

      return parseAIResponse(content);
    } catch (error) {
      lastError = error;

      console.error(
        `Attempt ${attempt} failed`,
        error
      );

      if (attempt < 3) {
        await sleep(2000);
      }
    }
  }

  throw new AppError(
    "Failed to analyze resume after multiple attempts.",
    500
  );
};