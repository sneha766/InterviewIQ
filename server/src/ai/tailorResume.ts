import  openrouter  from "./openrouter";
import { buildTailorPrompt } from "./tailorPrompt";
import { TailorResponseSchema } from "../schemas/tailor.schema";

export const tailorResume = async (
  resume: string,
  jobDescription: string
) => {
  const completion = await openrouter.chat.completions.create({
    model: process.env.OPENROUTER_MODEL!,
    messages: [
      {
        role: "user",
        content: buildTailorPrompt(resume, jobDescription),
      },
    ],
  });

  const content =
    completion.choices[0].message.content ?? "";

  const parsed = JSON.parse(
    content.replace(/```json|```/g, "").trim()
  );

  return TailorResponseSchema.parse(parsed);
};