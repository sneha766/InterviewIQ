import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Say Hello",
    });

    console.log(response.text);
  } catch (error) {
    console.error(error);
  }
}

test();