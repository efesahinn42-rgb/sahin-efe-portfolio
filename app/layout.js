// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

// --- SEO VE SOSYAL MEDYA AYARLARI ---
export const metadata = {
  // ÖNEMLİ: Kendi sitenin canlı adresini buraya tam olarak yazmalısın
  metadataBase: new URL("https://sahin-efe-portfolio.vercel.app"),

  title: {
    default: "Şahin Efe | Code Ronin",
    template: "%s | Şahin Efe", // Alt sayfalarda "Projeler | Şahin Efe" yazar
  },
  description:
    "Modern web geliştirici portfolyosu. Next.js, React ve Python ile estetik ve güçlü web çözümleri.",

  keywords: [
    "Şahin Efe",
    "Web Geliştirici",
    "Frontend Developer",
    "Code Ronin",
    "Next.js",
    "React",
    "Portfolio",
  ],

  authors: [{ name: "Şahin Efe" }],

  // Facebook, WhatsApp, LinkedIn Kartı
  openGraph: {
    title: "Şahin Efe | Code Ronin",
    description:
      "Dijital dünyada fikirleri gerçeğe dönüştüren Web Geliştirici.",
    url: "https://sahin-efe-portfolio.vercel.app",
    siteName: "Şahin Efe Portfolio",
    locale: "tr_TR",
    type: "website",
  },

  // Twitter (X) Kartı
  twitter: {
    card: "summary_large_image",
    title: "Şahin Efe | Code Ronin",
    description: "Modern web geliştirici portfolyosu.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
// -------------------------------------

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} md:cursor-none`}>
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
