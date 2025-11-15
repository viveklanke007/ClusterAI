// // "use client";

// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useState, useRef } from "react";

// // export default function Header() {
// //   const router = useRouter();

// //   const [user, setUser] = useState(null);
// //   const [open, setOpen] = useState(false);
// //   const [showHistory, setShowHistory] = useState(false);
// //   const [history, setHistory] = useState([]);
// //   const [query, setQuery] = useState("");

// //   const menuRef = useRef(null);

// //   // ----------------------------
// //   // LOAD USER
// //   // ----------------------------
// //   useEffect(() => {
// //     async function loadUser() {
// //       const token = localStorage.getItem("token");
// //       if (!token) return;

// //       const res = await fetch("/api/auth/me", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ token }),
// //       });

// //       const data = await res.json();
// //       if (data.user) setUser(data.user);
// //     }
// //     loadUser();
// //   }, []);

// //   // ----------------------------
// //   // CLICK OUTSIDE TO CLOSE
// //   // ----------------------------
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setOpen(false);
// //         setShowHistory(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // ----------------------------
// //   // LOAD HISTORY
// //   // ----------------------------
// //   const loadHistory = async () => {
// //     const token = localStorage.getItem("token");
// //     const res = await fetch("/api/history/get", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ token }),
// //     });

// //     const data = await res.json();
// //     setHistory(data.history || []);
// //   };

// //   // ----------------------------
// //   // CLEAR HISTORY
// //   // ----------------------------
// //   const clearHistory = async () => {
// //     const token = localStorage.getItem("token");

// //     await fetch("/api/history/clear", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ token }),
// //     });

// //     setHistory([]);
// //   };

// //   // ----------------------------
// //   // LOGOUT
// //   // ----------------------------
// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     router.push("/login");
// //   };

// //   const filteredHistory = history.filter((h) =>
// //     h.prompt.toLowerCase().includes(query.toLowerCase())
// //   );

// //   return (
// //     <header className="w-full py-4 px-6 bg-gray-900 text-white flex justify-between items-center relative border-b border-gray-700">
// //       <h1 className="text-2xl font-bold">
// //         ClusterAI<span className="text-cyan-400">.</span>
// //       </h1>

// //       <nav className="flex items-center gap-4">
// //         <Link href="/">Home</Link>
// //         <Link href="/assistant">Assistant</Link>

// //         {user ? (
// //           <div className="relative" ref={menuRef}>
// //             {/* Avatar */}
// //             <button
// //               onClick={() => setOpen(!open)}
// //               className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-lg font-bold"
// //             >
// //               {user.name.charAt(0).toUpperCase()}
// //             </button>

// //             {/* Dropdown Menu */}
// //             {open && !showHistory && (
// //               <div className="absolute right-0 mt-3 w-64 bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-xl z-50">
// //                 <p className="font-semibold">{user.name}</p>
// //                 <p className="text-sm text-gray-400">{user.email}</p>

// //                 <button
// //                   onClick={() => {
// //                     loadHistory();
// //                     setShowHistory(true);
// //                   }}
// //                   className="w-full text-left px-3 py-2 mt-3 hover:bg-gray-700 rounded"
// //                 >
// //                   📜 View History
// //                 </button>

// //                 <button
// //                   onClick={logout}
// //                   className="w-full text-left px-3 py-2 mt-3 bg-red-600 hover:bg-red-700 rounded"
// //                 >
// //                   🚪 Logout
// //                 </button>
// //               </div>
// //             )}

// //             {/* HISTORY PANEL */}
// //             {showHistory && (
// //               <div className="absolute right-0 mt-3 w-96 h-[400px] bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-xl z-50 overflow-y-auto">
// //                 <h2 className="font-bold text-lg mb-3">📜 Your History</h2>

// //                 <input
// //                   type="text"
// //                   placeholder="Search history..."
// //                   value={query}
// //                   onChange={(e) => setQuery(e.target.value)}
// //                   className="w-full bg-gray-700 p-2 rounded mb-3"
// //                 />

