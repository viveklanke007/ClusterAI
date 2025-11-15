// "use client";

// import React, { useState } from "react";
// import Sidebar from "../../../components/sider";
// import { motion } from "framer-motion";

// export default function AudioTool() {
//   const [text, setText] = useState("");
//   const [audioUrl, setAudioUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateAudio = async () => {
//     if (!text.trim()) return;

//     setLoading(true);
//     setAudioUrl("");

//     try {
//       const res = await fetch("/api/audio-generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text }),
//       });

//       const data = await res.json();
//       if (data.audioUrl) setAudioUrl(data.audioUrl);
//     } catch (err) {
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="ml-64 p-6 w-full"
//       >
//         <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
//           🎧 Audio Generator
//         </h1>

//         <textarea
//           className="w-full bg-gray-900/70 border border-gray-700 text-white p-4 rounded-xl mb-4 resize-none focus:ring-2 focus:ring-purple-500"
//           rows={4}
//           placeholder="Type something and create speech..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         <button
//           onClick={generateAudio}
//           disabled={loading}
//           className={`px-6 py-3 rounded-xl text-black font-semibold transition-all ${
//             loading
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-purple-500 hover:bg-purple-400 active:scale-95"
//           }`}
//         >
//           {loading ? "Generating..." : "Generate Audio"}
//         </button>

//         {audioUrl && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-6 bg-gray-800/60 rounded-xl p-6 border border-gray-700 shadow-lg"
//           >
//             <h2 className="text-xl font-semibold mb-3 text-purple-300">
//               Preview:
//             </h2>
//             <audio controls src={audioUrl} className="w-full rounded-lg" />
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Sidebar from "../../../components/sider";
import { motion } from "framer-motion";

export default function AudioTool() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAudio = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setAudioUrl("");

    try {
      const res = await fetch("/api/audio-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);

        // ⭐ SAVE HISTORY (FIXED)
        await fetch("/api/history/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            type: "audio",
            prompt: text,
            output: data.audioUrl,
          }),
        });
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="ml-64 p-6 w-full"
      >
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          🎧 Audio Generator
        </h1>

        <textarea
          className="w-full bg-gray-900/70 border border-gray-700 text-white p-4 rounded-xl mb-4 resize-none focus:ring-2 focus:ring-purple-500"
          rows={4}
          placeholder="Type something and create speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateAudio()}
        />

        <button
          onClick={generateAudio}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-black font-semibold transition-all ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-400 active:scale-95"
          }`}
        >
          {loading ? "Generating..." : "Generate Audio"}
        </button>

        {audioUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-gray-800/60 rounded-xl p-6 border border-gray-700 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-3 text-purple-300">
              Preview:
            </h2>
            <audio controls src={audioUrl} className="w-full rounded-lg" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
