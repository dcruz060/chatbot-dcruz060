const API_URL = "http://localhost:5172/api/chat";

export async function sendQuestion(question: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Error al comunicarse con el servidor");
  }

  const data = await response.json();
  return data.answer;
}