// //                 <button
// //                   onClick={clearHistory}
// //                   className="bg-red-600 px-3 py-1 rounded mb-3"
// //                 >
// //                   🗑 Clear All
// //                 </button>

// //                 <button
// //                   onClick={() => setShowHistory(false)}
// //                   className="bg-gray-600 px-3 py-1 rounded mb-3 ml-2"
// //                 >
// //                   ❌ Close
// //                 </button>

// //                 {filteredHistory.length === 0 ? (
// //                   <p className="text-gray-400 text-center mt-10">
// //                     No history found.
// //                   </p>
// //                 ) : (
// //                   <div className="space-y-3">
// //                     {filteredHistory.map((item) => (
// //                       <div
// //                         key={item._id}
// //                         className="border border-gray-700 p-3 rounded bg-gray-900"
// //                       >
// //                         <p className="text-sm text-gray-400">
// //                           {item.type.toUpperCase()}
// //                         </p>
// //                         <p className="font-semibold">{item.prompt}</p>

// //                         {item.type === "image" && (
// //                           <img
// //                             src={item.output}
// //                             className="mt-2 w-32 rounded"
// //                           />
// //                         )}

// //                         {item.type === "video" && (
// //                           <video
// //                             src={item.output}
// //                             controls
// //                             className="mt-2 w-full rounded"
// //                           />
// //                         )}

// //                         {item.type === "audio" && (
// //                           <audio
// //                             src={item.output}
// //                             controls
// //                             className="mt-2 w-full"
// //                           />
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           <>
// //             <Link href="/login">Login</Link>
// //             <Link href="/register">Register</Link>
// //           </>
// //         )}
// //       </nav>
// //     </header>
// //   );
// // }

// // "use client";

// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useState, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // export default function Header() {
// //   const router = useRouter();

// //   const [user, setUser] = useState(null);
// //   const [openMenu, setOpenMenu] = useState(false);
// //   const [openHistory, setOpenHistory] = useState(false);
// //   const [history, setHistory] = useState([]);
// //   const [query, setQuery] = useState("");

// //   const menuRef = useRef(null);

// //   // ---------------------------------------
// //   // REAL-TIME USER STATE LISTENER
// //   // ---------------------------------------
// //   useEffect(() => {
// //     function updateUser() {
// //       const token = localStorage.getItem("token");
// //       if (!token) return setUser(null);

// //       fetch("/api/auth/me", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ token }),
// //       })
// //         .then((r) => r.json())
// //         .then((data) => setUser(data.user || null));
// //     }

// //     updateUser();
// //     window.addEventListener("auth-change", updateUser);

// //     return () => window.removeEventListener("auth-change", updateUser);
// //   }, []);

// //   // ---------------------------------------
// //   // CLICK OUTSIDE TO CLOSE PANELS
// //   // ---------------------------------------
// //   useEffect(() => {
// //     const listener = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setOpenMenu(false);
// //         setOpenHistory(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", listener);
// //     return () => document.removeEventListener("mousedown", listener);
// //   }, []);

// //   // ---------------------------------------
// //   // LOAD HISTORY
// //   // ---------------------------------------
// //   const loadHistory = async () => {
// //     const token = localStorage.getItem("token");
// //     const res = await fetch("/api/history/get", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ token }),
// //     });

// //     const data = await res.json();
// //     setHistory(data.history || []);
// //   };

// //   // ---------------------------------------
// //   // CLEAR HISTORY
// //   // ---------------------------------------
// //   const clearHistory = async () => {
// //     const token = localStorage.getItem("token");

// //     await fetch("/api/history/clear", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ token }),
// //     });

// //     setHistory([]);
// //   };

// //   // ---------------------------------------
// //   // LOGOUT
// //   // ---------------------------------------
// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");

// //     window.dispatchEvent(new Event("auth-change"));
// //     router.push("/login");
// //   };

// //   const filteredHistory = history.filter((h) =>
// //     h.prompt.toLowerCase().includes(query.toLowerCase())
// //   );

