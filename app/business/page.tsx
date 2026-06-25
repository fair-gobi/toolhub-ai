import Link from 'next/link'

export default function BusinessPage() {
  const tools = [
    { name: "Business Name Generator", desc: "Generate catchy brand names", href: "/business/name-generator", live: true },
    { name: "Startup Idea Generator", desc: "AI startup ideas", soon: true },
    { name: "Slogan Generator", desc: "Memorable taglines", soon: true },
    // add others as you build them
  ]

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Business Tools</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {tools.map(tool => tool.live ? (
          <Link key={tool.name} href={tool.href!} className="block bg-white p-5 rounded-xl border hover:shadow-md">
            <h2 className="font-semibold">{tool.name}</h2>
            <p className="text-sm text-gray-600">{tool.desc}</p>
          </Link>
        ) : (
          <div key={tool.name} className="bg-gray-50 p-5 rounded-xl border opacity-60">
            <h2 className="font-semibold">{tool.name}</h2>
            <p className="text-sm text-gray-600">{tool.desc} — Soon</p>
          </div>
        ))}
      </div>
    </main>
  )
}
