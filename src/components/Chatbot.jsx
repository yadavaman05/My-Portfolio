import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiSend,
  FiTrash2,
  FiRefreshCw,
  FiGithub,
  FiLinkedin,
  FiFileText,
  FiExternalLink
} from "react-icons/fi";

// Futuristic 3D-style SVG Robot Assistant Avatar
function RobotAvatar({ state = "idle", size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
    >
      <defs>
        <filter id="neonGlowCyan" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="neonGlowAmber" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="visorBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1cd8d2" />
          <stop offset="100%" stopColor="#00bf8f" />
        </linearGradient>
        <radialGradient id="thrusterGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#00bf8f" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#1cd8d2" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1cd8d2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Thruster Flame/Glow (Hover Propulsion) */}
      <motion.ellipse
        cx="40"
        cy="90"
        rx="12"
        ry="3.5"
        fill="url(#thrusterGrad)"
        animate={
          state === "thinking"
            ? { scale: [0.75, 1.35, 0.75], opacity: [0.5, 0.95, 0.5] }
            : { scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.75, 0.4] }
        }
        transition={{
          repeat: Infinity,
          duration: state === "thinking" ? 0.4 : 1.4,
          ease: "easeInOut"
        }}
      />

      {/* Neck */}
      <rect x="35" y="55" width="10" height="6" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />

      {/* Torso/Body */}
      <path
        d="M 22 60 L 58 60 C 62 60 64 63 62 67 L 54 82 C 52 85 48 87 44 87 L 36 87 C 32 87 28 85 26 82 L 18 67 C 16 63 18 60 22 60 Z"
        fill="url(#bodyGrad)"
        stroke="#334155"
        strokeWidth="1.5"
      />

      {/* Chest screen display */}
      <rect x="28" y="65" width="24" height="14" rx="3.5" fill="#020617" stroke="#1e293b" strokeWidth="1" />

      {/* Chest display signals */}
      {state === "speaking" ? (
        <motion.path
          d="M 31 72 L 34 67 L 37 75 L 40 66 L 43 76 L 46 68 L 49 72"
          fill="none"
          stroke="#00bf8f"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            d: [
              "M 31 72 L 34 67 L 37 75 L 40 66 L 43 76 L 46 68 L 49 72",
              "M 31 72 L 34 74 L 37 67 L 40 76 L 43 68 L 46 73 L 49 72",
              "M 31 72 L 34 67 L 37 75 L 40 66 L 43 76 L 46 68 L 49 72"
            ]
          }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
        />
      ) : state === "thinking" ? (
        <motion.circle
          cx="40"
          cy="72"
          r="4"
          fill="#f59e0b"
          filter="url(#neonGlowAmber)"
          animate={{
            scale: [0.75, 1.4, 0.75],
            opacity: [0.35, 1, 0.35]
          }}
          transition={{ repeat: Infinity, duration: 0.55, ease: "easeInOut" }}
        />
      ) : (
        <path d="M 32 72 Q 40 69 48 72" fill="none" stroke="#1cd8d2" strokeWidth="1.5" strokeLinecap="round" />
      )}

      {/* Shoulder Pods */}
      <rect x="14" y="63" width="5" height="10" rx="1.5" fill="#334155" />
      <rect x="61" y="63" width="5" height="10" rx="1.5" fill="#334155" />

      {/* Antenna Pole */}
      <rect x="38" y="10" width="4" height="15" fill="#475569" rx="1" />
      {/* Antenna glowing orb */}
      <motion.circle
        cx="40"
        cy="8"
        r="5"
        fill={state === "thinking" ? "#f59e0b" : "#1cd8d2"}
        filter={state === "thinking" ? "url(#neonGlowAmber)" : "url(#neonGlowCyan)"}
        animate={
          state === "thinking"
            ? { scale: [1, 1.4, 1], opacity: [0.65, 1, 0.65] }
            : state === "speaking"
            ? { scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }
            : { scale: [1, 1.1, 1], opacity: [0.55, 0.9, 0.55] }
        }
        transition={{
          repeat: Infinity,
          duration: state === "thinking" ? 0.35 : 1.6,
          ease: "easeInOut"
        }}
      />

      {/* Head outer shell */}
      <rect x="15" y="20" width="50" height="36" rx="15" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2" />

      {/* Visor Screen */}
      <rect x="20" y="25" width="40" height="26" rx="10" fill="url(#visorGrad)" stroke="url(#visorBorderGrad)" strokeWidth="1.8" />

      {/* Eyes */}
      {state === "welcoming" ? (
        <>
          {/* Arched happy eyes */}
          <path d="M 25 38 Q 30 31 34 37" fill="none" stroke="#1cd8d2" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlowCyan)" />
          <path d="M 46 37 Q 50 31 55 38" fill="none" stroke="#1cd8d2" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlowCyan)" />
        </>
      ) : state === "thinking" ? (
        <>
          {/* Alternating amber blinking eyes */}
          <motion.ellipse
            cx="29"
            cy="37"
            rx="4.5"
            ry="4.5"
            fill="#f59e0b"
            filter="url(#neonGlowAmber)"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 0.45, ease: "easeInOut", repeatDelay: 0.15 }}
          />
          <motion.ellipse
            cx="51"
            cy="37"
            rx="4.5"
            ry="4.5"
            fill="#f59e0b"
            filter="url(#neonGlowAmber)"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 0.45, ease: "easeInOut", repeatDelay: 0.3 }}
          />
        </>
      ) : state === "speaking" ? (
        <>
          {/* Dynamic talking cyan eyes */}
          <motion.ellipse
            cx="29"
            cy="37"
            rx="4.5"
            ry="4.5"
            fill="#1cd8d2"
            filter="url(#neonGlowCyan)"
            animate={{ scaleY: [1, 0.15, 1] }}
            transition={{ repeat: Infinity, duration: 0.65, ease: "easeInOut", repeatDelay: 0.05 }}
          />
          <motion.ellipse
            cx="51"
            cy="37"
            rx="4.5"
            ry="4.5"
            fill="#1cd8d2"
            filter="url(#neonGlowCyan)"
            animate={{ scaleY: [1, 0.15, 1] }}
            transition={{ repeat: Infinity, duration: 0.65, ease: "easeInOut", repeatDelay: 0.25 }}
          />
        </>
      ) : (
        <>
          {/* Idle soft cyan pulsing eyes */}
          <motion.ellipse
            cx="29"
            cy="37"
            rx="4.5"
            ry="4.5"
            fill="#1cd8d2"
            filter="url(#neonGlowCyan)"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="51"
            cy="37"
            rx="4.5"
            ry="4.5"
            fill="#1cd8d2"
            filter="url(#neonGlowCyan)"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Visor reflection highlight line */}
      <path d="M 23 28 C 30 26, 50 26, 57 28" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.2" strokeLinecap="round" />

      {/* Ear capsules on the sides of the head */}
      <rect x="11" y="30" width="4" height="16" rx="2" fill="#334155" />
      <rect x="65" y="30" width="4" height="16" rx="2" fill="#334155" />
    </svg>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi! I'm Aman AI 🤖\n\nAsk me about Aman's projects, skills, experience, education, or background.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState("");
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const suggestedQuestions = [
    "Tell me about Aman",
    "Show me Aman's projects",
    "What are Aman's main skills?",
    "Tell me about the AI Chat App",
    "Tell me about FASTAI",
  ];

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, errorMsg]);

  // Focus management on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard Escape listener to close chatbot
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const trimmedText = textToSend.trim();
    if (!trimmedText) return;

    if (trimmedText.length > 500) {
      setErrorMsg("Please keep questions under 500 characters.");
      return;
    }

    setErrorMsg("");
    setLastUserMessage(trimmedText);
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
      const aiReplyId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        { id: aiReplyId, sender: "ai", text: aiReply },
      ]);

      // Set speaking animation state for 3 seconds when reply arrives
      setSpeakingMessageId(aiReplyId);
      setTimeout(() => {
        setSpeakingMessageId((current) => (current === aiReplyId ? null : current));
      }, 3000);
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

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const handleRetry = () => {
    if (lastUserMessage) {
      setErrorMsg("");
      handleSendMessage(lastUserMessage);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: "Hi! I'm Aman AI 🤖\n\nAsk me about Aman's projects, skills, experience, education, or background.",
      },
    ]);
    setErrorMsg("");
    setLastUserMessage("");
    setSpeakingMessageId(null);
  };

  const handleScrollToProjects = () => {
    setIsOpen(false);
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Safe Inline Markdown & Link Parser
  const parseInlineMarkdown = (text) => {
    const parts = [];
    let lastIndex = 0;
    // Captures markdown link [text](url), bold **text**, inline code `code`, raw URLs
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|(https?:\/\/[^\s)]+)/g;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      if (match[1] && match[2]) {
        // Markdown links
        parts.push(
          <a
            key={matchIndex}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-cyan-400/40 hover:decoration-cyan-300 transition-colors cursor-pointer"
          >
            {match[1]}
          </a>
        );
      } else if (match[3]) {
        // Bold markdown
        parts.push(
          <strong key={matchIndex} className="font-extrabold text-white">
            {match[3]}
          </strong>
        );
      } else if (match[4]) {
        // Inline code blocks
        parts.push(
          <code key={matchIndex} className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-cyan-300 text-[13px] border border-white/5">
            {match[4]}
          </code>
        );
      } else if (match[5]) {
        // Raw links
        parts.push(
          <a
            key={matchIndex}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-cyan-400/40 hover:decoration-cyan-300 transition-colors cursor-pointer"
          >
            {match[5]}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Safe Multi-line & Code Block Renderer
  const renderMessageContent = (text) => {
    if (!text) return null;

    // Split by triple-backtick code blocks
    const blocks = text.split(/(```[a-zA-Z0-9]*\n[\s\S]*?\n```)/g);

    return blocks.map((block, idx) => {
      if (block.startsWith("```")) {
        const lines = block.split("\n");
        const header = lines[0];
        const lang = header.substring(3).trim();
        const codeLines = lines.slice(1, -1);
        const codeContent = codeLines.join("\n");

        return (
          <div key={idx} className="my-3 rounded-xl overflow-hidden border border-white/10 bg-black/40 font-mono text-[13px] text-gray-300 shadow-inner">
            <div className="bg-white/5 px-3 py-1.5 border-b border-white/10 flex justify-between items-center text-[10px] uppercase tracking-wider text-gray-400 font-semibold select-none">
              <span>{lang || "code"}</span>
              <span className="opacity-60">Source</span>
            </div>
            <pre className="p-3.5 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      } else {
        const lines = block.split("\n");
        return lines.map((line, lineIdx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={`${idx}-${lineIdx}`} className="h-2" />;
          }

          // Bullet List Parser
          if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            return (
              <ul key={`${idx}-${lineIdx}`} className="list-disc ml-5 my-1 text-sm leading-relaxed text-gray-200">
                <li className="pl-1">{parseInlineMarkdown(trimmed.substring(2))}</li>
              </ul>
            );
          }

          // Numbered List Parser
          const matchNum = trimmed.match(/^(\d+)\.\s(.*)/);
          if (matchNum) {
            return (
              <ol key={`${idx}-${lineIdx}`} className="list-decimal ml-5 my-1 text-sm leading-relaxed text-gray-200">
                <li className="pl-1">{parseInlineMarkdown(matchNum[2])}</li>
              </ol>
            );
          }

          return (
            <p key={`${idx}-${lineIdx}`} className="text-sm leading-relaxed text-gray-200 my-1.5">
              {parseInlineMarkdown(line)}
            </p>
          );
        });
      }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#1cd8d2]/10 to-[#00bf8f]/10 backdrop-blur-md border border-white/20 text-white shadow-[0_0_30px_rgba(28,216,210,0.2)] hover:shadow-[0_0_40px_rgba(28,216,210,0.45)] hover:border-white/30 transition-shadow duration-300 cursor-pointer"
          aria-label="Open Chat Assistant"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [-4, 4] }}
          whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
          whileTap={{ scale: 0.95 }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            scale: { type: "spring", stiffness: 260, damping: 20 }
          }}
        >
          <RobotAvatar size={48} state="idle" />
        </motion.button>
      )}

      {/* 4. Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{ perspective: 1000 }}
            className="fixed z-50 flex flex-col overflow-hidden bottom-6 right-6
                       w-[calc(100vw-32px)] sm:w-[400px] h-[580px] max-h-[calc(100vh-100px)]
                       bg-[#0c111d]/85 backdrop-blur-2xl border border-white/10 rounded-2xl
                       shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_30px_rgba(28,216,210,0.15)]
                       preserve-3d"
            initial={{ opacity: 0, scale: 0.85, y: 55, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 55, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
          >
            {/* 5. Header */}
            <div className="p-4 bg-gradient-to-r from-[#1cd8d2]/15 to-[#00bf8f]/15 border-b border-white/10 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <RobotAvatar size={34} state={isLoading ? "thinking" : "idle"} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00bf8f] border-2 border-[#0c111d] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-wide flex items-center gap-1.5">
                    Ask Aman AI
                  </h3>
                  <span className="text-[10px] text-gray-400 font-semibold tracking-wider flex items-center gap-1">
                    Online Assistant
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* 15. Clear Chat Button */}
                <button
                  onClick={handleClearChat}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                  title="Clear Chat History"
                  aria-label="Clear Chat History"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                  aria-label="Close Chat Window"
                >
                  <FiX className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/10">
              {/* 6. Welcome Card */}
              {messages.length === 1 && messages[0].id === "welcome" && (
                <div className="flex flex-col items-center text-center p-5 bg-white/5 border border-white/10 rounded-2xl shadow-lg mb-2 animate-in fade-in zoom-in-95 duration-350">
                  <div className="mb-3.5 bg-black/20 p-2 rounded-full border border-white/5 shadow-inner">
                    <RobotAvatar size={58} state="welcoming" />
                  </div>
                  <h4 className="font-bold text-base text-white">Hi! I&apos;m Aman AI 🤖</h4>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed max-w-[280px]">
                    Ask me about Aman&apos;s projects, skills, experience, education, or background.
                  </p>

                  {/* 16. Clickable Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-4.5 w-full">
                    <a
                      href="https://github.com/yadavaman05"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <FiGithub className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aman-yadav-a3811128a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <FiLinkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                    <a
                      href="/Resume.pdf"
                      download
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <FiFileText className="w-3.5 h-3.5" />
                      Resume
                    </a>
                    <button
                      type="button"
                      onClick={handleScrollToProjects}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold rounded-xl bg-gradient-to-r from-[#1cd8d2]/20 to-[#00bf8f]/20 hover:from-[#1cd8d2]/30 hover:to-[#00bf8f]/30 text-white border border-[#1cd8d2]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <FiExternalLink className="w-3.5 h-3.5" />
                      Projects
                    </button>
                  </div>
                </div>
              )}

              {/* Message List */}
              {messages.map((msg, index) => {
                // Don't show original welcome text if welcome card is rendering
                if (msg.id === "welcome") return null;

                const isUser = msg.sender === "user";
                const isSpeaking = speakingMessageId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {/* 9. AI Response Avatar */}
                    {!isUser && (
                      <div className="flex-shrink-0 mt-0.5 rounded-full bg-white/5 border border-white/10 p-0.5 shadow-md animate-in zoom-in-95 duration-200">
                        <RobotAvatar size={30} state={isSpeaking ? "speaking" : "idle"} />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-md animate-in fade-in duration-200 ${
                        isUser
                          ? "bg-gradient-to-br from-[#1cd8d2] to-[#00bf8f] text-white rounded-tr-none"
                          : "bg-white/10 text-gray-200 border border-white/5 rounded-tl-none"
                      }`}
                    >
                      {isUser ? msg.text : renderMessageContent(msg.text)}
                    </div>
                  </div>
                );
              })}

              {/* 10. Thinking State Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start animate-in fade-in duration-200">
                  <div className="flex-shrink-0 mt-0.5 rounded-full bg-white/5 border border-white/10 p-0.5 shadow-md">
                    <RobotAvatar size={30} state="thinking" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none px-4 py-2.5 text-sm shadow-md bg-white/10 border border-white/5 text-gray-400 flex items-center gap-2">
                    <span className="text-[13px] font-medium">Aman AI is thinking</span>
                    <span className="flex gap-1 items-center mt-1 select-none">
                      <span className="w-1.5 h-1.5 bg-[#00bf8f] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#00bf8f] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#00bf8f] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}

              {/* 11. Error handling */}
              {errorMsg && (
                <div className="flex flex-col gap-2 p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-center text-xs text-red-300 animate-in fade-in duration-200">
                  <p>{errorMsg}</p>
                  <button
                    onClick={handleRetry}
                    type="button"
                    className="flex items-center justify-center gap-1.5 self-center px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white border border-red-500/30 rounded-lg font-semibold transition-all cursor-pointer"
                  >
                    <FiRefreshCw className="w-3 h-3" />
                    Retry
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 7. Suggested Starter Prompts (Shows when chat has no custom messages yet) */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-3 border-t border-white/5 bg-black/30">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-2 select-none">
                  Quick Prompts:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto custom-scrollbar">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-xs bg-white/5 hover:bg-white/10 text-[#1cd8d2] hover:text-[#00bf8f] border border-white/10 rounded-lg px-3 py-1.5 transition-all cursor-pointer select-none"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 13. Fixed Chat Input Area */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-black/45 border-t border-white/10 flex items-center gap-2"
            >
              {/* 14. Input Textarea supporting Enter and Shift+Enter */}
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Ask me about Aman..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00bf8f] transition-all resize-none max-h-24 overflow-y-auto leading-relaxed custom-scrollbar placeholder-gray-500"
                disabled={isLoading}
                maxLength={500}
                aria-label="Ask a question about Aman"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(28,216,210,0.3)] active:scale-95 transition-all cursor-pointer"
                aria-label="Send message"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
