// components/FallingLeaves.jsx
"use client"; // Animasyonlar tarayıcıda çalıştığı için bu satır şarttır.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Yaprak (Sakura) şeklinin SVG çizimi.
// İnternetten resim aramana gerek yok, kodla çiziyoruz.
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C8 2 4 6 4 11C4 16.5 9 22 12 22C15 22 20 16.5 20 11C20 6 16 2 12 2ZM12 20C10 20 6 15.5 6 11C6 7.5 8.5 4 12 4C15.5 4 18 7.5 18 11C18 15.5 14 20 12 20Z" />
  </svg>
);

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Sayfa açıldığında 30 tane yaprak üretelim
    const leafArray = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Ekranın %0 ile %100'ü arasında rastgele yatay konum
      delay: Math.random() * 5, // Düşmeye başlama gecikmesi (hepsi aynı anda başlamasın)
      duration: 5 + Math.random() * 10, // Düşüş süresi (bazıları hızlı, bazıları yavaş)
      size: 10 + Math.random() * 20, // Yaprak boyutu (küçük/büyük karışık)
      rotation: Math.random() * 360, // Başlangıç dönme açısı
    }));
    setLeaves(leafArray);
  }, []);

  return (
    // pointer-events-none: Yaprakların üzerine tıklanmasın, içinden geçilsin.
    // fixed inset-0: Tüm ekranı kaplasın.
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          // Başlangıç Pozisyonu: Ekranın tepesinde (y: -100)
          initial={{
            y: -100,
            x: `${leaf.x}vw`,
            opacity: 0,
            rotate: leaf.rotation,
          }}
          // Bitiş Pozisyonu (Animasyon Hedefi)
          animate={{
            y: "110vh", // Ekranın en altına kadar in
            x: [`${leaf.x}vw`, `${leaf.x + 5}vw`, `${leaf.x - 5}vw`], // Rüzgar etkisi (sağa sola salla)
            opacity: [0, 0.8, 0], // Başta görünme, ortada parla, sonda kaybol
            rotate: leaf.rotation + 360, // Kendi etrafında dön
          }}
          // Animasyon Ayarları
          transition={{
            duration: leaf.duration, // Ne kadar sürsün?
            repeat: Infinity, // Sonsuza kadar tekrarla
            delay: leaf.delay, // Ne zaman başlasın?
            ease: "linear", // Sabit hızda düşsün
          }}
          // Stil Ayarları
          style={{
            position: "absolute",
            width: leaf.size,
            height: leaf.size,
            color: Math.random() > 0.5 ? "#FECaca" : "#b91c1c", // %50 Pembe (Sakura), %50 Kırmızı (Kan)
          }}
        >
          <LeafIcon />
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLeaves;
