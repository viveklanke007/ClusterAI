"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      router.push("/assistant");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/20 blur-[180px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 blur-[200px] rounded-full animate-pulse"></div>

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.2,
            }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text"
        >
          Welcome Back
        </motion.h2>

        {error && (
          <p className="text-red-400 text-center mt-4 text-sm">{error}</p>
        )}

        {/* Email */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mt-6 p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        {/* Password */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mt-3 p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        {/* Login Button */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={submit}
          disabled={loading}
          className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold shadow-lg hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p
          onClick={() => router.push("/register")}
          className="text-gray-400 text-center mt-5 hover:underline cursor-pointer"
        >
          Don’t have an account? Register
        </p>
      </motion.div>
    </div>
  );
}
