import Link from "next/link";

const categories = [
  {
    name: "Prompt Library",
    href: "/prompts",
    icon: "💡",
    count: "500+ prompts",
    desc: "ChatGPT, Claude, Gemini prompts"
  },
  {
    name: "AI Tools",
    href: "/ai-tools",
    icon: "🤖",
    count: "8 tools",
    desc: "Generators & AI utilities"
  },
  {
    name: "PDF Tools",
    href: "/pdf-tools",
    icon: "📄",
    count: "8 tools",
    desc: "Merge, split, compress"
  },
  {
    name: "Image Tools",
    href: "/image-tools",
    icon: "🖼️",
    count: "9 tools",
    desc: "Edit, convert, enhance"
  },
  {
    name: "Developer Tools",
    href: "/dev-tools",
    icon: "💻",
    count: "15 tools",
    desc: "JSON, Base64, formatters"
  },
  {
    name: "Text Tools",
    href: "/text-tools",
    icon: "📝",
    count: "10 tools",
    desc: "Counters, converters"
  },
  {
    name: "Business Tools",
    href: "/business-tools",
    icon: "💼",
    count: "5 tools",
    desc: "Calculators & generators"
  },
  {
    name: "Finance Tools",
    href: "/finance-tools",
    icon: "💰",
    count: "9 tools",
    desc: "EMI, tax, ROI"
  },
  {
    name: "Utility Tools",
    href: "/utility-tools",
    icon: "🔧",
    count: "5 tools",
    desc: "Nepali tools & more"
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">ToolHub Nepal</h1>
          <p className="text-xl text-gray-600">70+ free online tools — no signup required</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h2 className="text-xl font-bold group-hover:text-blue-600">{cat.name}</h2>
              <p className="text-sm text-blue-600 font-medium mt-1">{cat.count}</p>
              <p className="text-gray-500 mt-2">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
