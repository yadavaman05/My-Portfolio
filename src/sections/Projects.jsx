import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";



function ProjectImage({ src, title }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-2 text-md font-bold">
          ✦
        </div>
        <span className="text-sm font-semibold text-gray-300">{title}</span>
        <span className="text-[11px] text-gray-500 mt-2 font-mono leading-relaxed">
          Screenshot Placeholder<br/>
          (Place image in {src})
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      loading="lazy"
    />
  );
}

export default function Projects() {
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "AI Chat Application with RAG & Agentic AI",
        description: "A flagship MERN-based real-time chat platform integrated with conversational memory, semantic document analysis, and autonomous tool execution.",
        features: [
          "Instant 1-on-1 messaging & presence using Socket.IO and JWT authentication.",
          "Gemini API & RAG integration for PDF/TXT document Q&A and history-wide semantic search.",
          "AI Agent with 5 read-only tools, AI Copilot, smart replies, and automated chat summarization."
        ],
        tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.IO", "Gemini API", "RAG"],
        link: "https://github.com/yadavaman05/chat-app",
        demo: "https://chat-app-red-tau.vercel.app/",
        bgColor: "#0f0f15",
        image: "/src/assets/projects/ai-chat-app.png",
      },
      {
        title: "FASTAI – AI SaaS Platform",
        description: "A serverless AI SaaS platform built on the PERN stack with custom generation tools and organization plan limits.",
        features: [
          "Secure user authentication and metadata management handled via Clerk.",
          "5+ specialized AI-driven tools prompting LLMs through the Gemini API wrapper.",
          "15+ REST API endpoints with Neon serverless SQL database configurations."
        ],
        tech: ["PostgreSQL", "Express.js", "React.js", "Node.js", "Clerk", "Gemini API", "REST APIs"],
        link: "https://github.com/yadavaman05/FASTAI",
        demo: "https://fastai-git-main-aman-y-projects.vercel.app/",
        bgColor: "#0c3b2e",
        image: "/src/assets/projects/fastai.png",
      },
      {
        title: "MediAura – AI Medical Chatbot",
        description: "A Flask-based medical virtual assistant retrieving grounded answers from a medical knowledge base using semantic vector search.",
        features: [
          "Gemini API & RAG-driven medical queries grounded in a clinical database.",
          "Semantic search using a Pinecone vector database and HuggingFace embeddings.",
          "Shipped to production on Render via Gunicorn web server."
        ],
        tech: ["Flask", "Python", "Google Gemini", "Pinecone", "LangChain", "HuggingFace Embeddings", "Render"],
        link: "https://github.com/yadavaman05/MediAura",
        demo: "https://mediaura.onrender.com",
        bgColor: "#0b2545",
        image: "/src/assets/projects/mediaura.png",
      },
      {
        title: "FinLedger – Banking Backend System",
        description: "A secure financial banking backend featuring double-entry ledgers and JWT authentication.",
        features: [
          "Secured banking APIs with JWT-based authentication and automated validations.",
          "Double-entry ledger guaranteeing 100% balance integrity using MongoDB atomic transactions."
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Atomic Operations"],
        link: "https://github.com/yadavaman05/Backend-Ledger",
        demo: "",
        bgColor: "#131326",
        image: "/src/assets/projects/finledger.png",
      },
    ],
    []
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl sm:text-5xl font-bold z-10 text-center mt-6">
          Featured Projects
        </h2>

        <div className="relative w-full flex-1 flex items-center justify-center px-4">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 scale-100 z-20"
                  : "opacity-0 scale-95 z-0 pointer-events-none"
              }`}
              style={{ width: "95%", maxWidth: "1100px" }}
            >
              <div
                className={`relative w-full overflow-hidden bg-black/40 backdrop-blur-md shadow-2xl border border-white/10 rounded-2xl flex flex-col md:flex-row h-[72vh] md:h-[65vh]`}
                style={{
                  zIndex: 10,
                }}
              >
                {/* Left side: Image */}
                <div className="w-full md:w-1/2 h-[22vh] md:h-full relative overflow-hidden bg-black/40 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center">
                  <ProjectImage
                    src={project.image}
                    title={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Right side: Content */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    {/* Project Title */}
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    
                    {/* Short Description */}
                    <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-4">
                      <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#00bf8f] mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-1.5 text-xs md:text-sm text-gray-300">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-[#1cd8d2] mr-2">✦</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#00bf8f] mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((techItem, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/10"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 font-semibold text-sm rounded-lg bg-white text-black hover:bg-gray-200 transition-all shadow-md flex items-center gap-1.5"
                      aria-label={`View GitHub for ${project.title}`}
                    >
                      GitHub Repo
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 font-semibold text-sm rounded-lg bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] text-white hover:opacity-90 transition-all shadow-md flex items-center gap-1.5"
                        aria-label={`View Live Demo for ${project.title}`}
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
