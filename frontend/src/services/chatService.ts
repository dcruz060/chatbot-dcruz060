import type { ChatRequest, ChatResponse } from "../types/chat";

/**
 * Producción (Vercel): llama a la Serverless Function /api/chat.
 * Desarrollo: usa VITE_API_URL o /api/chat; Vite hace proxy al backend ASP.NET local.
 */
const API_URL = import.meta.env.PROD
  ? "/api/chat"
  : (import.meta.env.VITE_API_URL ?? "/api/chat");

export async function sendQuestion(question: string): Promise<string> {
  const body: ChatRequest = { question };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Error al comunicarse con el servidor");
  }

  const data: ChatResponse = await response.json();
  return data.answer;
}
