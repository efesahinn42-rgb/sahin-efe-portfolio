// components/Sidebar.jsx

import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const menuItems = [
    { name: "Anasayfa", path: "/" },
    { name: "Hakkımda", path: "/about" },
    { name: "Projelerim", path: "/projects" },
    { name: "İletişim", path: "/contact" },
  ];

  return (
    // DEĞİŞİKLİK 1: Ana Kutu
    // bg-gray-900 -> bg-black: Simsiyah bir zemin.
    // border-gray-800 -> border-red-900/30: Sağdaki çizgi artık silik bir kırmızı.
    <div className="fixed top-0 left-0 h-screen w-64 bg-black text-white border-r border-red-900/30 p-6 flex flex-col items-center z-50 shadow-2xl shadow-red-900/10">
      <div className="mb-8 text-center">
        {/* DEĞİŞİKLİK 2: Avatar Çerçevesi
            border-gray-700 -> border-red-800: Çerçeve koyu kırmızı oldu.
            shadow-[...]: Resmin etrafına hafif kırmızı bir "aura" (parlama) ekledik.
        */}
        <div className="w-32 h-32 relative mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-800 shadow-[0_0_20px_rgba(153,27,27,0.4)]">
          <Image
            src="/avatar.jpg"
            alt="Şahin Efe Profil Fotoğrafı"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* İsim Yazısı */}
        <h2 className="text-2xl font-bold tracking-wider">Şahin Efe</h2>
        <p className="text-sm text-red-500 font-light tracking-widest mt-1">
          CODE RONIN
        </p>
      </div>

      <nav className="w-full">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                // DEĞİŞİKLİK 3: Butonlar (Linkler)
                // hover:bg-gray-800 -> hover:bg-red-950: Üzerine gelince çok koyu kırmızı olsun.
                // hover:text-red-400: Yazı rengi parlasın.
                // border border-transparent ...: Kenarlıkları başta gizli, üzerine gelince kırmızı olsun.
                className="block py-3 px-4 rounded transition-all duration-300 text-center border border-transparent hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-400 hover:shadow-[0_0_10px_rgba(220,38,38,0.1)]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Alt Footer */}
      <div className="mt-auto text-xs text-gray-600 font-mono">
        © 2025 Efe AI Studios
      </div>
    </div>
  );
};

export default Sidebar;
