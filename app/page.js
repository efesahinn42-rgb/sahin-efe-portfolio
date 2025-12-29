// app/page.js
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // relative: Bu kutu "Referans Noktası" olsun. İçindeki "absolute" elemanlar buna göre hizalansın.
    // h-screen: Yükseklik ekran boyu kadar olsun (böylece resim tam sığar).
    // overflow-hidden: Eğer resim taşarsa, taşan kısımları gizle (scrol çıkmasın).
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* --- KATMAN 1: ARKA PLAN RESMİ (En altta) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Ghost of Tsushima Background"
          fill // Resmi kutuya tam doldur
          className="object-cover opacity-40" // opacity-40: Resmi %60 kararttık ki yazılar okunsun.
          priority // Bu resim çok önemli, hemen yükle.
        />
        {/* İsteğe bağlı: Resmin üzerine siyah bir perde çekmek için gradient ekleyebiliriz */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* --- KATMAN 2: İÇERİK (Üstte) --- */}
      {/* z-10: Z-Index değeri. Sayı ne kadar büyükse o kadar öndedir. Resim z-0 idi. */}
      <div className="relative z-10 text-center px-4">
        {/* Karşılama Yazısı */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter text-white drop-shadow-2xl">
          ŞAHİN <span className="text-red-600">EFE</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
          Web Geliştirici &{" "}
          <span className="italic text-red-400">Code Ronin</span>
        </p>

        {/* Butonlar */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/projects"
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            PROJELERİM
          </Link>

          <Link
            href="/contact"
            className="border border-red-600 text-red-500 hover:bg-red-600/10 px-8 py-3 rounded-sm transition-all duration-300"
          >
            İLETİŞİM
          </Link>
        </div>
      </div>
    </div>
  );
}
