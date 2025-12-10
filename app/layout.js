import "./globals.css";
import Header from "../components/header";

export const metadata = {
  title: "AI Universe",
  description: "AI Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 🔒 FORCE DARK ROOT */}
      <body className="bg-black text-gray-300 min-h-screen overflow-x-hidden">
        <Header />

        {/* HEADER OFFSET */}
        <main className="pt-24 min-h-screen bg-black relative">{children}</main>
      </body>
    </html>
  );
}
