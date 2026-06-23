import Link from 'next/link'

const tools = [
  { slug: 'sip-calculator', name: 'SIP Calculator', desc: 'Monthly SIP returns' },
  { slug: 'compound-interest', name: 'Compound Interest', desc: 'P(1+r)^t calculator' },
  { slug: 'retirement', name: 'Retirement Calculator', desc: 'Corpus needed' },
  { slug: 'investment-return', name: 'Investment Return', desc: 'CAGR & absolute return' },
  { slug: 'fire', name: 'FIRE Calculator', desc: 'Financial independence age' },
  { slug: 'savings-goal', name: 'Savings Goal', desc: 'How much to save monthly' },
]

export default function Finance() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Finance Tools</h1>
        <p className="text-gray-600 mb-8">Worldwide currencies • Works offline</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => (
            <Link key={t.slug} href={`/finance/${t.slug}`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition">
              <h3 className="font-semibold mb-1">{t.name}</h3>
              <p className="text-sm text-gray-600">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}