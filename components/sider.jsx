"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Image, Type, Mic } from "lucide-react";

export default function Sidebar() {
  const path = usePathname();

  const menu = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Assistant", icon: MessageSquare, path: "/assistant" },
    { name: "Text", icon: Type, path: "/tools/text" },
    { name: "Image", icon: Image, path: "/tools/image" },
    { name: "Audio", icon: Mic, path: "/tools/audio" },
  ];

  return (
    <div
      className="
        fixed left-0 top-0 
        h-full w-64 
        bg-gray-900/40 
        backdrop-blur-xl 
        border-r border-gray-800 
        shadow-2xl shadow-black/30
        flex flex-col 
        pt-10 
        px-4 
        space-y-6
        z-50
      "
    >
      {/* --------------------------- */}
      {/* BRAND / LOGO  */}
      {/* --------------------------- */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div
          className="
            text-3xl font-extrabold 
            bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
            text-transparent bg-clip-text 
            drop-shadow-[0_0_12px_rgba(200,100,255,0.5)]
          "
        >
          ClusterAI<span className="text-cyan-400">.</span>
        </div>

        <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 shadow-lg" />
      </div>

      {/* --------------------------- */}
      {/* MENU ITEMS */}
      {/* --------------------------- */}
      <div className="space-y-3">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const active = path === item.path;

          return (
            <Link
              key={i}
              href={item.path}
              className={`
                flex items-center gap-4 
                px-4 py-3 rounded-xl 
                text-lg font-medium transition-all 
                ${
                  active
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black shadow-lg scale-[1.03]"
                    : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                }
              `}
            >
              <Icon
                size={22}
                className={active ? "text-black" : "text-cyan-300"}
              />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
