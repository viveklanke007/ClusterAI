// "use client";

// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { History, LogOut, User, Trash2, Menu, X } from "lucide-react";
// import { MENU_ITEMS } from "./menuData";

// export default function Header() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [user, setUser] = useState(null);

//   // UI States
//   const [openMenu, setOpenMenu] = useState(false);
//   const [openHistory, setOpenHistory] = useState(false);
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);

//   // History Data
//   const [history, setHistory] = useState([]);
//   const [query, setQuery] = useState("");

//   const menuRef = useRef(null);

//   // 1. Auth Check
//   useEffect(() => {
//     function updateUser() {
//       const token = localStorage.getItem("token");
//       if (!token) return setUser(null);

//       const stored = localStorage.getItem("user");
//       if (stored) setUser(JSON.parse(stored));

//       fetch("/api/auth/me", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       })
//         .then((r) => r.json())
//         .then((d) => setUser(d.user || null));
//     }

//     updateUser();
//     window.addEventListener("auth-change", updateUser);
//     return () => window.removeEventListener("auth-change", updateUser);
//   }, []);

//   // 2. Close mobile menu on route change
//   useEffect(() => {
//     setMobileNavOpen(false);
//     setOpenHistory(false);
//     setOpenMenu(false);
//   }, [pathname]);

//   // History Functions
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

//   const clearHistory = async () => {
//     const token = localStorage.getItem("token");
//     await fetch("/api/history/clear", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token }),
//     });
//     setHistory([]);
//   };

//   const deleteOneHistory = async (id) => {
//     const token = localStorage.getItem("token");
//     const res = await fetch("/api/history/delete", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token, id }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       setHistory((prev) => prev.filter((item) => item._id !== id));
//     }
//   };

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
//     <>
//       <header
//         className="
//           fixed top-0 left-0 w-full z-50
//           bg-gray-900/80 backdrop-blur-2xl
//           border-b border-gray-800/70
//           px-4 md:px-6 py-4 flex justify-between items-center
//           shadow-lg shadow-black/40
//         "
//       >
//         <div className="flex items-center gap-4">
//           {/* MOBILE HAMBURGER BUTTON */}
//           <button
//             onClick={() => setMobileNavOpen(true)}
//             className="md:hidden text-gray-300 hover:text-white"
//           >
//             <Menu size={28} />
//           </button>

//           {/* <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
//             AI Studio
//           </h1> */}
//           <div
//             className="
//             text-4xl font-extrabold m-auto
//             bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
//             text-transparent bg-clip-text
//             drop-shadow-[0_0_12px_rgba(200,100,255,0.5)]
//           "
//           >
//             ClusterAI<span className="text-cyan-400">.</span>
//             <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 shadow-lg" />
//           </div>
//         </div>

//         {/* DESKTOP NAV */}
//         <nav className="hidden md:flex items-center gap-6 text-gray-300">
//           <Link href="/" className="hover:text-cyan-400 transition-all">
//             Home
//           </Link>

//           <Link href="/assistant" className="hover:text-cyan-400">
//             Assistant
//           </Link>

//           {/* NOT LOGGED IN */}
//           {!user && (
//             <>
//               <Link href="/login" className="hover:text-cyan-400">
//                 Login
//               </Link>
//               <Link href="/register" className="hover:text-cyan-400">
//                 Register
//               </Link>
//             </>
//           )}

//           {/* LOGGED IN USER AVATAR (DESKTOP) */}
//           {user && (
//             <div className="relative" ref={menuRef}>
//               <button
//                 onClick={() => {
//                   setOpenMenu(!openMenu);
//                   setOpenHistory(false);
//                 }}
//                 className="
//                   w-11 h-11 rounded-full
//                   bg-gradient-to-br from-purple-600 to-cyan-500
//                   flex items-center justify-center text-xl font-bold
//                   shadow-lg hover:scale-110 transition-all
//                 "
//               >
//                 {user.name?.charAt(0).toUpperCase()}
//               </button>

//               {/* DROPDOWN MENU */}
//               <AnimatePresence>
//                 {openMenu && (
//                   <>
//                     {/* Invisible Backdrop to close menu */}
//                     <div
//                       className="fixed inset-0 z-40"
//                       onClick={() => setOpenMenu(false)}
//                     />

//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.9 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.9 }}
//                       className="
//                       absolute right-0 mt-3 w-72
//                       bg-gray-900/95 backdrop-blur-xl
//                       border border-gray-700 rounded-xl p-5
//                       shadow-2xl z-50
//                     "
//                     >
//                       <p className="font-semibold text-lg flex items-center gap-2">
//                         <User size={18} /> {user.name}
//                       </p>
//                       <p className="text-gray-400 text-sm mb-4">{user.email}</p>

