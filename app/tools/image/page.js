"use client";

import Sidebar from "../../../components/sider";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageTool() {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");

  const [generating, setGenerating] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  const gen = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    setImageReady(false);
    setImageLoading(true);

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

    setGenerating(false);
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
    } catch {
      alert("Download failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-6rem)]">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-6 w-full md:ml-64"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
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
          disabled={generating}
          className={`px-6 py-3 rounded-xl text-black font-semibold transition-all ${
            generating
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-400 hover:bg-cyan-300 active:scale-95"
          }`}
        >
          {generating ? "Generating…" : "Generate Image"}
        </button>

        {/* IMAGE AREA */}
        {url && (
          <motion.div className="mt-8 flex flex-col items-center md:items-start">
            {/* IMAGE LOADING STATE */}
            {imageLoading && (
              <div className="w-full md:w-[400px] h-[300px] rounded-xl border border-gray-700 bg-gray-900/60 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Generating image…</p>
                </div>
              </div>
            )}

            {/* IMAGE */}
            <img
              src={url}
              alt="Generated"
              onLoad={() => {
                setImageLoading(false);
                setImageReady(true);
              }}
              onError={() => {
                setImageLoading(false);
                alert("Image failed to load. Try again.");
              }}
              className={`rounded-xl shadow-xl border border-gray-700 max-w-full md:max-w-md transition-opacity duration-300 ${
                imageReady ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* DOWNLOAD BUTTON (ONLY AFTER IMAGE LOADS) */}
            {imageReady && (
              <button
                onClick={downloadImage}
                className="mt-4 bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-lg text-white active:scale-95"
              >
                ⬇ Download Image
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
