import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Text Tools - Grammar, Paraphrase, Summarize',
  description: '4 free AI-powered text tools for writers and students.',
}

const tools = [
  { icon: "✍️", name: "Grammar Checker", desc: "Fix grammar instantly", href: "/text-tools/grammar-checker", color: "from-blue-600 to-indigo-600" },
  { icon: "🔄", name: "Paraphrasing Tool", desc: "Rewrite in new words", href: "/text-tools/paraphrasing-tool", color: "from-purple-600 to-pink-600" },
  { icon: "📝", name: "Text Summarizer", desc: "Shorten long text", href: "/text-tools/text-summarizer", color: "from-green-600 to-teal-600" },
  { icon: "✂️", name: "Sentence Rewriter", desc: "Improve sentences", href: "/text-tools/sentence-rewriter", color: "from-orange-600 to-red-600" },
]

export default function TextToolsPage() {
  return (
    <main className="container mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Text Tools</h1>
        <p className="text-gray-600">AI-powered writing helpers</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map(tool => (
          <Link key={tool.name} href={tool.href} className={`bg-gradient-to-r ${tool.color} text-white p-6 rounded-xl hover:scale-105 transition`}>
            <div className="text-3xl mb-2">{tool.icon}</div>
            <h3 className="font-bold">{tool.name}</h3>
            <p className="text-sm opacity-90">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