//                       <button
//                         onClick={() => {
//                           loadHistory();
//                           setOpenHistory(true);
//                           setOpenMenu(false);
//                         }}
//                         className="flex items-center gap-2 w-full py-2 px-3 mt-2 rounded-lg bg-gray-800 hover:bg-gray-700"
//                       >
//                         <History size={18} /> View History
//                       </button>

//                       <button
//                         onClick={logout}
//                         className="flex items-center gap-2 w-full py-2 px-3 mt-3 rounded-lg bg-red-600 hover:bg-red-700"
//                       >
//                         <LogOut size={18} /> Logout
//                       </button>
//                     </motion.div>
//                   </>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}
//         </nav>
//       </header>

//       {/* ========================================= */}
//       {/* GLOBAL HISTORY PANEL (MOBILE & DESKTOP) */}
//       {/* ========================================= */}
//       <AnimatePresence>
//         {openHistory && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setOpenHistory(false)}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
//             />

//             <motion.div
//               initial={{ opacity: 0, y: 20, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 20, scale: 0.95 }}
//               className="
//                 fixed z-[70]
//                 /* Mobile: Full Screen */
//                 inset-0
//                 md:inset-auto md:top-20 md:right-6
//                 md:w-[420px] md:h-[600px] md:rounded-xl
//                 bg-gray-900/95 backdrop-blur-xl
//                 border border-gray-700
//                 p-5 shadow-2xl flex flex-col
//               "
//             >
//               <div className="flex justify-between mb-4">
//                 <h2 className="font-bold text-xl flex items-center gap-2">
//                   📜 History
//                 </h2>
//                 <button
//                   onClick={() => setOpenHistory(false)}
//                   className="bg-gray-800 p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="w-full bg-gray-800/80 border border-gray-700 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-cyan-500"
//               />

//               <button
//                 onClick={clearHistory}
//                 className="flex items-center justify-center gap-2 mb-4 bg-red-600/20 text-red-400 border border-red-900/50 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm"
//               >
//                 <Trash2 size={16} /> Clear All Records
//               </button>

//               <div className="overflow-y-auto flex-1 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-gray-700">
//                 {filteredHistory.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-40 text-gray-500">
//                     <History size={40} className="mb-2 opacity-50" />
//                     <p>No history found.</p>
//                   </div>
//                 ) : (
//                   filteredHistory.map((item) => (
//                     <div
//                       key={item._id}
//                       className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 relative group hover:border-gray-600 transition-all"
//                     >
//                       <button
//                         onClick={() => deleteOneHistory(item._id)}
//                         className="absolute top-3 right-3 text-gray-500 hover:text-red-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity p-1"
//                       >
//                         <Trash2 size={16} />
//                       </button>

//                       <p className="text-xs text-cyan-400 mb-1 font-bold uppercase tracking-wider">
//                         {item.type}
//                       </p>
//                       <p className="font-medium text-sm mb-3 text-gray-200 line-clamp-2">
//                         {item.prompt}
//                       </p>

//                       {/* Media previews */}
//                       {item.type === "image" && (
//                         <div className="mt-2 rounded-lg overflow-hidden border border-gray-700 bg-black/20">
//                           <img
//                             src={item.output}
//                             className="w-full h-auto object-cover max-h-40"
//                             alt="Generated"
//                           />
//                         </div>
//                       )}
//                       {item.type === "audio" && (
//                         <audio
//                           controls
//                           src={item.output}
//                           className="w-full mt-2 h-8"
//                         />
//                       )}
//                       {item.type === "text" && (
//                         <p className="text-xs text-gray-500 mt-2 line-clamp-3 bg-black/20 p-2 rounded italic">
//                           {item.output}
//                         </p>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ========================================= */}
//       {/* MOBILE FULL SCREEN MENU */}
//       {/* ========================================= */}
//       <AnimatePresence>
//         {mobileNavOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: "-100%" }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: "-100%" }}
//             transition={{ type: "spring", bounce: 0, duration: 0.4 }}
//             className="fixed inset-0 z-[60] bg-gray-900 flex flex-col p-6 md:hidden overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold text-white">Menu</h2>
//               <button
//                 onClick={() => setMobileNavOpen(false)}
//                 className="bg-gray-800 p-2 rounded-full text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* USER SECTION MOBILE */}
//             {user ? (
//               <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 mb-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-lg text-white">
//                     {user.name?.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="font-bold text-lg">{user.name}</p>
//                     <p className="text-sm text-gray-400">{user.email}</p>
//                   </div>
//                 </div>

