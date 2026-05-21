import { useState, useRef, useEffect, useCallback } from "react";
import { sendQuestion } from "../services/chatService";
import type { ChatMessage } from "../types/chat";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  text: "Hola! Soy el asistente virtual de Diego. Preguntame lo que quieras sobre su CV.",
  sender: "bot",
};

function createMessage(text: string, sender: ChatMessage["sender"]): ChatMessage {
  return {
    id: crypto.randomUUID(),
    text,
    sender,
  };
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  function handleClear() {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  }

  async function handleSend() {
    const question = input.trim();
    if (!question || loading) return;

    const userMessage = createMessage(question, "user");
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const answer = await sendQuestion(question);
      const botMessage = createMessage(answer, "bot");
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = createMessage(
        "Error al conectar con el servidor. Asegurate de que el backend este corriendo.",
        "bot"
      );
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const canSend = input.trim().length > 0 && !loading;

  return (
    <section className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <span className="chatbot-avatar" aria-hidden="true">
            DC
          </span>
          <div>
            <h2>Asistente del CV</h2>
            <p>Pregunta sobre experiencia, educacion o habilidades</p>
          </div>
        </div>
        <button
          type="button"
          className="btn-clear"
          onClick={handleClear}
          disabled={loading}
          title="Limpiar historial del chat"
        >
          Limpiar chat
        </button>
      </div>

      <div className="chat-messages" ref={messagesContainerRef} role="log" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <span className="message-label">{msg.sender === "user" ? "Tu" : "Asistente"}</span>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="message bot loading">
            <span className="message-label">Asistente</span>
            <div className="typing-indicator" aria-label="Escribiendo">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pregunta algo sobre el CV..."
          disabled={loading}
          aria-label="Mensaje para el asistente"
        />
        <button type="button" onClick={handleSend} disabled={!canSend}>
          Enviar
        </button>
      </div>
    </section>
  );
}
