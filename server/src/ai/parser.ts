import AppError from "../utils/AppError";

export const parseAIResponse = (
  text: string
) => {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    console.error(cleaned);

    throw new AppError(
      "AI returned invalid JSON.",
      500
    );
  }
};