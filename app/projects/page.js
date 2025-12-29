// app/projects/page.js
import Link from "next/link";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "BellaVita Atölye",
      description:
        "El yapımı ürünlerin satıldığı e-ticaret markası için geliştirdiğim kurumsal web sitesi.",
      tags: ["Web Tasarım", "Python Backend", "Marka"],
      link: "https://www.bellavitaatölye.com.tr",
      status: "Tamamlandı",
    },
    {
      id: 2,
      title: "Görev Yöneticisi (Todo)",
      description:
        "React state yönetimini kavramak için geliştireceğim görev takip uygulaması.",
      tags: ["React", "LocalStorage", "App"],
      link: "#",
      status: "Planlanıyor",
    },
    {
      id: 3,
      title: "BGC Filo Yönetim",
      description:
        "Araç kiralama ve sigorta şirketi için kurumsal filo yönetim paneli.",
      tags: ["Next.js", "Dashboard", "SaaS"],
      link: "#",
      status: "Geliştirme",
    },
    {
      id: 4,
      title: "Futbol Forum Uygulaması",
      description: "Futbol taraftar forum uygulaması",
      tags: ["Next.js", "Dashboard", "SaaS"],
      link: "#",
      status: "Geliştirme",
    },
    {
      id: 5,
      title: "Portfolyo Sayfam",
      description: "Kişisel Web Portfolyom",
      tags: ["Next.js", "Dashboard", "SaaS"],
      link: "#",
      status: "Tamamlandı",
    },
    {
      id: 6,
      title: "Haber Web Uygulaması",
      description:
        "Türkiye ve Dünyadan En güncel haberlerin olduğu web uygulaması",
      tags: ["Next.js", "Dashboard", "SaaS"],
      link: "#",
      status: "Geliştirme",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 border-b border-red-900/50 pb-4 text-white tracking-wide">
        Projelerim
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          // KART TASARIMI: Siyah zemin, kırmızı kenarlık, hover ile kırmızı gölge
          <div
            key={project.id}
            className="group bg-zinc-900/30 border border-red-900/30 rounded-sm p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(185,28,28,0.15)] hover:border-red-800"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                {project.title}
              </h3>
              {/* Durum Etiketi */}
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

            <p className="text-gray-400 mb-6 h-16 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span key={index} className="text-xs text-red-400/80 font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Buton: Kırmızı */}
            <Link
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : "_self"}
              className="inline-block w-full text-center border border-red-700 text-red-500 hover:bg-red-700 hover:text-white font-medium py-3 rounded-sm transition-all duration-300"
            >
              {project.status === "Tamamlandı"
                ? "Projeyi İncele"
                : "Yakında..."}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
