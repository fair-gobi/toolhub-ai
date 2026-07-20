'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function UspGenerator() {
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [benefit, setBenefit] = useState('')
  const [competitor, setCompetitor] = useState('')
  const [usps, setUsps] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!product || !audience) return
    setLoading(true)
    setUsps([])

    const prompt = `Create 8 unique selling propositions (USPs) for:
Product: ${product}
Target audience: ${audience}
Main benefit: ${benefit || 'save time/money'}
${competitor ? `Competitors: ${competitor}` : ''}

Rules:
- Max 15 words each
- Start with strong verb or "The only..."
- Focus on specific outcome, not features
- Make each USP different (speed, cost, ease, results, guarantee)
- No quotes, no numbers, one per line
- Format for Nepal/India market tone`

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    const results = data.text?.split('\n')
      .map((l: string) => l.replace(/^[\d\-\.\"]+/, '').trim())
      .filter((l: string) => l.length > 10) || []

    setUsps(results.slice(0, 8))
    setLoading(false)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <Link href="/business" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-4">
        ← Back to Business Tools
      </Link>

      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎯</span>
          <div>
            <h1 className="text-3xl font-bold">AI USP Generator</h1>
            <p className="opacity-90">Create unique selling propositions that convert</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product/Service *</label>
            <input value={product} onChange={e=>setProduct(e.target.value)} placeholder="e.g. CRM tool, coffee shop" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target Audience *</label>
            <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="e.g. freelancers, busy moms" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Main Benefit</label>
            <input value={benefit} onChange={e=>setBenefit(e.target.value)} placeholder="e.g. close deals 3x faster" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Competitor (optional)</label>
            <input value={competitor} onChange={e=>setCompetitor(e.target.value)} placeholder="e.g. HubSpot, local cafes" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        <button 
          onClick={generate} 
          disabled={loading || !product || !audience}
          className="w-full bg-orange-600 text-white rounded-lg py-3 font-medium hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate USPs'}
        </button>
      </div>

      {usps.length > 0 && (
        <div className="space-y-3">
          {usps.map((u, i) => (
            <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex justify-between items-start gap-4">
              <span className="font-medium text-orange-900 flex-1">{u}</span>
              <button onClick={()=>navigator.clipboard.writeText(u)} className="text-sm text-orange-600 hover:underline shrink-0">Copy</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
