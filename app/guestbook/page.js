// app/guestbook/page.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Bağlantıyı çağırdık
import { motion } from "framer-motion";

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. VERİLERİ ÇEKME FONKSİYONU
  const fetchMessages = async () => {
    let { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false }); // En yeni en üstte

    if (error) console.log("Hata:", error);
    else setMessages(data);
    setLoading(false);
  };

  // Sayfa açılınca verileri çek
  useEffect(() => {
    fetchMessages();
  }, []);

  // 2. MESAJ GÖNDERME FONKSİYONU
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !msg) return;

    // Veritabanına Ekle
    const { error } = await supabase
      .from("guestbook")
      .insert([{ name: name, message: msg }]);

    if (error) {
      alert("Bir hata oluştu Ronin!");
      console.log(error);
    } else {
      // Formu temizle ve listeyi yenile
      setName("");
      setMsg("");
      fetchMessages();
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8 border-b border-red-900/50 pb-4 text-white tracking-wide">
        Ronin'in Hanı{" "}
        <span className="text-sm font-normal text-gray-500 ml-4">
          (Ziyaretçi Defteri)
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* SOL: MESAJ FORMU */}
        <div className="bg-zinc-900/50 p-6 border border-zinc-800 rounded-sm h-fit">
          <h2 className="text-xl font-bold text-red-500 mb-4">Bir İz Bırak</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                İsminiz (veya Kod Adınız)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-zinc-700 text-white p-3 rounded-sm focus:border-red-600 focus:outline-none transition-colors"
                placeholder="Örn: Gezgin Yazılımcı"
                maxLength={30}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Mesajınız
              </label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows="4"
                className="w-full bg-black border border-zinc-700 text-white p-3 rounded-sm focus:border-red-600 focus:outline-none transition-colors"
                placeholder="Buraya bir selam bırak..."
                maxLength={200}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-900/80 hover:bg-red-700 text-white font-bold py-3 rounded-sm transition-all border border-red-800"
            >
              MESAJI MÜHÜRLE
            </button>
          </form>
        </div>

        {/* SAĞ: MESAJ LİSTESİ */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <p className="text-gray-500 animate-pulse">
              Eski parşömenler okunuyor...
            </p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500 italic">
              Henüz kimse uğramamış. İlk sen ol!
            </p>
          ) : (
            messages.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm hover:border-zinc-600 transition-colors relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-lg">{item.name}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("tr-TR")}
                  </span>
                </div>
                <p className="text-gray-300 font-light text-sm leading-relaxed">
                  "{item.message}"
                </p>
                {/* Süsleme */}
                <div className="absolute -left-1 top-4 w-1 h-8 bg-red-900/50"></div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
