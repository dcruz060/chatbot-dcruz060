export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}
