export default function Home() {
  const categories = [
    { icon: "💡", name: "Prompt Library", count: "500+ prompts", desc: "ChatGPT, Claude, Gemini prompts", soon: true },
    { icon: "🤖", name: "AI Tools", count: "8 tools", desc: "Generators & AI utilities", soon: true },
    { icon: "📄", name: "PDF Tools", count: "8 tools", desc: "Merge, split, compress", soon: true },
    { icon: "🖼️", name: "Image Tools", count: "9 tools", desc: "Edit, convert, enhance", soon: true },
    { icon: "💻", name: "Developer Tools", count: "15 tools", desc: "JSON, Base64, formatters", soon: true },
    { icon: "📝", name: "Text Tools", count: "10 tools", desc: "Counters, converters", soon: true },
    { icon: "💼", name: "Business Tools", count: "5 tools", desc: "Calculators & generators", soon: true },
    { icon: "💰", name: "Finance Tools", count: "9 tools", desc: "EMI, tax, ROI", href: "/emi-calculator" },
    { icon: "🔧", name: "Utility Tools", count: "5 tools", desc: "Nepali tools & more", href: "/date-converter" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Promptoolhub</h1>
          <p className="text-xl text-gray-600">Prompt Library & Free Online Tools — no signup required</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => 
            cat.soon ? (
              <div key={cat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-75">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h2 className="font-semibold text-lg mb-1">{cat.name}</h2>
                <p className="text-sm text-blue-600 mb-2">{cat.count}</p>
                <p className="text-sm text-gray-600 mb-3">{cat.desc}</p>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Coming Soon</span>
              </div>
            ) : (
              <a key={cat.name} href={cat.href} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h2 className="font-semibold text-lg mb-1">{cat.name}</h2>
                <p className="text-sm text-blue-600 mb-2">{cat.count}</p>
                <p className="text-sm text-gray-600">{cat.desc}</p>
              </a>
            )
          )}
        </div>

        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>© 2026 Promptoolhub.com</p>
        </footer>
      </div>
    </main>
  );
}