// //   return (
// //     <header className="fixed top-0 left-0 w-full py-4 px-6 bg-gray-900/80 backdrop-blur-lg text-white flex justify-between items-center border-b border-gray-700 z-50">
// //       <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
// //         ClusterAI<span className="text-cyan-400">.</span>
// //       </h1>

// //       <nav className="flex items-center gap-6">
// //         <Link href="/" className="hover:text-cyan-400 transition">
// //           Home
// //         </Link>

// //         <Link href="/assistant" className="hover:text-cyan-400 transition">
// //           Assistant
// //         </Link>

// //         {/* ---------------------------- */}
// //         {/* LOGGED-IN USER UI */}
// //         {/* ---------------------------- */}

// //         {user ? (
// //           <div className="relative" ref={menuRef}>
// //             <button
// //               onClick={() => {
// //                 setOpenMenu(!openMenu);
// //                 setOpenHistory(false);
// //               }}
// //               className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold shadow-md hover:scale-105 transition"
// //             >
// //               {user.name.charAt(0).toUpperCase()}
// //             </button>

// //             {/* --- DROPDOWN MENU --- */}
// //             <AnimatePresence>
// //               {openMenu && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
// //                   animate={{ opacity: 1, y: 0, scale: 1 }}
// //                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
// //                   className="absolute right-0 mt-3 w-72 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl z-50"
// //                 >
// //                   <p className="font-semibold text-lg">{user.name}</p>
// //                   <p className="text-sm text-gray-400">{user.email}</p>

// //                   <button
// //                     onClick={() => {
// //                       loadHistory();
// //                       setOpenHistory(true);
// //                       setOpenMenu(false);
// //                     }}
// //                     className="w-full text-left py-2 mt-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition px-3"
// //                   >
// //                     📜 View History
// //                   </button>

// //                   <button
// //                     onClick={logout}
// //                     className="w-full text-left py-2 mt-3 rounded-lg bg-red-600 hover:bg-red-700 transition px-3"
// //                   >
// //                     🚪 Logout
// //                   </button>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>

// //             {/* --- HISTORY PANEL --- */}
// //             <AnimatePresence>
// //               {openHistory && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 10, scale: 0.98 }}
// //                   animate={{ opacity: 1, y: 0, scale: 1 }}
// //                   exit={{ opacity: 0, y: 10, scale: 0.98 }}
// //                   className="absolute right-0 mt-3 w-[420px] h-[450px] bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-2xl z-50 overflow-y-auto"
// //                 >
// //                   <div className="flex justify-between items-center mb-4">
// //                     <h2 className="font-bold text-xl">📜 Your History</h2>
// //                     <button
// //                       onClick={() => setOpenHistory(false)}
// //                       className="text-gray-400 hover:text-red-400"
// //                     >
// //                       ✕
// //                     </button>
// //                   </div>

// //                   <input
// //                     type="text"
// //                     placeholder="Search history..."
// //                     value={query}
// //                     onChange={(e) => setQuery(e.target.value)}
// //                     className="w-full bg-gray-800 p-3 rounded mb-3 border border-gray-700"
// //                   />

// //                   <div className="flex gap-2 mb-4">
// //                     <button
// //                       onClick={clearHistory}
// //                       className="bg-red-600 px-3 py-2 rounded hover:bg-red-700"
// //                     >
// //                       🗑 Clear
// //                     </button>
// //                   </div>

// //                   {filteredHistory.length === 0 ? (
// //                     <p className="text-gray-500 text-center mt-10">
// //                       No history found.
// //                     </p>
// //                   ) : (
// //                     <div className="space-y-4">
// //                       {filteredHistory.map((item) => (
// //                         <div
// //                           key={item._id}
// //                           className="p-4 rounded-xl bg-gray-800 border border-gray-700"
// //                         >
// //                           <p className="text-sm text-gray-400">
// //                             {item.type.toUpperCase()}
// //                           </p>

// //                           <p className="font-semibold">{item.prompt}</p>

// //                           {item.type === "image" && (
// //                             <img
// //                               src={item.output}
// //                               className="mt-3 w-32 rounded-lg border border-gray-700"
// //                             />
// //                           )}

