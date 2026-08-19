import { ZodSchema } from "zod";

import openrouter from "../ai/openrouter";
import { parseAIResponse } from "../ai/parser";
import AppError from "../utils/AppError";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateStructuredOutput<T>(
  generator: () => Promise<unknown>,
  schema: ZodSchema<T>
): Promise<T> {
  const response = await generator();
  return schema.parse(response);
}

/**
 * Calls the configured OpenRouter model with a single user prompt, expects
 * a JSON response, and retries transient failures. Shared by any AI feature
 * that needs a one-shot JSON completion (code review, hints, etc.) so the
 * retry/parsing logic isn't duplicated per feature.
 */
export async function callAIForJSON(
  prompt: string,
  options: { attempts?: number; temperature?: number } = {}
): Promise<unknown> {
  const { attempts = 3, temperature = 0.2 } = options;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await openrouter.chat.completions.create({
        model: process.env.OPENROUTER_MODEL || "openrouter/free",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature,
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new Error("Empty AI response.");
      }

      return parseAIResponse(content);
    } catch (error) {
      console.error(`AI call attempt ${attempt} failed`, error);

      if (attempt >= attempts) {
        throw new AppError(
          "AI request failed after multiple attempts.",
          500
        );
      }

      await sleep(1500);
    }
  }

  // Unreachable — the loop above always returns or throws.
  throw new AppError("AI request failed.", 500);
}

export async function callAIForChat(
  messages: AIMessage[],
  options: { temperature?: number } = {}
): Promise<string> {
  const { temperature = 0.4 } = options;
  try {
    const response = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "openrouter/free",
      messages,
      temperature,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty AI chat response.");
    }
    return content;
  } catch (error: any) {
    console.error("AI chat failed", error);
    throw new AppError(error?.message || "AI chat service unavailable", 500);
  }
}