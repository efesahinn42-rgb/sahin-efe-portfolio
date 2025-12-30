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
  const [projects, setProjects] = useState([]);

  // DÜZENLEME MODU İÇİN STATE
  const [editingProject, setEditingProject] = useState(null); // Düzenlenen proje burada tutulur

  // FORM VERİLERİ
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    link: "",
    status: "Geliştirme",
  });

  // Resim Dosyası
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 1. BAŞLANGIÇ AYARLARI
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);
      fetchProjects();
      setLoading(false);
    };
    init();
  }, [router]);

  // Projeleri Getir
  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });
    if (data) setProjects(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 2. DÜZENLEME MODUNU AÇMA ✏️
  const handleEditClick = (project) => {
    setEditingProject(project); // Hangi projeyi düzenlediğimizi bilelim

    // Formu o projenin bilgileriyle doldur
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags ? project.tags.join(", ") : "", // Array'i stringe çevir
      link: project.link || "",
      status: project.status,
    });

    setSelectedFile(null); // Dosya seçimini sıfırla
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sayfayı yukarı kaydır
    setMessage({ type: "info", text: `"${project.title}" düzenleniyor...` });
  };

  // 3. DÜZENLEMEYİ İPTAL ET
  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      tags: "",
      link: "",
      status: "Geliştirme",
    });
    setSelectedFile(null);
    setMessage(null);
  };

  // 4. KAYDETME VEYA GÜNCELLEME İŞLEMİ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage({
      type: "info",
      text: editingProject ? "Güncelleniyor..." : "Kaydediliyor...",
    });

    let final_image_url = editingProject ? editingProject.image_url : null;

    // A) YENİ RESİM SEÇİLDİYSE YÜKLE
    if (selectedFile) {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, selectedFile);

      if (uploadError) {
        setMessage({
          type: "error",
          text: "Resim hatası: " + uploadError.message,
        });
        setUploading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(filePath);

      final_image_url = publicUrl;
    }

    const tagArray = formData.tags.split(",").map((tag) => tag.trim());
    const projectData = {
      title: formData.title,
      description: formData.description,
      tags: tagArray,
      link: formData.link,
      status: formData.status,
      image_url: final_image_url,
    };

    let error;

    if (editingProject) {
      // --- GÜNCELLEME (UPDATE) ---
      const { error: updateError } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id); // Sadece bu ID'yi güncelle
      error = updateError;
    } else {
      // --- YENİ EKLEME (INSERT) ---
      const { error: insertError } = await supabase
        .from("projects")
        .insert([projectData]);
      error = insertError;
    }

    if (error) {
      setMessage({ type: "error", text: "Hata: " + error.message });
    } else {
      setMessage({
        type: "success",
        text: editingProject ? "Proje Güncellendi! ✅" : "Proje Eklendi! 🚀",
      });
      handleCancelEdit(); // Formu temizle ve moddan çık
      fetchProjects(); // Listeyi yenile
    }
    setUploading(false);
  };

  // 5. SİLME İŞLEMİ
  const handleDelete = async (id) => {
    if (!window.confirm("Bu projeyi silmek istediğine emin misin?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id));
      // Eğer silinen proje o an düzenleniyorsa, formu temizle
      if (editingProject?.id === id) handleCancelEdit();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading)
    return <div className="text-white text-center mt-20">Yükleniyor...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 pb-20">
      <div className="flex justify-between items-center mb-8 border-b border-red-900/50 pb-6">
        <h1 className="text-3xl font-bold text-white">Kaptan Köşkü</h1>
        <button
          onClick={handleLogout}
          className="text-xs text-red-400 border border-red-900/30 px-3 py-2 rounded hover:bg-red-900/30"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* SOL: FORM */}
        <div
          className={`bg-zinc-900/30 border p-8 rounded-lg shadow-xl h-fit transition-colors ${
            editingProject ? "border-yellow-600/50" : "border-zinc-800"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-white">
              {editingProject
                ? `Düzenleniyor: ${editingProject.title}`
                : "Yeni Proje Ekle"}
            </h2>
            {editingProject && (
              <button
                onClick={handleCancelEdit}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                İptal Et / Yeni Ekle
              </button>
            )}
          </div>

          {message && (
            <div
              className={`p-4 mb-6 rounded text-sm ${
                message.type === "error"
                  ? "bg-red-900/20 text-red-400"
                  : message.type === "info"
                  ? "bg-blue-900/20 text-blue-400"
                  : "bg-green-900/20 text-green-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* RESİM ALANI */}
            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center hover:border-red-500 transition-colors cursor-pointer relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-gray-400">
                {selectedFile ? (
                  <span className="text-green-500 font-bold">
                    Yeni Resim: {selectedFile.name}
                  </span>
                ) : editingProject?.image_url ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={editingProject.image_url}
                      alt="Mevcut"
                      className="h-20 object-cover mb-2 rounded border border-zinc-600"
                    />
                    <span className="text-xs text-yellow-500">
                      Mevcut resim korunacak. Değiştirmek için tıkla.
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl mb-2">📸</p>
                    <p>
                      {editingProject
                        ? "Resim Ekle/Değiştir"
                        : "Kapak Resmi Yükle"}
                    </p>
                  </>
                )}
              </div>
            </div>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Proje Adı"
              className="w-full bg-black border border-zinc-700 text-white p-3 rounded"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 text-white p-3 rounded"
              >
                <option value="Geliştirme">🛠 Geliştirme</option>
                <option value="Tamamlandı">✅ Tamamlandı</option>
              </select>
              <input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Link"
                className="w-full bg-black border border-zinc-700 text-white p-3 rounded"
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Açıklama"
              className="w-full bg-black border border-zinc-700 text-white p-3 rounded"
              required
            />
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Etiketler (React, Next.js)"
              className="w-full bg-black border border-zinc-700 text-white p-3 rounded"
            />

            <button
              type="submit"
              disabled={uploading}
              className={`w-full font-bold py-3 rounded transition-all ${
                editingProject
                  ? "bg-yellow-600 hover:bg-yellow-500 text-black"
                  : "bg-white hover:bg-gray-200 text-black"
              }`}
            >
              {uploading
                ? "İŞLENİYOR..."
                : editingProject
                ? "GÜNCELLEMEYİ KAYDET"
                : "SİSTEME KAYDET"}
            </button>
          </form>
        </div>

        {/* SAĞ: ENVANTER */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-lg">
          <h2 className="text-xl text-white mb-6">
            Mevcut Envanter ({projects.length})
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`flex gap-4 items-center bg-black/40 p-3 rounded border transition-all ${
                  editingProject?.id === project.id
                    ? "border-yellow-600 bg-yellow-900/10"
                    : "border-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="w-12 h-12 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt="kapak"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
                      Yok
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-white font-bold text-sm truncate">
                    {project.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {project.status}
                  </span>
                </div>

                {/* BUTONLAR */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(project)}
                    className="p-2 text-yellow-500 hover:bg-yellow-900/20 rounded"
                    title="Düzenle"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-500 hover:bg-red-900/20 rounded"
                    title="Sil"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
