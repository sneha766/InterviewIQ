import  openrouter  from "./openrouter";
import { buildInterviewPrompt } from "./interviewPrompt";

export const generateInterview = async (
  role: string,
  type: string,
  difficulty: string
) => {
  const completion =
    await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL!,

      messages: [
        {
          role: "user",
          content: buildInterviewPrompt(
            role,
            type,
            difficulty
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