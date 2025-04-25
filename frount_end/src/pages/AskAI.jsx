// src/pages/AskAI.jsx
import { useState } from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      // Call your backend or OpenAI API here
      const res = await fetch("https://your-api.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      setResponse(data.answer || "No answer returned.");
    } catch (err) {
      setResponse("Error: Could not fetch answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 dark:bg-[#1c1c1c] text-black dark:text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Ask AI</h1>
      <div className="w-full max-w-2xl">
        <textarea
          rows={4}
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-base"
          placeholder="Ask anything about laser engraving..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleAsk}
          className="mt-4 px-6 py-3 bg-[#007BFF] text-white font-semibold rounded-xl hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
        <div className="mt-6 p-4 bg-gray-200 dark:bg-[#333] rounded-lg min-h-[100px]">
          {loading ? <p>Loading...</p> : <p>{response}</p>}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
