import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";

type MobileView = "profile" | "chat";

function App() {
  const [mobileView, setMobileView] = useState<MobileView>("profile");

  return (
    <div className="app-layout">
      <nav className="mobile-tabs" aria-label="Main navigation">
        <button
          type="button"
          className={`mobile-tab ${mobileView === "profile" ? "active" : ""}`}
          onClick={() => setMobileView("profile")}
          aria-pressed={mobileView === "profile"}
        >
          Profile
        </button>
        <button
          type="button"
          className={`mobile-tab ${mobileView === "chat" ? "active" : ""}`}
          onClick={() => setMobileView("chat")}
          aria-pressed={mobileView === "chat"}
        >
          Chat
        </button>
      </nav>

      <Sidebar className={mobileView === "profile" ? "panel-visible" : "panel-hidden"} />
      <Chatbot className={mobileView === "chat" ? "panel-visible" : "panel-hidden"} />
    </div>
  );
}

export default App;
