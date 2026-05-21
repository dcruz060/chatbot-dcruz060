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

  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "No se pudo conectar con el servidor. Verifica tu conexion o intenta mas tarde."
    );
  }

  let data: ChatResponse | null = null;
  try {
    data = await response.json();
  } catch {
    // respuesta no JSON (p. ej. pagina de autenticacion de Vercel)
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Acceso bloqueado por proteccion de Vercel. Usa la URL de Production o desactiva Deployment Protection en el proyecto."
      );
    }
    throw new Error(
      data?.answer ?? `Error del servidor (${response.status}). Intenta de nuevo.`
    );
  }

  if (!data?.answer) {
    throw new Error("El servidor no devolvio una respuesta valida.");
  }

  return data.answer;
}
