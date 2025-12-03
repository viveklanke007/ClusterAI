import { Home, MessageSquare, Image, Type, Mic } from "lucide-react";

export const MENU_ITEMS = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Assistant", icon: MessageSquare, path: "/assistant" },
  { name: "Text", icon: Type, path: "/tools/text" },
  { name: "Image", icon: Image, path: "/tools/image" },
  { name: "Audio", icon: Mic, path: "/tools/audio" },
];