// //                           {item.type === "video" && (
// //                             <video
// //                               src={item.output}
// //                               controls
// //                               className="mt-3 w-full rounded-lg border border-gray-700"
// //                             />
// //                           )}

// //                           {item.type === "audio" && (
// //                             <audio
// //                               src={item.output}
// //                               controls
// //                               className="mt-3 w-full"
// //                             />
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>
// //         ) : (
// //           // ----------------------------
// //           // PUBLIC BUTTONS
// //           // ----------------------------
// //           <>
// //             <Link href="/login" className="hover:text-cyan-400 transition">
// //               Login
// //             </Link>
// //             <Link href="/register" className="hover:text-cyan-400 transition">
// //               Register
// //             </Link>
// //           </>
// //         )}
// //       </nav>
// //     </header>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Header() {
//   const router = useRouter();

//   const [user, setUser] = useState(null);
//   const [openMenu, setOpenMenu] = useState(false);
//   const [openHistory, setOpenHistory] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [query, setQuery] = useState("");

//   const menuRef = useRef(null);

//   // ---------------------------------------
//   // REAL-TIME USER STATE LISTENER
//   // ---------------------------------------
//   useEffect(() => {
//     function updateUser() {
//       const token = localStorage.getItem("token");
//       if (!token) return setUser(null);

//       // ⭐ NEW: Update instantly from localStorage
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) setUser(JSON.parse(storedUser));

//       // Refresh user from DB for security
//       fetch("/api/auth/me", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       })
//         .then((r) => r.json())
//         .then((data) => setUser(data.user || null));
//     }

//     updateUser();
//     window.addEventListener("auth-change", updateUser);

//     return () => window.removeEventListener("auth-change", updateUser);
//   }, []);

//   // ---------------------------------------
//   // CLICK OUTSIDE TO CLOSE PANELS
//   // ---------------------------------------
//   useEffect(() => {
//     const listener = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenu(false);
//         setOpenHistory(false);
//       }
//     };

//     document.addEventListener("mousedown", listener);
//     return () => document.removeEventListener("mousedown", listener);
//   }, []);

//   // ---------------------------------------
//   // LOAD HISTORY
//   // ---------------------------------------
//   const loadHistory = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch("/api/history/get", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token }),
//     });

//     const data = await res.json();
//     setHistory(data.history || []);
//   };

//   // ---------------------------------------
//   // CLEAR HISTORY
//   // ---------------------------------------
//   const clearHistory = async () => {
//     const token = localStorage.getItem("token");

//     await fetch("/api/history/clear", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token }),
//     });

//     setHistory([]);
//   };

//   // ---------------------------------------
//   // LOGOUT
//   // ---------------------------------------
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     window.dispatchEvent(new Event("auth-change"));
//     router.push("/login");
//   };

//   const filteredHistory = history.filter((h) =>
//     h.prompt.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <header className="fixed top-0 left-0 w-full py-4 px-6 bg-gray-900/80 backdrop-blur-lg text-white flex justify-between items-center border-b border-gray-700 z-50">
//       <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
//         ClusterAI<span className="text-cyan-400">.</span>
//       </h1>

//       <nav className="flex items-center gap-6">
//         <Link href="/" className="hover:text-cyan-400 transition">
//           Home
//         </Link>
//         <Link href="/assistant" className="hover:text-cyan-400 transition">
//           Assistant
//         </Link>

//         {/* ---------------------------- */}
//         {/* LOGGED-IN USER UI */}
//         {/* ---------------------------- */}

//         {user ? (
//           <div className="relative" ref={menuRef}>
//             <button
//               onClick={() => {
//                 setOpenMenu(!openMenu);
//                 setOpenHistory(false);
//               }}
//               className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold shadow-md hover:scale-105 transition"
//             >
//               {user.name?.charAt(0).toUpperCase()}
//             </button>

