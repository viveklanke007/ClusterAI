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
      // 🔥 CALL OLLAMA API
      const res = await fetch("http://localhost:11434/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3", // change if you want other model
          prompt: promptNow,
          stream: false,
        }),
      });

      const data = await res.json();
      const aiResponse = data.response || "No response.";

      const aiMsg = { role: "assistant", text: aiResponse };
      setMessages((prev) => [...prev, aiMsg]);
      scrollBottom();

      // save to history
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
        {
          role: "assistant",
          text: "⚠️ Unable to reach AI engine.",
        },
      ]);
    }

    setLoading(false);
    scrollBottom();
  };

  return (
    <div className="flex">
      <Sidebar />

      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[200px] rounded-full top-10 left-20 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[200px] rounded-full bottom-10 right-10 animate-pulse"></div>
      </div>

      <div className="ml-64 p-6 w-full min-h-screen relative">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-5 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Chat Assistant 💬
        </motion.h1>

        {/* Chat Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            bg-gray-900/60 backdrop-blur-xl 
            p-4 rounded-2xl h-[65vh] 
            overflow-y-auto border border-gray-700 
            shadow-2xl"
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
                className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm shadow-lg ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white"
                    : "bg-gray-800 text-gray-200 border border-gray-700"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}

          {/* Typing Animation */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start my-3"
            >
              <div className="px-4 py-3 rounded-2xl bg-gray-700 text-gray-300 shadow-lg flex gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Input Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex mt-5"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything..."
            className="flex-grow bg-gray-800/80 text-white p-4 rounded-l-2xl border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          />
          <button
            onClick={send}
            className="
              bg-gradient-to-r from-cyan-400 to-purple-500
              hover:opacity-90 text-black font-bold px-8 
              rounded-r-2xl transition-all active:scale-95"
          >
            Send
          </button>
        </motion.div>
      </div>
    </div>
  );
}
