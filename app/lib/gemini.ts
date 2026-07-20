import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGemini() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY missing in .env.local and Vercel");
  return new GoogleGenerativeAI(key);
}