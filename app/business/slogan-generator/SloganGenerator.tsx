'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SloganGenerator() {
  const [brand, setBrand] = useState('')
  const [industry, setIndustry] = useState('')
  const [tone, setTone] = useState('catchy')
  const [slogans, setSlogans] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!brand) return
    setLoading(true)
    setSlogans([])
    
    const prompt = `Generate 10 ${tone} slogans/taglines for brand "${brand}"${industry ? ` in ${industry} industry` : ''}. 
    Requirements:
    - Max 7 words each
    - Memorable and punchy
    - No quotes, no numbers, one per line
    - Mix of styles: benefit-driven, emotional, and clever`

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
    
    const data = await res.json()
    const results = data.text?.split('\n')
      .map((l: string) => l.replace(/^[\d\-\.\"]+/, '').trim())
      .filter(Boolean) || []
    
    setSlogans(results.slice(0, 10))
    setLoading(false)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <Link href="/business" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-4">
        ← Back to Business Tools
      </Link>

      <div className="bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">✨</span>
          <div>
            <h1 className="text-3xl font-bold">AI Slogan Generator</h1>
            <p className="opacity-90">Powered by Groq — create memorable taglines</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand Name *</label>
            <input 
              type="text" 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)} 
              placeholder="e.g., Himalaya Brew" 
              className="w-full border rounded-lg px-3 py-2" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Industry (optional)</label>
            <input 
              type="text" 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)} 
              placeholder="e.g., coffee, tech" 
              className="w-full border rounded-lg px-3 py-2" 
            />
          </div>
        </div>
        
        <label className="block text-sm font-medium mb-1">Tone</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4">
          <option value="catchy">Catchy</option>
          <option value="professional">Professional</option>
          <option value="playful">Playful</option>
          <option value="luxury">Luxury</option>
          <option value="bold">Bold</option>
        </select>

        <button 
          onClick={generate} 
          disabled={loading || !brand}
          className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Slogans'}
        </button>
      </div>

      {slogans.length > 0 && (
        <div className="grid gap-3">
          {slogans.map((s, i) => (
            <div key={i} className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center hover:bg-gray-100">
              <span className="font-medium">{s}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(s)} 
                className="text-sm text-purple-600 hover:underline ml-4 shrink-0"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
