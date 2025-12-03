"use client";

import Sidebar from "../../../components/sider";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageTool() {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const gen = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}`;
    setUrl(imgUrl);

    await fetch("/api/history/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        type: "image",
        prompt,
        output: imgUrl,
      }),
    });

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      gen();
    }
  };

  const downloadImage = async () => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `ai-image-${Date.now()}.png`;
      link.click();
    } catch (err) {
      alert("Download failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-6rem)]">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-6 w-full md:ml-64 transition-all"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text text-center md:text-left">
          🎨 Image Generator
        </h1>

        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your image…"
          className="w-full bg-gray-900/70 border border-gray-700 text-white p-4 rounded-xl focus:ring-2 focus:ring-cyan-500 mb-4"
        />

        <button
          onClick={gen}
          disabled={loading}
          className={`w-full md:w-auto px-6 py-3 rounded-xl text-black font-semibold transition-all ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-400 hover:bg-cyan-300 active:scale-95"
          }`}
        >
          {loading ? "Generating…" : "Generate Image"}
        </button>

        {url && (
          <motion.div className="mt-6 flex flex-col items-center md:items-start">
            <img
              src={url}
              alt="Generated"
              className="rounded-xl shadow-xl border border-gray-700 max-w-full md:max-w-md"
            />

            <button
              onClick={downloadImage}
              className="mt-4 bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-lg text-white active:scale-95 w-full md:w-auto"
            >
              ⬇ Download Image
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
