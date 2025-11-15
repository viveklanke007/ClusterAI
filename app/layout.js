// // app/layout.js
// import "./globals.css";
// import Header from "../components/header";

// export const metadata = {
//   title: "AI Universe",
//   description: "AI Studio",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-900 text-white min-h-screen">
//         <Header />
//         <main className="pt-20">{children}</main>
//       </body>
//     </html>
//   );
// }

// app/layout.js
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
        <main className="pt-24 px-4">{children}</main>
      </body>
    </html>
  );
}
