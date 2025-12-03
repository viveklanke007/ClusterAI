"use client";

import Sidebar from "../../../components/sider";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TextTool() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    const res = await fetch(
      `https://text.pollinations.ai/${encodeURIComponent(prompt)}`
    );
    const text = await res.text();
    setResult(text);

    await fetch("/api/history/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        type: "text",
        prompt,
        output: text,
      }),
    });

    setLoading(false);
  };

  const toggleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = "en-US";
    setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-6rem)]">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-6 w-full md:ml-64 transition-all"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-center md:text-left">
          🧠 Text Generator
        </h1>

        <textarea
          className="w-full bg-gray-900/70 border border-gray-700 text-white p-4 rounded-xl mb-4 focus:ring-2 focus:ring-pink-500 text-base"
          rows={5}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={generate}
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-black font-semibold transition-all ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-400 active:scale-95"
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {result && (
            <button
              onClick={toggleSpeak}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white"
            >
              {speaking ? "⏹ Stop" : "🔉 Speak"}
            </button>
          )}
        </div>

        {result && (
          <motion.div className="mt-6 bg-gray-800/60 p-6 rounded-xl border border-gray-700">
            <pre className="whitespace-pre-wrap text-gray-200 text-sm md:text-base font-sans">
              {result}
            </pre>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
