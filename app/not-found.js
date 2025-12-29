// app/not-found.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-center px-4 overflow-hidden relative">
      {/* ARKA PLAN: Devasa Silik 404 Yazısı */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-[10rem] md:text-[20rem] font-bold text-red-900/10 select-none absolute z-0 pointer-events-none"
      >
        404
      </motion.h1>

      {/* ÖN PLAN: Mesaj ve Buton */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            Yolunu mu Kaybettin Gezgin?
          </h2>

          <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg font-light leading-relaxed">
            Aradığın sayfa sislerin arasında kaybolmuş veya hiç var olmamış. Ama
            endişelenme, bir Ronin her zaman eve dönüş yolunu bulur.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/"
            className="group relative px-8 py-3 bg-red-900/20 border border-red-800 text-red-500 rounded-sm hover:bg-red-800 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
          >
            <span className="relative z-10 font-bold tracking-wide">
              ANA SAYFAYA DÖN
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
