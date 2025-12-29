// app/layout.js (ÖNEMLİ KISIMLAR)
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import CustomCursor from "@/components/CustomCursor"; // <--- 1. EKLE

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Şahin Efe | Code Ronin",
  description: "Web Geliştirici Portfolyosu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      {/* cursor-none: Standart beyaz oku gizler */}
      <body className={`${inter.className} md:cursor-none`}>
        {/* Özel İmlecimizi Çağırıyoruz */}
        <CustomCursor />

        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="ml-0 md:ml-64 w-full min-h-screen bg-black text-gray-300 p-6 md:p-10 pb-24 md:pb-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
