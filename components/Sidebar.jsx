// components/Sidebar.jsx
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  // LİNKLERİ BURADAN YÖNETİYORUZ
  const menuItems = [
    { name: "Anasayfa", path: "/" },
    { name: "Hakkımda", path: "/about" },
    { name: "Projelerim", path: "/projects" },
    { name: "Ziyaretçi Defteri", path: "/guestbook" }, // <--- YENİ EKLEDİK
    { name: "İletişim", path: "/contact" },
  ];

  return (
    // ANA KUTU
    <div className="fixed bottom-0 left-0 w-full h-16 md:h-screen md:w-64 md:top-0 bg-black text-white border-t md:border-t-0 md:border-r border-red-900/30 flex flex-row md:flex-col items-center justify-between md:justify-start z-50 p-4 md:p-6 shadow-2xl shadow-red-900/20">
      {/* PROFİL KISMI (Sadece Bilgisayarda) */}
      <div className="hidden md:block mb-8 text-center w-full">
        <div className="w-32 h-32 relative mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-800 shadow-[0_0_20px_rgba(153,27,27,0.4)]">
          {/* Avatar resmi yoksa hata vermemesi için Image yerine div de kullanılabilir, ama şimdilik böyle kalsın */}
          <Image
            src="/avatar.jpg"
            alt="Profil"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h2 className="text-2xl font-bold tracking-wider">Şahin Efe</h2>
        <p className="text-sm text-red-500 font-light tracking-widest mt-1">
          CODE RONIN
        </p>
      </div>

      {/* MENÜ LİNKLERİ */}
      <nav className="w-full h-full md:h-auto">
        <ul className="flex flex-row md:flex-col justify-around md:justify-start md:space-y-4 h-full items-center md:items-stretch">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="block text-xs md:text-base py-2 px-2 md:px-4 rounded transition-all duration-300 text-center border border-transparent hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-400 whitespace-nowrap"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER (Sadece Bilgisayarda) */}
      <div className="hidden md:block mt-auto text-xs text-gray-600 font-mono">
        © 2025 Efe AI
      </div>
    </div>
  );
};

export default Sidebar;
