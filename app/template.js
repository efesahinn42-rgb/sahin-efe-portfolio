// app/template.js
"use client"; // Animasyonlar tarayıcıda çalışır

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      // BAŞLANGIÇ: Görünmez (opacity: 0) ve 20px aşağıda (y: 20)
      initial={{ opacity: 0, y: 20 }}
      // BİTİŞ: Tamamen görünür ve olması gereken yerde (y: 0)
      animate={{ opacity: 1, y: 0 }}
      // SÜRE: 0.5 saniye sürsün, akıcı olsun (easeOut)
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