//             {/* --- MENU --- */}
//             <AnimatePresence>
//               {openMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                   className="absolute right-0 mt-3 w-72 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl z-50"
//                 >
//                   <p className="font-semibold text-lg">{user.name}</p>
//                   <p className="text-sm text-gray-400">{user.email}</p>

//                   <button
//                     onClick={() => {
//                       loadHistory();
//                       setOpenHistory(true);
//                       setOpenMenu(false);
//                     }}
//                     className="w-full text-left py-2 mt-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition px-3"
//                   >
//                     📜 View History
//                   </button>

//                   <button
//                     onClick={logout}
//                     className="w-full text-left py-2 mt-3 rounded-lg bg-red-600 hover:bg-red-700 transition px-3"
//                   >
//                     🚪 Logout
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* --- HISTORY PANEL --- */}
//             <AnimatePresence>
//               {openHistory && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10, scale: 0.98 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 10, scale: 0.98 }}
//                   className="absolute right-0 mt-3 w-[420px] h-[450px] bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-2xl z-50 overflow-y-auto"
//                 >
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="font-bold text-xl">📜 Your History</h2>
//                     <button
//                       onClick={() => setOpenHistory(false)}
//                       className="text-gray-400 hover:text-red-400"
//                     >
//                       ✕
//                     </button>
//                   </div>

//                   <input
//                     type="text"
//                     placeholder="Search history..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     className="w-full bg-gray-800 p-3 rounded mb-3 border border-gray-700"
//                   />

//                   <button
//                     onClick={clearHistory}
//                     className="bg-red-600 px-3 py-2 rounded hover:bg-red-700 mb-4"
//                   >
//                     🗑 Clear All
//                   </button>

//                   {filteredHistory.length === 0 ? (
//                     <p className="text-gray-500 text-center mt-10">
//                       No history found.
//                     </p>
//                   ) : (
//                     <div className="space-y-4">
//                       {filteredHistory.map((item) => (
//                         <div
//                           key={item._id}
//                           className="p-4 rounded-xl bg-gray-800 border border-gray-700"
//                         >
//                           <p className="text-sm text-gray-400">
//                             {item.type.toUpperCase()}
//                           </p>
//                           <p className="font-semibold">{item.prompt}</p>

