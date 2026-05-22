import { useState, useRef, useEffect, useCallback } from "react";
import { sendQuestion } from "../services/chatService";
import type { ChatMessage } from "../types/chat";
import { suggestedQuestions } from "../data/profile";

function createMessage(text: string, sender: ChatMessage["sender"]): ChatMessage {
  return {
    id: crypto.randomUUID(),
    text,
    sender,
  };
}

function IconChatHeader() {
  return (
    <span className="chat-header-icon" aria-hidden="true">
      💬
    </span>
  );
}

function IconAiWelcome() {
  return (
    <svg className="welcome-ai-icon" width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="12" y="16" width="40" height="32" rx="8" fill="#E8EDFF" stroke="#4F6EF7" strokeWidth="2" />
      <circle cx="24" cy="30" r="3" fill="#4F6EF7" />
      <circle cx="40" cy="30" r="3" fill="#4F6EF7" />
      <path d="M26 38h12" stroke="#4F6EF7" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 12v4M20 14l2 3M44 14l-2 3" stroke="#4F6EF7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconRobot() {
  return (
    <span className="msg-avatar bot-avatar" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="8" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9.5" cy="13" r="1" fill="currentColor" />
        <circle cx="14.5" cy="13" r="1" fill="currentColor" />
        <path d="M12 4v3M8 6l1 2M16 6l-1 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 12l18-9-9 18-2-7-7-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface WelcomeProps {
  onSuggestion: (question: string) => void;
  disabled: boolean;
}

function WelcomeScreen({ onSuggestion, disabled }: WelcomeProps) {
  return (
    <div className="welcome-screen">
      <IconAiWelcome />
      <h2 className="welcome-title">¡Hola! 👋</h2>
      <p className="welcome-subtitle">
        Soy un asistente de IA. Puedes hacerme cualquier pregunta sobre este CV y te responderé al
        instante.
      </p>
      <p className="welcome-suggestions-label">✨ Preguntas sugeridas</p>
      <div className="suggested-grid">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            className="suggested-pill"
            disabled={disabled}
            onClick={() => onSuggestion(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const showWelcome = messages.length === 0 && !loading;

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 || loading) {
      scrollToBottom();
    }
  }, [messages, loading, scrollToBottom]);

  const submitQuestion = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || loading) return;

      const userMessage = createMessage(trimmed, "user");
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const answer = await sendQuestion(trimmed);
        setMessages((prev) => [...prev, createMessage(answer, "bot")]);
      } catch (err) {
        const text =
          err instanceof Error
            ? err.message
            : "Error al conectar con el servidor. Intenta de nuevo.";
        setMessages((prev) => [...prev, createMessage(text, "bot")]);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  function handleSend() {
    submitQuestion(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const canSend = input.trim().length > 0 && !loading;

  return (
    <section className="chat-panel">
      <header className="chat-header">
        <IconChatHeader />
        <div className="chat-header-text">
          <h2>Chat con mi CV</h2>
          <p>Pregúntame lo que quieras sobre mi experiencia</p>
        </div>
      </header>

      <div className="chat-body">
        {showWelcome && (
          <WelcomeScreen onSuggestion={submitQuestion} disabled={loading} />
        )}

        {(messages.length > 0 || loading) && (
          <div
            className="chat-messages"
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`msg-row ${msg.sender}`}>
                {msg.sender === "bot" && <IconRobot />}
                <div className={`msg-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
                {msg.sender === "user" && (
                  <span className="msg-avatar user-avatar" aria-hidden="true">
                    TU
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="msg-row bot">
                <IconRobot />
                <div className="msg-bubble bot typing-bubble">
                  <div className="typing-indicator" aria-label="Escribiendo">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input-pill"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pregúntame sobre mi CV..."
          disabled={loading}
          aria-label="Mensaje para el asistente"
        />
        <button
          type="button"
          className="chat-send-btn"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Enviar mensaje"
        >
          <IconSend />
        </button>
      </div>
    </section>
  );
}
