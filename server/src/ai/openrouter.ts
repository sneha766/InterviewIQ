import OpenAI from "openai";

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,

  baseURL: "https://openrouter.ai/api/v1",

  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5000",
    "X-Title": "InterviewIQ",
  },
});

export default openrouter;