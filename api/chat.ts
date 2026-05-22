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

/** Lee el CV desde backend/Data (sin modificar el backend ASP.NET). */
function loadCvData(): CvData {
  const filePath = path.join(process.cwd(), "backend", "Data", "cv.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as CvData;
}

/** Mismo enfoque que el backend: system prompt con el JSON del CV. */
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

function getEnvConfig(): { url: string; apiKey: string; model: string } | null {
  const url = process.env.GENAI_URL;
  const apiKey = process.env.GENAI_API_KEY;
  const model = process.env.GENAI_MODEL;

  if (!url || !apiKey || !model) {
    return null;
  }

  return { url, apiKey, model };
}

/** GET: comprueba que las variables existen (no muestra valores). Util para depurar en Vercel. */
function handleGetStatus(res: VercelResponse) {
  const url = process.env.GENAI_URL?.trim();
  const apiKey = process.env.GENAI_API_KEY?.trim();
  const model = process.env.GENAI_MODEL?.trim();

  return res.status(200).json({
    message:
      "Variables Sensitive en Vercel se ocultan al editar; un campo vacio no significa que se borraron.",
    configured: {
      GENAI_URL: Boolean(url),
      GENAI_API_KEY: Boolean(apiKey),
      GENAI_MODEL: Boolean(model),
    },
    allSet: Boolean(url && apiKey && model),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    return handleGetStatus(res);
  }

  if (req.method !== "POST") {
    return res.status(405).json({ answer: "Solo se permite GET (diagnostico) o POST (chat)." });
  }

  const body = req.body as ChatRequestBody | undefined;
  const question = typeof body?.question === "string" ? body.question.trim() : "";

  if (!question) {
    return res.status(400).json({ answer: "La pregunta no puede estar vacia." });
  }

  const env = getEnvConfig();
  if (!env) {
    return res.status(500).json({
      answer: "Configuracion de GenAI incompleta. Define GENAI_URL, GENAI_API_KEY y GENAI_MODEL en Vercel.",
    });
  }

  let cv: CvData;
  try {
    cv = loadCvData();
  } catch {
    return res.status(500).json({ answer: "No se pudo leer el archivo cv.json." });
  }

  const systemPrompt = buildSystemPrompt(cv);

  try {
    const genaiResponse = await fetch(env.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": env.apiKey,
        Authorization: `Bearer ${env.apiKey}`,
      },
      body: JSON.stringify({
        model: env.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      }),
    });

    const responseText = await genaiResponse.text();

    if (!genaiResponse.ok) {
      return res.status(502).json({
        answer: "No se pudo obtener una respuesta del servicio de IA. Intenta de nuevo mas tarde.",
      });
    }

    const data = JSON.parse(responseText) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({
        answer: "El servicio de IA devolvio un formato inesperado.",
      });
    }

    return res.status(200).json({ answer });
  } catch {
    return res.status(502).json({
      answer: "Error al conectar con el servicio de IA. Intenta de nuevo mas tarde.",
    });
  }
}
