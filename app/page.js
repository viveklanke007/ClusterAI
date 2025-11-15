"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Zap, Image as ImgIcon, Type, Mic, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-24 px-6 text-center relative">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full absolute -top-20 -left-20 animate-pulse"></div>
        <div className="w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full absolute top-40 right-0 animate-pulse"></div>
      </div>

      {/* Top Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/40 border border-gray-700 text-cyan-300 text-sm mb-6"
      >
        <Sparkles className="text-cyan-300" size={18} />
        <span>Next-Gen AI Creation Suite</span>
      </motion.div>

      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 text-transparent bg-clip-text drop-shadow-xl"
      >
        Create Anything with AI
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
      >
        A fully loaded AI studio where you can generate text, images, audio, and
        more — lightning fast, beautifully designed, and incredibly easy to use.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="flex justify-center gap-6"
      >
        <Link
          href="/tools/text"
          className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black px-10 py-4 rounded-xl text-lg font-extrabold shadow-lg hover:scale-[1.05] active:scale-95 transition-all"
        >
          Start Creating
        </Link>

        <Link
          href="/register"
          className="bg-white/5 backdrop-blur-xl border border-gray-700 px-10 py-4 rounded-xl text-lg hover:bg-white/10 transition-all"
        >
          Join Free
        </Link>
      </motion.div>

      {/* 3D / Visual Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-20 flex justify-center"
      >
        <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-gray-700 bg-gray-900/40 backdrop-blur-xl p-6 shadow-2xl">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-gray-300 text-lg"
          >
            “Your imagination is now the only limit.”
          </motion.div>

          <div className="absolute -top-6 -right-6 bg-gradient-to-tr from-purple-500 to-cyan-400 w-28 h-28 blur-2xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-cyan-500 to-purple-400 w-32 h-32 blur-2xl opacity-20"></div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <FeatureCard
          icon={<Type size={28} className="text-purple-300" />}
          title="Text Engine"
          desc="Write stories, essays, answers — instantly."
        />
        <FeatureCard
          icon={<ImgIcon size={28} className="text-cyan-300" />}
          title="Image Creator"
          desc="Generate beautiful AI visuals."
        />
        <FeatureCard
          icon={<Mic size={28} className="text-teal-300" />}
          title="Voice Studio"
          desc="Convert text into realistic audio."
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, translateY: -5 }}
      className="p-6 bg-gray-800/60 border border-gray-700 rounded-2xl shadow-xl backdrop-blur-xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-cyan-300">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </motion.div>
  );
}
