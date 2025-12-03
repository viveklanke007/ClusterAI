import "./globals.css";
import Header from "../components/header";

export const metadata = {
  title: "AI Universe",
  description: "AI Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
        <Header />
        {/* Adjusted padding: pt-24 allows space for fixed header */}
        <main className="pt-24 min-h-screen relative">{children}</main>
      </body>
    </html>
  );
}
