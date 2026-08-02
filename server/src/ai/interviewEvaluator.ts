import  openrouter  from "./openrouter";
import { buildEvaluationPrompt } from "./interviewEvaluationPrompt";

export const evaluateInterview = async (
  questions: unknown,
  answers: unknown
) => {
  const completion =
    await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL!,

      messages: [
        {
          role: "user",
          content: buildEvaluationPrompt(
            questions,
            answers
          ),
        },
      ],
    });

  const text =
    completion.choices[0].message.content ?? "";

  return JSON.parse(
    text.replace(/```json|```/g, "").trim()
  );
};