// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
// Yaptığımız Sidebar bileşenini buraya çağırıyoruz (Import)
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Şahin Efe Portfolyo",
  description: "Kişisel web portfolyom",
};

/* KAVRAM 3: CHILDREN (Çocuklar)
   Bu çok önemli. Layout bir "çerçeve"dir. 
   'children' ise o an hangi sayfadaysan (Anasayfa, Hakkımda vs.) onun içeriğidir.
   
   Biz diyoruz ki: Ekrana önce Sidebar'ı koy, yanına da sayfanın içeriğini (children) koy.
*/
export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex">
          {/* 1. PARÇA: Sidebar (Solda sabit) */}
          <Sidebar />

          {/* 2. PARÇA: Ana İçerik (Sidebar'ın sağında kalan alan) 
              ml-64: Sidebar 64 birim genişliğinde olduğu için,
              içeriği 64 birim sağdan başlatıyoruz (Margin Left) ki üst üste binmesin.
          */}
          <main className="ml-64 w-full min-h-screen bg-black text-gray-300 p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
