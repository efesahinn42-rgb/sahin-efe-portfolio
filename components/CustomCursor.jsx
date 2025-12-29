// components/CustomCursor.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse her hareket ettiğinde pozisyonu güncelle
    const moveCursor = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* 1. ANA NOKTA (Küçük, kırmızı, tam ucunda) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-red-600 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 6, // Ortalamak için genişliğin yarısını çıkarıyoruz
          y: mousePosition.y - 6,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />

      {/* 2. İZLEYEN HALKA (Büyük, şeffaf, arkadan gelir) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-red-500 rounded-full pointer-events-none z-[9998] hidden md:block opacity-50"
        animate={{
          x: mousePosition.x - 16, // Ortalamak için (32px / 2 = 16)
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring", // Yaylanma efekti
          stiffness: 500, // Sertlik
          damping: 28, // Sönümleme (Sürtünme)
          mass: 0.5, // Kütle
        }}
      />
    </>
  );
}
