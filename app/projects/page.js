// app/projects/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      // 1. Konsola okuduğumuz URL'i yazdıralım
      console.log("🔗 BAĞLANILAN ADRES:", process.env.NEXT_PUBLIC_SUPABASE_URL);

      let { data, error } = await supabase
        .from("projects") // Tablo adı küçük harflerle 'projects'
        .select("*");

      if (error) console.error("🔴 HATA:", error.message);
      if (data) {
        console.log("🟢 GELEN VERİ:", data);
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // ... (Geri kalan kodlar ve render kısmı aynı kalacak) ...
  // ANİMASYON AYARLARI
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 border-b border-red-900/50 pb-4 text-white tracking-wide">
        Projelerim
      </h1>

      {loading ? (
        <div className="text-gray-500 animate-pulse text-center mt-20">
          <p>Silahlar hazırlanıyor...</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.length === 0 ? (
            <p className="text-white">Veri boş geldi! Konsola bak.</p>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="group bg-zinc-900/30 border border-red-900/30 rounded-sm p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(185,28,28,0.15)] hover:border-red-800 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {project.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-sm border ${
                      project.status === "Tamamlandı"
                        ? "bg-green-900/20 text-green-500 border-green-900"
                        : "bg-zinc-800 text-gray-400 border-zinc-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags &&
                    project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-red-400/80 font-mono border border-red-900/20 px-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>

                <Link
                  href={project.link || "#"}
                  target={project.link?.startsWith("http") ? "_blank" : "_self"}
                  className={`inline-block w-full text-center border font-medium py-3 rounded-sm transition-all duration-300 ${
                    project.status === "Tamamlandı"
                      ? "border-red-700 text-red-500 hover:bg-red-700 hover:text-white cursor-pointer"
                      : "border-zinc-700 text-zinc-500 cursor-not-allowed opacity-50"
                  }`}
                >
                  {project.status === "Tamamlandı"
                    ? "Projeyi İncele"
                    : "Yakında..."}
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
