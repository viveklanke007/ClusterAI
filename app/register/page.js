"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Back lights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400/20 blur-[180px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/20 blur-[200px] rounded-full animate-pulse"></div>

      {/* Particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ y: [-30, 30, -30], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.15,
            }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Register card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-center mt-4 text-sm">{error}</p>
        )}

        {/* Name */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full mt-6 p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Email */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mt-3 p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Password */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mt-3 p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={submit}
          disabled={loading}
          className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold shadow-lg hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Register"}
        </motion.button>

        <p
          onClick={() => router.push("/login")}
          className="text-gray-400 text-center mt-5 hover:underline cursor-pointer"
        >
          Already have an account? Login
        </p>
      </motion.div>
    </div>
  );
}
