// app/about/page.js

export default function About() {
  return (
    <div className="max-w-4xl mx-auto text-gray-300">
      {/* BAŞLIK: Altı kırmızı çizgili */}
      <h1 className="text-4xl font-bold mb-6 border-b border-red-900/50 pb-4 text-white tracking-wide">
        Hakkımda
      </h1>

      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Merhaba! Ben <span className="text-red-500 font-bold">Şahin Efe</span>
          . Teknoloji dünyasında kendi yolunu çizen, disiplinli bir
          geliştiriciyim. Kod yazmayı sadece bir iş değil, bir{" "}
          <span className="italic text-red-400">zanaat</span> olarak görüyorum.
        </p>

        <p className="leading-relaxed">
          Python ile backend dünyasında başladığım yolculuğuma, şu an
          **Next.js** ve **React** mimarisiyle modern ön yüzler tasarlayarak
          devam ediyorum. Amacım; estetik, hızlı ve ruhu olan dijital eserler
          bırakmak.
        </p>

        {/* YETENEKLER KUTUSU */}
        {/* bg-gray-900 yerine bg-zinc-900 ve kırmızı kenarlık */}
        <div className="bg-zinc-900/50 border border-red-900/30 p-8 rounded-sm mt-8 relative overflow-hidden">
          {/* Süsleme: Sol tarafta ince kırmızı çizgi */}
          <div className="absolute top-0 left-0 w-1 h-full bg-red-700"></div>

          <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
            <span className="text-red-600">⚔️</span> Teknik Cephanelik
          </h3>

          <div className="flex flex-wrap gap-3">
            {/* Yetenek Etiketleri: Siyah zemin, kırmızı yazı, ince kırmızı çerçeve */}
            {[
              "JavaScript",
              "Next.js",
              "React",
              "Tailwind CSS",
              "Python",
              "Git & GitHub",
              "VS Code",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-black border border-red-900/40 text-red-400 px-4 py-2 rounded-sm text-sm hover:border-red-500 hover:text-red-300 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
