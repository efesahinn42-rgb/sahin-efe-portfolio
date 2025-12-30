// app/admin/page.js
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Projeleri tutacak state
  const [projects, setProjects] = useState([]);

  // FORM VERİLERİ
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    link: "",
    status: "Geliştirme",
  });

  // 1. GÜVENLİK VE VERİ ÇEKME
  useEffect(() => {
    const init = async () => {
      // a) Kullanıcı Kontrolü
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);

      // b) Mevcut Projeleri Çek (Listelemek için)
      fetchProjects();

      setLoading(false);
    };
    init();
  }, [router]);

  // Projeleri Veritabanından Getir
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false }); // En son eklenen en üstte

    if (data) setProjects(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. PROJE EKLEME
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "info", text: "Kaydediliyor..." });

    const tagArray = formData.tags.split(",").map((tag) => tag.trim());

    const { error } = await supabase.from("projects").insert([
      {
        title: formData.title,
        description: formData.description,
        tags: tagArray,
        link: formData.link,
        status: formData.status,
      },
    ]);

    if (error) {
      setMessage({ type: "error", text: "Hata: " + error.message });
    } else {
      setMessage({ type: "success", text: "Proje Başarıyla Eklendi! 🚀" });
      setFormData({
        title: "",
        description: "",
        tags: "",
        link: "",
        status: "Geliştirme",
      });
      fetchProjects(); // Listeyi yenile
    }
  };

  // 3. PROJE SİLME İŞLEMİ (YENİ) 🗑️
  const handleDelete = async (id) => {
    // Emin misin diye soralım
    if (
      !window.confirm("Bu projeyi kalıcı olarak silmek istediğine emin misin?")
    )
      return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert("Silinirken hata oluştu: " + error.message);
    } else {
      // Ekrandan da kaldıralım (Sayfayı yenilemeden)
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading)
    return (
      <div className="text-white text-center mt-20 animate-pulse">
        Güvenlik Taraması...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 pb-20">
      {/* ÜST BAR */}
      <div className="flex justify-between items-center mb-8 border-b border-red-900/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Kaptan Köşkü</h1>
          <p className="text-xs text-gray-500 mt-1">
            Giriş Yapıldı: {user?.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-red-400 border border-red-900/30 px-3 py-2 rounded hover:bg-red-900/30 transition-all"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* SOL TARA: FORM ALANI */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-lg shadow-xl h-fit">
          <h2 className="text-xl text-white mb-6 flex items-center gap-2">
            <span className="text-red-500">Add New Project</span> / Yeni Silah
            Ekle
          </h2>

          {message && (
            <div
              className={`p-4 mb-6 rounded text-sm ${
                message.type === "success"
                  ? "bg-green-900/20 text-green-400 border border-green-900"
                  : "bg-red-900/20 text-red-400 border border-red-900"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Proje Adı
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Durum
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-red-600 focus:outline-none"
                >
                  <option value="Geliştirme">🛠 Geliştirme</option>
                  <option value="Tamamlandı">✅ Tamamlandı</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Link</label>
                <input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Etiketler
              </label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-red-600 focus:outline-none"
                placeholder="React, Tailwind"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition-all"
            >
              SİSTEME KAYDET
            </button>
          </form>
        </div>

        {/* SAĞ TARAF: LİSTE VE SİLME */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-lg">
          <h2 className="text-xl text-white mb-6 flex items-center gap-2">
            <span className="text-gray-500">Inventory</span> / Mevcut Silahlar (
            {projects.length})
          </h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex justify-between items-center bg-black/40 p-4 rounded border border-zinc-800 hover:border-zinc-600 transition-all group"
              >
                <div>
                  <h3 className="text-white font-bold">{project.title}</h3>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      project.status === "Tamamlandı"
                        ? "border-green-900 text-green-500"
                        : "border-yellow-900 text-yellow-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-900/20 hover:bg-red-600 hover:text-white text-red-500 p-2 rounded transition-all"
                  title="Sil"
                >
                  {/* Çöp Kutusu İkonu */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            ))}

            {projects.length === 0 && (
              <p className="text-gray-500 text-center py-10">
                Henüz hiç silah eklenmedi.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
