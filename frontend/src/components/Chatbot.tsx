import { useState, useRef, useEffect } from "react";
import { sendQuestion } from "../services/chatService";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hola! Soy el asistente virtual de Diego. Preguntame lo que quieras sobre su CV.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const answer = await sendQuestion(input);
      const botMessage: ChatMessage = { text: answer, sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = { text: "Error al conectar con el servidor. Asegurate de que el backend este corriendo.", sender: "bot" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <section className="chatbot">
      <h2>Chat con el CV</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <p>Escribiendo...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Pregunta algo sobre el CV..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          Enviar
        </button>
      </div>
    </section>
  );
}