// components/TechMarquee.jsx
"use client";

import { motion } from "framer-motion";

const technologies = [
  "NEXT.JS 14",
  "REACT",
  "PYTHON",
  "TAILWIND CSS",
  "FRAMER MOTION",
  "JAVASCRIPT",
  "GIT & GITHUB",
  "FIGMA",
  "NODE.JS",
  "SQL",
  "REST API",
  "VS CODE",
];

export default function TechMarquee() {
  return (
    <div className="w-full bg-red-900/10 border-y border-red-900/30 py-4 overflow-hidden relative">
      {/* SOL VE SAĞ KENARLARA HAFİF SİS (FADE) EFEKTİ */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

      {/* KAYAN ALAN */}
      <div className="flex">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          // Sonsuz Döngü Mantığı:
          // X ekseninde -50%'ye kadar git (listenin yarısı), sonra aniden 0'a dön.
          // İki kopya olduğu için göz bu zıplamayı fark etmez.
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // Hız ayarı (Düşürürsen hızlanır)
          }}
        >
          {/* LİSTEYİ İKİ KERE YAZDIRIYORUZ (KESİNTİSİZ AKIŞ İÇİN) */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={index} className="flex items-center gap-12">
              <span className="text-xl md:text-2xl font-bold text-gray-400 tracking-widest hover:text-red-500 transition-colors cursor-default select-none">
                {tech}
              </span>
              {/* Ayırıcı Yıldız/Nokta */}
              <span className="text-red-800 text-sm">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
