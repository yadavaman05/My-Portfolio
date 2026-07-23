import { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend, FiLoader } from "react-icons/fi";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi! I'm Aman AI. Ask me about Aman's projects, skills, experience, education, or background.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "Tell me about Aman",
    "What are Aman's main skills?",
    "Show me Aman's projects",
    "Tell me about the AI Chat App",
  ];

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const trimmedText = textToSend.trim();
    if (!trimmedText) return;

    // Client-side validation: Max length check
    if (trimmedText.length > 500) {
      setErrorMsg("Please keep questions under 500 characters.");
      return;
    }

    setErrorMsg("");
    const userMsgId = Date.now().toString();
    const newUserMessage = { id: userMsgId, sender: "user", text: trimmedText };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedText }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to Aman AI.");
      }

      const data = await response.json();
      
      const aiReply = data.reply || "I can help with questions about Aman's skills, projects, experience, education, and background.";
      
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "ai", text: aiReply },
      ]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      setErrorMsg("Aman AI is currently resting. Please try again in a few moments!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Open Chat Assistant"
        >
          <FiMessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[400px] h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1cd8d2]/10 to-[#00bf8f]/10 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#00bf8f] animate-pulse" />
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-wide">
                  Ask Aman AI
                </h3>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  Assistant
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Chat Window"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-[#1cd8d2] to-[#00bf8f] text-white rounded-br-none"
                      : "bg-white/10 text-gray-200 border border-white/5 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* AI Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-2 text-gray-400 text-xs">
                  <FiLoader className="animate-spin text-[#00bf8f]" />
                  Aman AI is typing...
                </div>
              </div>
            )}

            {/* Error messaging */}
            {errorMsg && (
              <div className="text-center text-xs text-red-400/90 bg-red-950/20 border border-red-500/20 rounded-lg p-2.5">
                {errorMsg}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Starter Prompts */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 border-t border-white/5 bg-black/40">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">
                Suggestions:
              </span>
              <div className="flex flex-col gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="text-left text-xs bg-white/5 hover:bg-white/10 text-[#1cd8d2] hover:text-[#00bf8f] border border-white/10 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Input form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00bf8f] transition-colors"
              disabled={isLoading}
              maxLength={200}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] text-white disabled:opacity-50 active:scale-95 transition-all cursor-pointer"
              aria-label="Send message"
            >
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
