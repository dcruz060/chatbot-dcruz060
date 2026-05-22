import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

interface CvData {
  name: string;
  [key: string]: unknown;
}

interface ChatRequestBody {
  question?: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
  error?: { message?: string };
}

const DEFAULT_MODEL = "gemini-2.0-flash";

function loadCvData(): CvData {
  const filePath = path.join(process.cwd(), "backend", "Data", "cv.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as CvData;
}

function buildSystemPrompt(cv: CvData): string {
  const cvJson = JSON.stringify(cv, null, 2);

  return `Eres el asistente virtual de ${cv.name}. Tu trabajo es responder preguntas sobre su CV de forma profesional, clara y concisa.

REGLAS:
- Solo responde con informacion que este en el CV proporcionado.
- No inventes experiencia, proyectos ni habilidades que no esten en los datos.
- Si no tienes informacion suficiente, di honestamente que esa informacion no aparece en el CV.
- Responde en espanol.
- Se profesional pero amigable.
- Responde de forma concisa, no mas de 3-4 oraciones a menos que te pidan mas detalle.

CV DE ${cv.name.toUpperCase()}:
${cvJson}`;
}

function getGoogleConfig(): { apiKey: string; model: string } | null {
  const apiKey = process.env.GOOGLE_AI_API_KEY?.trim();
  const model = (process.env.GOOGLE_AI_MODEL?.trim() || DEFAULT_MODEL).replace(/^models\//, "");

  if (!apiKey) {
    return null;
  }

  return { apiKey, model };
}

function handleGetStatus(res: VercelResponse) {
  const apiKey = process.env.GOOGLE_AI_API_KEY?.trim();
  const model = process.env.GOOGLE_AI_MODEL?.trim() || DEFAULT_MODEL;

  return res.status(200).json({
    provider: "Google AI Studio (Gemini)",
    configured: {
      GOOGLE_AI_API_KEY: Boolean(apiKey),
      GOOGLE_AI_MODEL: Boolean(model),
    },
    model: model.replace(/^models\//, ""),
    allSet: Boolean(apiKey),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    return handleGetStatus(res);
  }

  if (req.method !== "POST") {
    return res.status(405).json({ answer: "Metodo no permitido." });
  }

  const body = req.body as ChatRequestBody | undefined;
  const question = typeof body?.question === "string" ? body.question.trim() : "";

  if (!question) {
    return res.status(400).json({ answer: "La pregunta no puede estar vacia." });
  }

  const config = getGoogleConfig();
  if (!config) {
    return res.status(500).json({
      answer: "Falta GOOGLE_AI_API_KEY en Vercel. Crea la variable en Settings → Environment Variables.",
    });
  }

  let cv: CvData;
  try {
    cv = loadCvData();
  } catch {
    return res.status(500).json({ answer: "No se pudo leer el archivo cv.json." });
  }

  const systemPrompt = buildSystemPrompt(cv);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;

  try {
    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
      }),
    });

    const responseText = await geminiResponse.text();
    let data: GeminiResponse;

    try {
      data = JSON.parse(responseText) as GeminiResponse;
    } catch {
      return res.status(502).json({
        answer: "Google AI devolvio una respuesta invalida.",
      });
    }

    if (!geminiResponse.ok) {
      const msg = data.error?.message ?? `Error ${geminiResponse.status}`;
      return res.status(502).json({
        answer: `Google AI: ${msg}`,
      });
    }

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      return res.status(502).json({
        answer: "Google AI no devolvio texto en la respuesta.",
      });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return res.status(502).json({
      answer: `Error al conectar con Google AI: ${detail}`,
    });
  }
}
