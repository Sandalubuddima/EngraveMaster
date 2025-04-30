import { useState, useRef, useEffect } from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const textareaRef = useRef(null);
  const responseRef = useRef(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  // Scroll to bottom of response when it updates
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError("");
    const currentQuery = query;
    
    try {
      // Call your backend or OpenAI API here
      const res = await fetch("https://your-api.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuery }),
      });
      
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      setResponse(data.answer || "No answer returned.");
      
      // Add to conversation history
      setHistory([...history, 
        { type: "question", content: currentQuery },
        { type: "answer", content: data.answer || "No answer returned." }
      ]);
      
      // Clear input after successful response
      setQuery("");
    } catch (err) {
      console.error("Error:", err);
      setError(`Error: ${err.message || "Could not fetch answer."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-[#1c1c1c] text-black dark:text-white flex flex-col items-center p-6">
        <div className="w-full max-w-3xl mx-auto my-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Ask AI About Laser Engraving</h1>
          
          {/* Conversation History */}
          {history.length > 0 && (
            <div className="mb-6 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
              <div className="bg-white dark:bg-[#2a2a2a] p-4 max-h-80 overflow-y-auto" ref={responseRef}>
                {history.map((item, index) => (
                  <div key={index} className={`mb-4 ${item.type === "question" ? "text-blue-600 dark:text-blue-400" : ""}`}>
                    <p className="text-xs text-gray-500 mb-1">
                      {item.type === "question" ? "You:" : "AI:"}
                    </p>
                    <p className="text-base whitespace-pre-wrap">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Query Input */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={2}
              className="w-full p-4 pr-16 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-base resize-none"
              placeholder="Ask anything about laser engraving..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              onClick={handleAsk}
              className="absolute right-2 bottom-2 p-3 bg-[#007BFF] text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Tips Section */}
          <div className="mt-10 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Tips for asking questions:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Be specific about the materials you're working with</li>
              <li>Include your laser engraver model for more accurate advice</li>
              <li>Ask about safety precautions when working with new materials</li>
              <li>For technique questions, describe your current approach</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}