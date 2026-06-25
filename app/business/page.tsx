import Link from 'next/link'

export default function BusinessPage() {
  const tools = [
    { icon: "🏷️", name: "Business Name Generator", desc: "Generate catchy brand names", href: "/business/name-generator", live: true },
    { icon: "💡", name: "Startup Idea Generator", desc: "AI startup ideas", href: "/business/startup-idea", live: true },
    { icon: "✨", name: "Slogan Generator", desc: "Memorable taglines", href: "/business/slogan-generator", live: true },
    { icon: "🎯", name: "Brand Name Generator", desc: "Brandable names", href: "/business/brand-name", live: true },
    { icon: "🚀", name: "USP Generator", desc: "Unique selling propositions", href: "/business/usp-generator", live: true },
    { icon: "💵", name: "Invoice Generator", desc: "Create PDF invoices", href: "/business/invoice-generator", live: true },
    { icon: "📋", name: "Business Plan Generator", desc: "1-page plans instantly", href: "/business/business-plan-generator", live: true },
    { icon: "📝", name: "Quotation Generator", desc: "Create client quotes", href: "/business/quotation-generator", live: true },
    { icon: "💰", name: "Profit Calculator", desc: "Margins & profit", soon: true },
  ]

  const colors: Record<string, string> = {
    "Business Name Generator": "from-blue-600 to-blue-500",
    "Startup Idea Generator": "from-yellow-500 to-amber-500",
    "Slogan Generator": "from-purple-600 to-violet-500",
    "Brand Name Generator": "from-teal-600 to-cyan-500",
    "USP Generator": "from-orange-600 to-red-500",
    "Invoice Generator": "from-emerald-600 to-green-500",
    "Business Plan Generator": "from-indigo-600 to-blue-500",
    "Quotation Generator": "from-pink-600 to-rose-500",
 }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">💼 Business Tools</h1>
        <p className="text-gray-600">Free tools for startups and entrepreneurs</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-5">
        {tools.map(tool => tool.live ? (
          <Link key={tool.name} href={tool.href!} className="block group">
            <div className={`bg-gradient-to-r ${colors[tool.name]} text-white p-6 rounded-xl hover:shadow-lg transition h-full`}>
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h2 className="font-semibold text-lg">{tool.name}</h2>
              <p className="text-sm opacity-90">{tool.desc}</p>
            </div>
          </Link>
        ) : (
          <div key={tool.name} className="p-6 rounded-xl border-2 bg-gray-50 border-gray-200 opacity-60 h-full">
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h2 className="font-semibold text-lg mb-1">{tool.name}</h2>
            <p className="text-sm text-gray-600">{tool.desc}</p>
            <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
          </div>
        ))}
      </div>
    </main>
  )
}
