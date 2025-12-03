"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/sider";
import { motion } from "framer-motion";

export default function Assistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const scrollBottom = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 80);
  };

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    scrollBottom();

    const promptNow = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptNow }),
      });

      const data = await res.json();
      const aiResponse = data.response;

      const aiMsg = { role: "assistant", text: aiResponse };
      setMessages((prev) => [...prev, aiMsg]);
      scrollBottom();

      await fetch("/api/history/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          type: "assistant",
          prompt: promptNow,
          output: aiResponse,
        }),
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Gemini API not reachable." },
      ]);
    }

    setLoading(false);
    scrollBottom();
  };

  return (
    // RESPONSIVE LAYOUT WRAPPER
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-6rem)]">
      {/* SIDEBAR - Only visible on Desktop via CSS inside Sidebar component */}
      <Sidebar />

      {/* BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/20 blur-[100px] md:blur-[200px] rounded-full top-10 left-20 animate-pulse"></div>
        <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-500/20 blur-[100px] md:blur-[200px] rounded-full bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* MAIN CONTENT AREA */}
      {/* Added md:ml-64 to push content when sidebar is visible on desktop */}
      <div className="w-full md:ml-64 p-4 md:p-6 transition-all flex flex-col">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold mb-5 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-center md:text-left"
        >
          Chat Assistant 💬
        </motion.h1>

        {/* Chat Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900/60 p-4 rounded-2xl h-[60vh] md:h-[65vh] overflow-y-auto border border-gray-700 shadow-2xl mb-4"
          ref={chatRef}
        >
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`my-3 flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[85%] md:max-w-[75%] text-sm shadow-lg ${
                  m.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex my-3"
            >
              <div className="px-4 py-3 bg-gray-700 text-gray-300 rounded-2xl flex gap-2">
                <span className="w-2 h-2 rounded-full animate-bounce bg-gray-400"></span>
                <span className="w-2 h-2 rounded-full animate-bounce delay-150 bg-gray-400"></span>
                <span className="w-2 h-2 rounded-full animate-bounce delay-300 bg-gray-400"></span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask something..."
            className="flex-grow bg-gray-800 text-white p-4 rounded-xl border border-gray-700 w-full"
          />

          <button
            onClick={send}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold px-6 md:px-8 rounded-xl shrink-0"
          >
            Send
          </button>
        </motion.div>
      </div>
    </div>
  );
}
