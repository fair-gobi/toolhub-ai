import Link from 'next/link'

export const metadata = { title: 'Text Tools - Promptoolhub' }

const tools = [
  { name: 'Grammar Checker', href: '/text-tools/grammar-checker', icon: '✍️', color: 'from-blue-600 to-indigo-600', desc: 'Fix grammar mistakes' },
  { name: 'Paraphrasing Tool', href: '/text-tools/paraphrasing-tool', icon: '🔄', color: 'from-purple-600 to-pink-600', desc: 'Rewrite in new words' },
  { name: 'Text Summarizer', href: '/text-tools/text-summarizer', icon: '📝', color: 'from-green-600 to-teal-600', desc: 'Shorten long articles' },
  { name: 'Meta Description', href: '/text-tools/meta-description-generator', icon: '📄', color: 'from-slate-600 to-gray-700', desc: '155-char SEO snippet' },
  { name: 'Keyword Density', href: '/text-tools/keyword-density-checker', icon: '🔍', color: 'from-amber-600 to-orange-600', desc: 'Check keyword %' },
  { name: 'Slug Generator', href: '/text-tools/slug-generator', icon: '🔗', color: 'from-cyan-600 to-blue-600', desc: 'URL-friendly slugs' },
  { name: 'Title Generator', href: '/text-tools/title-generator', icon: '✨', color: 'from-indigo-600 to-violet-600', desc: 'Catchy headlines' },
  { name: 'Word Counter', href: '/text-tools/word-counter', icon: '📊', color: 'from-blue-500 to-cyan-500', desc: 'Count words & chars' },
  { name: 'Character Counter', href: '/text-tools/character-counter', icon: '🔤', color: 'from-violet-500 to-purple-500', desc: 'Tweet & meta limits' },
  { name: 'Reading Time', href: '/text-tools/reading-time-calculator', icon: '⏱️', color: 'from-teal-500 to-emerald-500', desc: 'Calculate read time' },
  { name: 'Case Converter', href: '/text-tools/case-converter', icon: '🔄', color: 'from-rose-500 to-pink-500', desc: 'UPPER lower Title' },
  { name: 'Blog Generator', href: '/text-tools/blog-generator', icon: '✍️', color: 'from-indigo-600 to-blue-600', desc: 'AI blog drafts' },
  { name: 'Email Writer', href: '/text-tools/email-writer', icon: '📧', color: 'from-sky-600 to-cyan-600', desc: 'Cold & follow-ups' },
  { name: 'Ad Copy', href: '/text-tools/ad-copy-generator', icon: '📢', color: 'from-pink-600 to-rose-600', desc: 'FB, Google, LinkedIn' },
  { name: 'LinkedIn Post', href: '/text-tools/linkedin-post-generator', icon: '💼', color: 'from-blue-700 to-indigo-700', desc: 'Viral post templates' },
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
