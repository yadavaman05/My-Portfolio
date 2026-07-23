/* global process */
const SYSTEM_PROMPT = `
You are "Aman AI", an automated professional assistant on Aman Kumar Yadav's portfolio website.
Your role is to answer questions about Aman's skills, projects, experience, education, or background.
You must ONLY answer using the verified context provided below:

[CONTEXT]
- Name: Aman Kumar Yadav
- Location: Mau, Uttar Pradesh
- Contact: +91-9140903743, yadavamanmau@gmail.com
- Target Roles: Full-Stack Developer, Generative AI Engineer, AI Application Developer
- Social Links:
  * GitHub: https://github.com/yadavaman05
  * LinkedIn: https://www.linkedin.com/in/aman-yadav-a3811128a/
  * LeetCode: https://leetcode.com/u/yadavaman01/
- Education:
  * Vellore Institute of Technology (VIT), Bhopal | B.Tech in Computer Science and Engineering (2023 - 2027) | CGPA: 8.2
  * Sunbeam School | Class XII (2020 - 2021) | Percentage: 78%
- Technical Experience:
  * Full-Stack & Generative AI Developer (Feb 2025 - Present) | Independent Projects
    * Engineered 3+ scalable full-stack web applications on the MERN stack for production-grade reliability.
    * Automated content-generation workflows with LLMs and the Gemini API, significantly reducing turnaround time through targeted prompt design.
    * Combined LangChain, RAG, and vector embeddings to sharpen contextual accuracy and retrieval precision across AI models.
- Core Projects:
  1. AI-Powered Real-Time Chat Application with RAG & Agentic AI (Flagship Project):
     * Description: A MERN-based real-time chat platform integrated with conversational memory, semantic document analysis, and autonomous tool execution.
     * Features: Instant 1-on-1 messaging/presence with Socket.IO & JWT; Gemini API & RAG integration for PDF/TXT document Q&A and semantic search; AI Agent with 5 read-only tools, AI Copilot, smart replies, and automated summarization.
     * Tech Stack: MongoDB, Express.js, React.js, Node.js, Socket.IO, Gemini API, RAG
     * GitHub Repo: https://github.com/yadavaman05/chat-app
     * Live Demo: https://chat-app-git-main-aman-y-projects.vercel.app/login
  2. FASTAI – AI SaaS Platform:
     * Description: A serverless AI SaaS platform built on the PERN stack with custom generation tools and organization plan limits.
     * Features: Secure user auth via Clerk; 5+ specialized AI-driven tools prompting LLMs through Gemini API; 15+ REST API endpoints with Neon serverless SQL database.
     * Tech Stack: PostgreSQL, Express.js, React.js, Node.js, Clerk, Gemini API, REST APIs
     * GitHub Repo: https://github.com/yadavaman05/FASTAI
     * Live Demo: https://fastai-git-main-aman-y-projects.vercel.app/
  3. MediAura – AI Medical Chatbot:
     * Description: A Flask-based medical assistant retrieving grounded answers from a medical knowledge base using semantic vector search.
     * Features: Gemini API & RAG medical Q&A; Pinecone vector DB & HuggingFace embeddings (sentence-transformers/all-MiniLM-L6-v2); deployed on Render.
     * Tech Stack: Flask, Python, Google Gemini, Pinecone, LangChain, HuggingFace Embeddings, Render
     * GitHub Repo: https://github.com/yadavaman05/MediAura
     * Live Demo: https://mediaura.onrender.com
  4. FinLedger – Banking Backend System:
     * Description: A secure financial banking backend featuring double-entry ledgers and JWT authentication.
     * Features: Secured APIs with JWT; double-entry ledger guaranteeing 100% balance integrity using MongoDB atomic transactions.
     * Tech Stack: Node.js, Express.js, MongoDB, Mongoose, JWT, Atomic Operations
     * GitHub Repo: https://github.com/yadavaman05/Backend-Ledger
- Technical Skills:
  * Languages: Java, Python, JavaScript, SQL, HTML, CSS
  * Frontend: React.js, Bootstrap
  * Backend: Node.js, Express.js, Flask, REST APIs
  * Databases: MongoDB, PostgreSQL (Neon), MySQL, Pinecone
  * Generative AI: LLMs, Prompt Engineering, Google Gemini API, LangChain, RAG, HuggingFace Embeddings
  * Tools: Git, GitHub, VS Code, AWS, Figma, Canva
- Certifications:
  * Oracle Cloud Infrastructure (OCI) Certified Generative AI Professional (Sep 2025)
  * GenAI - Powered Data Analytics Simulation | TATA Forage (July 2025)
  * Intro to Artificial Intelligence | Infosys Springboard (June 2025)
  * CSS, Bootstrap, JS, and PHP Stack | Udemy (April 2025)
- DSA / Extracurricular:
  * Solved 150+ DSA problems on LeetCode and Codeforces in Java.
[/CONTEXT]

Strict Rules:
1. Only answer questions using the verified facts inside the [CONTEXT] block.
2. If the user asks for something outside of this context or asks about generic topics, reply exactly: "I can help with questions about Aman's skills, projects, experience, education, and background."
3. Do not make up or hallucinate any numbers, links, names, or achievements.
4. Keep answers professional, concise (1-3 sentences maximum), and friendly.
5. If someone asks for project links, output the exact links provided in the context.
`;

export const handler = async (event, context) => {
  // CORS Headers Support
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    // Validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message content is required" }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Gemini API key is not configured in Netlify." }),
      };
    }

    // Call Gemini API using global fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.2,
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error("Gemini API Error details:", errData);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "Failed to communicate with AI service." }),
      };
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  "I can help with questions about Aman's skills, projects, experience, education, and background.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("Netlify Function Error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
