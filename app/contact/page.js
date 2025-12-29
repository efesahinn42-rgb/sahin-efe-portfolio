// app/contact/page.js
import Link from "next/link";

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 border-b border-red-900/50 pb-4 text-white tracking-wide">
        İletişim
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* SOL TARAF */}
        <div className="space-y-8">
          <p className="text-gray-300 text-lg font-light">
            Bir projeniz mi var? Yoksa sadece kodlar ve tasarım üzerine konuşmak
            mı istersiniz? Aşağıdaki kanallardan bana ulaşabilirsiniz.
          </p>

          <div className="space-y-4">
            {/* İletişim Kartı Şablonu */}
            {[
              {
                icon: "📞",
                title: "Telefon",
                val: "0533 076 94 71",
                href: "tel:+905330769471",
              },
              {
                icon: "📸",
                title: "Instagram",
                val: "@efeaistudios",
                href: "https://instagram.com/efeaistudios",
              },
              {
                icon: "✉️",
                title: "E-Posta",
                val: "iletisim@sahinefe.com",
                href: "mailto:iletisim@sahinefe.com",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center space-x-4 bg-zinc-900/40 p-5 border border-red-900/20 hover:border-red-800 transition-colors rounded-sm"
              >
                <span className="text-2xl grayscale hover:grayscale-0 transition-all">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-xs text-red-500 uppercase tracking-widest mb-1">
                    {item.title}
                  </h3>
                  <Link
                    href={item.href}
                    target="_blank"
                    className="text-white hover:text-red-400 transition-colors font-medium text-lg"
                  >
                    {item.val}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ TARAF: FORM */}
        <form className="bg-zinc-900/30 p-8 border border-red-900/20 rounded-sm space-y-6">
          <h2 className="text-2xl font-bold text-white mb-2">Mesaj Gönder</h2>

          <div className="space-y-4">
            {/* Input alanı */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">Adınız</label>
              <input
                type="text"
                className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900 transition-all placeholder-gray-700"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                E-Posta
              </label>
              <input
                type="email"
                className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900 transition-all placeholder-gray-700"
                placeholder="mail@adresiniz.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Mesajınız
              </label>
              <textarea
                rows="4"
                className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900 transition-all placeholder-gray-700"
                placeholder="Projenizden bahsedin..."
              ></textarea>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-red-800 hover:bg-red-700 text-white font-bold py-4 rounded-sm transition-all duration-300 tracking-wider shadow-[0_0_15px_rgba(153,27,27,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
          >
            GÖNDER
          </button>
        </form>
      </div>
    </div>
  );
}
