import Link from 'next/link'

export const metadata = { title: 'Text Tools - Promptoolhub' }

const tools = [
  { name: 'Grammar Checker', href: '/text-tools/grammar-checker', icon: '✍️', color: 'from-blue-600 to-indigo-600', desc: 'Fix grammar mistakes' },
  { name: 'Paraphrasing Tool', href: '/text-tools/paraphrasing-tool', icon: '🔄', color: 'from-purple-600 to-pink-600', desc: 'Rewrite in new words' },
  { name: 'Text Summarizer', href: '/text-tools/text-summarizer', icon: '📝', color: 'from-green-600 to-teal-600', desc: 'Shorten long articles' },
  { name: 'Sentence Rewriter', href: '/text-tools/sentence-rewriter', icon: '✂️', color: 'from-orange-600 to-red-600', desc: 'Improve sentences' },
]

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">📝 Text Tools</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map(t => (
          <Link key={t.name} href={t.href} className={`bg-gradient-to-r ${t.color} text-white p-6 rounded-xl hover:scale-105 transition`}>
            <div className="text-3xl mb-2">{t.icon}</div>
            <h3 className="font-bold">{t.name}</h3>
            <p className="text-sm opacity-90">{t.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
