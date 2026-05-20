import Header from "./components/Header";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="dashboard">
        <div className="chat-section">
          <Chatbot />
        </div>
        <div className="info-section">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}

export default App;