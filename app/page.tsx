import Link from "next/link"

const categories = [
  { icon: "💡", name: "Prompt Library", count: "500+ prompts", desc: "ChatGPT, Claude, Gemini prompts", soon: true },
  { icon: "🤖", name: "AI Tools", count: "8 tools", desc: "Generators & AI utilities", soon: true },
  { icon: "📄", name: "PDF Tools", count: "8 tools", desc: "Merge, split, compress", soon: true },
  { icon: "🖼️", name: "Image Tools", count: "9 tools", desc: "Edit, convert, enhance", soon: true },
  { icon: "💻", name: "Developer Tools", count: "22 tools", desc: "JSON, Base64, formatters", href: "/dev-tools" },
  { icon: "📝", name: "Text Tools", count: "16 tools", desc: "Grammar, paraphrase, summarize", href: "/text-tools" },
  { icon: "💼", name: "Business Tools", count: "17 tools", desc: "Name generator, invoices & more", href: "/business" },
  { icon: "💰", name: "Finance Tools", count: "16 tools", desc: "SIP, crypto, loans, EMI, ROI", href: "/finance" },
  { icon: "🔧", name: "Utility Tools", count: "15 tools", desc: "Nepali tools & more", href: "/utility" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Promptool<span className="text-blue-600">Hub</span></h1>
          <p className="text-xl text-gray-600">Free tools that work in your browser</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Card = (
              <div className={`bg-white p-6 rounded-2xl border hover:shadow-lg transition-all ${cat.soon ? 'opacity-60' : 'hover:border-blue-300'}`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{cat.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{cat.name}</h3>
                      {cat.soon && <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Soon</span>}
                    </div>
                    <p className="text-sm text-blue-600 font-medium mt-0.5">{cat.count}</p>
                    <p className="text-sm text-gray-600 mt-1">{cat.desc}</p>
                  </div>
                </div>
              </div>
            )
            return cat.href && !cat.soon ? (
              <Link key={cat.name} href={cat.href}>{Card}</Link>
            ) : (
              <div key={cat.name}>{Card}</div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

