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

  // ---------------------------------------------
  //  TEXT-TO-SPEECH TOGGLE BUTTON
  // ---------------------------------------------
  const toggleSpeak = () => {
    // If already speaking → STOP
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    // Start speaking
    if (!result) return;

    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = "en-US";

    setSpeaking(true);

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // ---------------------------------------------
  // ENTER TO SEND, SHIFT+ENTER NEW LINE
  // ---------------------------------------------
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="ml-64 p-6 w-full"
      >
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          🧠 Text Generator
        </h1>

        <textarea
          className="w-full bg-gray-900/70 border border-gray-700 text-white p-4 rounded-xl mb-4 resize-none focus:ring-2 focus:ring-pink-500"
          rows={5}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={generate}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-black font-semibold transition-all mr-4 ${
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
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all text-white active:scale-95"
          >
            {speaking ? "⏹ Stop" : "🔉 Speak"}
          </button>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-gray-800/60 p-6 rounded-xl border border-gray-700 shadow-lg"
          >
            <pre className="whitespace-pre-wrap text-gray-200">{result}</pre>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
