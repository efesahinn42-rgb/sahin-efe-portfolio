// app/login/page.js
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Supabase ile giriş yap
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Giriş başarısız: " + error.message);
      setLoading(false);
    } else {
      // Başarılıysa Admin paneline yönlendir
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-red-900/30 p-8 rounded-lg shadow-[0_0_30px_rgba(153,27,27,0.1)]">
        <h1 className="text-3xl font-bold text-white mb-6 text-center tracking-wider">
          GİZLİ GİRİŞ
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">E-Posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-red-600 transition-colors"
              placeholder="admin@ronin.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-red-600 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-800 hover:bg-red-700 text-white font-bold py-3 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş Yapılıyor..." : "Sisteme Gir"}
          </button>
        </form>
      </div>
    </div>
  );
}
