// app/about/page.js
"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Python (Backend)", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "JavaScript (ES6+)", level: 80 },
  { name: "Tailwind CSS", level: 95 },
  { name: "SQL / Veritabanı", level: 75 },
  { name: "Git / GitHub", level: 85 },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start">
      {/* SOL TARAF: HİKAYE (Biyografi) */}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-6 border-b border-red-900/50 pb-4 text-white tracking-wide">
          Code Ronin Hakkında
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed font-light">
          <p>
            Merhaba, ben{" "}
            <span className="text-red-500 font-semibold">Şahin Efe</span>.
            Dijital dünyada fikirleri gerçeğe dönüştüren bir web
            geliştiricisiyim.
          </p>
          <p>
            Kod yazmayı sadece bir iş olarak değil, bir sanat (Bushido) olarak
            görüyorum. Her satır kodda estetik, performans ve temiz yapı ararım.
            Özellikle <strong>Next.js, React ve Python</strong> teknolojilerinde
            uzmanlaşarak, kullanıcı dostu ve güçlü web uygulamaları
            geliştiriyorum.
          </p>
          <p>
            Şu an <strong>BGC Filo</strong> için kurumsal çözümler üretiyor ve
            kendi markam olan <strong>BellaVita</strong> üzerinde e-ticaret
            deneyimimi geliştiriyorum.
          </p>
        </div>

        {/* İMZA veya SÖZ */}
        <div className="mt-8 p-4 border-l-4 border-red-800 bg-zinc-900/50 italic text-gray-400">
          "Bir samurayın kılıcı neyse, bir yazılımcının klavyesi odur."
        </div>
      </div>

      {/* SAĞ TARAF: YETENEK ÇUBUKLARI (Stats) */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
          <span className="w-2 h-8 bg-red-600 block"></span>
          Savaş Yetenekleri
        </h2>

        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2 text-sm text-gray-400">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>

              {/* ÇUBUK ARKA PLANI */}
              <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                {/* DOLAN KISIM (Animasyonlu) */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="h-full bg-gradient-to-r from-red-900 to-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* EKSTRA BİLGİ KUTULARI */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-zinc-900 p-4 border border-zinc-800 text-center rounded-sm">
            <h3 className="text-red-500 text-2xl font-bold">3+</h3>
            <p className="text-xs text-gray-400 mt-1">Yıllık Tecrübe</p>
          </div>
          <div className="bg-zinc-900 p-4 border border-zinc-800 text-center rounded-sm">
            <h3 className="text-red-500 text-2xl font-bold">10+</h3>
            <p className="text-xs text-gray-400 mt-1">Tamamlanan Proje</p>
          </div>
        </div>
      </div>
    </div>
  );
}
