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
        <div className="flex flex-col md:flex-row">
          <Sidebar />

          {/* GÜNCELLENEN KISIM: */}
          {/* ml-0: Telefondaysa sola yapış. */}
          {/* md:ml-64: Bilgisayardaysa soldan 64 birim (Sidebar kadar) boşluk bırak. */}
          {/* pb-24: Telefondaysa en alta boşluk bırak (Menü üzerine binmesin). */}
          <main className="ml-0 md:ml-64 w-full min-h-screen bg-black text-gray-300 p-6 md:p-10 pb-24 md:pb-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
