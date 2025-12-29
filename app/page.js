// app/page.js
"use client"; // Animasyon kullandığımız için bu satır şart!

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Animasyon kütüphanesi
import FallingLeaves from "@/components/FallingLeaves";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* 1. KATMAN: Yaprak Efekti */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FallingLeaves />
      </div>

      {/* 2. KATMAN: Arka Plan Resmi */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Ghost of Tsushima Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* 3. KATMAN: Yazı ve İçerik (Animasyonlu) */}
      <div className="relative z-20 text-center px-4">
        {/* İSİM ANİMASYONU: Soldan Sağa */}
        <motion.h1
          initial={{ x: -100, opacity: 0 }} // Başlangıç: Solda (-100px) ve görünmez
          animate={{ x: 0, opacity: 1 }} // Bitiş: Ortada ve görünür
          transition={{ duration: 1.2, ease: "easeOut" }} // Süre: 1.2 saniye
          className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter text-white drop-shadow-2xl"
        >
          ŞAHİN <span className="text-red-600">EFE</span>
        </motion.h1>

        {/* UNVAN ANİMASYONU: Yavaşça Belirme (Gecikmeli) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }} // İsimden sonra başlasın (delay)
          className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide"
        >
          Web Geliştirici &{" "}
          <span className="italic text-red-400">Code Ronin</span>
        </motion.p>

        {/* BUTONLAR ANİMASYONU: Aşağıdan Yukarı */}
        <motion.div
          initial={{ y: 50, opacity: 0 }} // Başlangıç: Aşağıda
          animate={{ y: 0, opacity: 1 }} // Bitiş: Yerinde
          transition={{ delay: 1.5, duration: 0.8 }} // En son bu gelsin
          className="flex gap-4 justify-center"
        >
          <Link
            href="/projects"
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            PROJELERİM
          </Link>

          <Link
            href="/contact"
            className="border border-red-600 text-red-500 hover:bg-red-600/10 px-8 py-3 rounded-sm transition-all duration-300"
          >
            İLETİŞİM
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