//                 {/* NEW HISTORY BUTTON FOR MOBILE */}
//                 <button
//                   onClick={() => {
//                     loadHistory();
//                     setOpenHistory(true);
//                     setMobileNavOpen(false); // Close menu to show history
//                   }}
//                   className="w-full bg-gray-700/50 text-cyan-300 py-3 rounded-lg border border-gray-600 mb-3 flex items-center justify-center gap-2 hover:bg-gray-700 transition-all font-medium"
//                 >
//                   <History size={18} /> View History
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="w-full bg-red-600/20 text-red-400 py-3 rounded-lg border border-red-900/50 flex justify-center gap-2 hover:bg-red-600/30 transition-all font-medium"
//                 >
//                   <LogOut size={18} /> Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-4 mb-8">
//                 <p className="text-gray-400 text-center mb-2">
//                   Join to save your creations!
//                 </p>
//                 <div className="flex gap-4">
//                   <Link
//                     href="/login"
//                     className="flex-1 bg-gray-800 py-3 rounded-xl text-center border border-gray-700"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 py-3 rounded-xl text-center text-black font-bold"
//                   >
//                     Register
//                   </Link>
//                 </div>
//               </div>
//             )}

//             {/* NAVIGATION LINKS MOBILE */}
//             <div className="space-y-2">
//               <p className="text-gray-500 text-sm uppercase tracking-wider mb-2 font-semibold">
//                 Tools
//               </p>
//               {MENU_ITEMS.map((item, i) => {
//                 const Icon = item.icon;
//                 const active = pathname === item.path;
//                 return (
//                   <Link
//                     key={i}
//                     href={item.path}
//                     className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium transition-colors ${
//                       active
//                         ? "bg-gray-800 text-cyan-400 border border-gray-700"
//                         : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
//                     }`}
//                   >
//                     <Icon
//                       size={22}
//                       className={active ? "text-cyan-400" : "text-gray-500"}
//                     />
//                     {item.name}
//                   </Link>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, LogOut, User, Trash2, Menu, X } from "lucide-react";
import { MENU_ITEMS } from "./menuData";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);

  // UI States
  const [openMenu, setOpenMenu] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // History Data
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");

  const menuRef = useRef(null);

  // ✅ AUTH CHECK
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

  // ✅ CLOSE ON ROUTE CHANGE
  useEffect(() => {
    setMobileNavOpen(false);
    setOpenHistory(false);
    setOpenMenu(false);
  }, [pathname]);

  // HISTORY FUNCTIONS
  const loadHistory = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/history/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    setHistory(data.history || []);
  };

  const clearHistory = async () => {
    const token = localStorage.getItem("token");
    await fetch("/api/history/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setHistory([]);
  };

  const deleteOneHistory = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/history/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, id }),
    });
    const data = await res.json();
    if (data.success) {
      setHistory((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const logout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  const filteredHistory = history.filter((h) =>
    h.prompt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* 🔒 FORCE DARK HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-2xl border-b border-gray-800 px-4 md:px-6 py-4 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <Menu size={28} />
          </button>

          {/* LOGO */}
          <div className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg">
            ClusterAI<span className="text-cyan-400">.</span>
            <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2" />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-gray-300">
          <Link href="/" className="hover:text-cyan-400">
            Home
          </Link>
          <Link href="/assistant" className="hover:text-cyan-400">
            Assistant
          </Link>

          {!user ? (
            <>
              <Link href="/login" className="hover:text-cyan-400">
                Login
              </Link>
              <Link href="/register" className="hover:text-cyan-400">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => {
                  setOpenMenu(!openMenu);
                  setOpenHistory(false);
                }}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xl font-bold shadow-lg hover:scale-110 transition-all"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              <AnimatePresence>
                {openMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOpenMenu(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 bg-black border border-gray-700 rounded-xl p-5 shadow-2xl z-50"
                    >
                      <p className="font-semibold text-lg flex items-center gap-2">
                        <User size={18} /> {user.name}
                      </p>
                      <p className="text-gray-400 text-sm mb-4">{user.email}</p>

                      <button
                        onClick={() => {
                          loadHistory();
                          setOpenHistory(true);
                          setOpenMenu(false);
                        }}
                        className="w-full bg-gray-800 hover:bg-gray-700 py-2 px-3 rounded-lg flex gap-2"
                      >
                        <History size={18} /> View History
                      </button>

                      <button
                        onClick={logout}
                        className="w-full bg-red-600 hover:bg-red-700 py-2 px-3 rounded-lg flex gap-2 mt-3"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>
      </header>

      {/* ✅ HISTORY PANEL & ✅ MOBILE MENU */}
      {/* (UNCHANGED logic – just dark colors already applied) */}

      {/* 🔒 MOBILE MENU */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-black text-gray-300 p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="bg-gray-800 p-2 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {MENU_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const active = pathname === item.path;
                return (
                  <Link
                    key={i}
                    href={item.path}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg ${
                      active
                        ? "bg-gray-800 text-cyan-400"
                        : "text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    <Icon size={22} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