//                           {item.type === "image" && (
//                             <img
//                               src={item.output}
//                               className="mt-3 w-32 rounded-lg border border-gray-700"
//                             />
//                           )}
//                           {item.type === "video" && (
//                             <video
//                               src={item.output}
//                               controls
//                               className="mt-3 w-full rounded-lg border border-gray-700"
//                             />
//                           )}
//                           {item.type === "audio" && (
//                             <audio
//                               src={item.output}
//                               controls
//                               className="mt-3 w-full"
//                             />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ) : (
//           <>
//             <Link href="/login" className="hover:text-cyan-400 transition">
//               Login
//             </Link>
//             <Link href="/register" className="hover:text-cyan-400 transition">
//               Register
//             </Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, LogOut, User, Trash2 } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");

  const menuRef = useRef(null);

  // -----------------------------
  // REAL-TIME USER LISTENER
  // -----------------------------
  useEffect(() => {
    function updateUser() {
      const token = localStorage.getItem("token");
      if (!token) return setUser(null);

      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));

      fetch("/api/auth/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((r) => r.json())
        .then((d) => setUser(d.user || null));
    }

    updateUser();
    window.addEventListener("auth-change", updateUser);
    return () => window.removeEventListener("auth-change", updateUser);
  }, []);

  // -----------------------------
  // CLICK OUTSIDE TO CLOSE PANELS
  // -----------------------------
  useEffect(() => {
    const detect = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) return;
      setOpenMenu(false);
      setOpenHistory(false);
    };
    document.addEventListener("mousedown", detect);
    return () => document.removeEventListener("mousedown", detect);
  }, []);

  // -----------------------------
  // LOAD HISTORY
  // -----------------------------
  const loadHistory = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/history/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const d = await res.json();
    setHistory(d.history || []);
  };

  // -----------------------------
  // CLEAR HISTORY
  // -----------------------------
  const clearHistory = async () => {
    const token = localStorage.getItem("token");

    await fetch("/api/history/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    setHistory([]);
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  const filteredHistory = history.filter((h) =>
    h.prompt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50 
        bg-gray-900/60 backdrop-blur-2xl 
        border-b border-gray-800/70
        px-6 py-4 flex justify-between items-center
        shadow-lg shadow-black/40
      "
    >
      {/* BRANDING */}
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
        AI Studio
      </h1>

      {/* NAVIGATION */}
      <nav className="flex items-center gap-6 text-gray-300">
        <Link href="/" className="hover:text-cyan-400 transition-all">
          Home
        </Link>

        {/* LOGGED OUT BUTTONS */}
        {!user && (
          <>
            <Link href="/login" className="hover:text-cyan-400">
              Login
            </Link>
            <Link href="/register" className="hover:text-cyan-400">
              Register
            </Link>
          </>
        )}

        {/* LOGGED IN USER */}
        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                setOpenMenu(!openMenu);
                setOpenHistory(false);
              }}
              className="
                w-11 h-11 rounded-full 
                bg-gradient-to-br from-purple-600 to-cyan-500
                flex items-center justify-center text-xl font-bold
                shadow-lg shadow-purple-500/40 
                hover:scale-110 transition-all
              "
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>

            {/* USER MENU */}
            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="
                    absolute right-0 mt-3 w-72 
                    bg-gray-900/90 backdrop-blur-xl 
                    border border-gray-700 rounded-xl p-5 
                    shadow-2xl shadow-black/50
                  "
                >
                  <div className="mb-3">
                    <p className="font-semibold text-xl flex items-center gap-2">
                      <User size={18} /> {user.name}
                    </p>
                    <p className="text-gray-400">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      loadHistory();
                      setOpenHistory(true);
                      setOpenMenu(false);
                    }}
                    className="
                      flex items-center gap-2 
                      w-full py-2 px-3 rounded-lg 
                      bg-gray-800 hover:bg-gray-700 transition-all
                    "
                  >
                    <History size={18} /> View History
                  </button>

                  <button
                    onClick={logout}
                    className="
                      flex items-center gap-2 
                      w-full py-2 px-3 mt-3 rounded-lg 
                      bg-red-600 hover:bg-red-700 transition-all
                    "
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HISTORY PANEL */}
            <AnimatePresence>
              {openHistory && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="
                    absolute right-0 mt-3 w-[420px] h-[450px] 
                    bg-gray-900/90 backdrop-blur-xl 
                    border border-gray-700 
                    rounded-xl p-5 
                    shadow-2xl shadow-black/60
                    overflow-y-auto
                  "
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl">📜 History</h2>
                    <button
                      onClick={() => setOpenHistory(false)}
                      className="text-gray-500 hover:text-red-400 text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="
                      w-full bg-gray-800/80 border border-gray-700 
                      p-3 rounded-lg mb-4 
                      focus:ring-2 focus:ring-cyan-500
                    "
                  />

                  <button
                    onClick={clearHistory}
                    className="
                      flex items-center gap-2 mb-4
                      bg-red-600 hover:bg-red-700 
                      px-4 py-2 rounded-lg
                    "
                  >
                    <Trash2 size={18} /> Clear All
                  </button>

                  {filteredHistory.length === 0 ? (
                    <p className="text-gray-400 text-center mt-12">
                      No history found.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {filteredHistory.map((item) => (
                        <div
                          key={item._id}
                          className="
                            bg-gray-800/70 p-4 rounded-xl 
                            border border-gray-700 shadow-md
                          "
                        >
                          <p className="text-sm text-gray-400">
                            {item.type.toUpperCase()}
                          </p>
                          <p className="font-semibold">{item.prompt}</p>

                          {item.type === "image" && (
                            <img
                              src={item.output}
                              className="mt-3 w-32 rounded-lg border border-gray-700"
                            />
                          )}

                          {item.type === "audio" && (
                            <audio
                              controls
                              src={item.output}
                              className="mt-3 w-full"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </nav>
    </header>
  );
}
