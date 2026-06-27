'use client'
import { useState } from 'react'

export default function AdCopyGen() {
  const [title, setTitle] = useState('Promptoolhub')
  const [keywords, setKeywords] = useState('free tools, online tools, no signup')
  const [description, setDescription] = useState('16 free tools for business, text, and productivity. No signup required, works instantly in your browser.')
  const [audience, setAudience] = useState('small business owners')
  const [cta, setCta] = useState('Try Free Now')
  const [platform, setPlatform] = useState('facebook')
  const [loading, setLoading] = useState(false)
  const [copies, setCopies] = useState<string[]>([])

  const generate = async () => {
    setLoading(true)
    setCopies([])

    // Simulate AI processing
    await new Promise(r => setTimeout(r, 1500))

    const kw = keywords.split(',').map(k => k.trim()).filter(Boolean)
    const mainKw = kw[0] || title
    const benefit = description.split('.')[0]

    const generators: any = {
      facebook: [
        `🚀 ${audience} — tired of paying for ${mainKw}?\n\n${title} gives you ${benefit.toLowerCase()}. ${kw[1]? `Perfect for ${kw[1]}.` : ''}\n\n✅ No signup\n✅ 100% free\n✅ Works instantly\n\n👉 ${cta}`,
        `Stop wasting money. ${title} is the #1 free alternative for ${mainKw}.\n\n${description}\n\nJoin 10,000+ ${audience} → ${cta}`,
        `${audience} love this: ${benefit}.\n\n${title} makes it free. No credit card, no BS.\n\n${cta} today.`
      ],
      google: [
        `${title} - ${mainKw} | Free`,
        `Best ${mainKw} 2026`,
        `${title}: ${kw[1] || 'Online'} Free`
      ].map(h => `${h.slice(0,30)}\n${description.slice(0,88)} ${cta}`),

      linkedin: [
        `${audience}: ${benefit}.\n\nAt ${title}, we've built a solution that saves 5+ hours/week.\n\n${description}\n\n${cta} — no demo needed.`,
        `Why I built ${title}:\n\n${audience} were overpaying for ${mainKw}. So we made it free.\n\n${kw.join(' • ')}\n\n${cta}`
      ],

      instagram: [
        `POV: you found free ${mainKw} ✨\n\n${title} → ${benefit.toLowerCase()}\n\n${cta} 👇\n\n#${mainKw.replace(/\s/g,'')} #freetools #${audience.split(' ')[0]}`,
        `This changed everything for ${audience} ↓\n\n${title}\n${description.slice(0,60)}...\n\nLink in bio`
      ],

      tiktok: [
        `I stopped paying for ${mainKw} after finding this...`,
        `${audience} need to see this free tool`,
        `POV: ${benefit.toLowerCase()} for $0`
      ].map(h => `${h}\n\n${title} - ${cta}\n#${kw[0]?.replace(/\s/g,'')}`)
    }

    setCopies(generators[platform] || generators.facebook)
    setLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">📢 AI Ad Copy Generator</h1>
        <p className="opacity-90">Real-time generation from your inputs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6 bg-white border rounded-xl p-5">
        <div>
          <label className="text-sm font-medium">Product / Title *</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded-lg p-3 mt-1" placeholder="Promptoolhub" />
        </div>
        <div>
          <label className="text-sm font-medium">Target Audience</label>
          <input value={audience} onChange={e=>setAudience(e.target.value)} className="w-full border rounded-lg p-3 mt-1" placeholder="small business owners" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Keywords (comma separated) *</label>
          <input value={keywords} onChange={e=>setKeywords(e.target.value)} className="w-full border rounded-lg p-3 mt-1" placeholder="free tools, online tools, no signup" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Description *</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="w-full border rounded-lg p-3 mt-1" placeholder="What does it do? Main benefit?" />
        </div>
        <div>
          <label className="text-sm font-medium">Call to Action</label>
          <input value={cta} onChange={e=>setCta(e.target.value)} className="w-full border rounded-lg p-3 mt-1" placeholder="Try Free Now" />
        </div>
        <div>
          <label className="text-sm font-medium">Platform</label>
          <select value={platform} onChange={e=>setPlatform(e.target.value)} className="w-full border rounded-lg p-3 mt-1">
            <option value="facebook">Facebook</option>
            <option value="google">Google Ads</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        disabled={loading ||!title ||!keywords}
        className="w-full bg-gradient-to-r from-pink-600 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 mb-6"
      >
        {loading? '⏳ Generating copies...' : '✨ Generate Ad Copies'}
      </button>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
          <p className="mt-3 text-gray-600">Analyzing keywords and building variations...</p>
        </div>
      )}

      <div className="space-y-4">
        {copies.map((copy, i) => {
          const chars = copy.length
          const limit = platform==='google'? 90 : platform==='linkedin'? 150 : 125
          const over = chars > limit

          return (
            <div key={i} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-pink-300 transition">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-pink-600 uppercase">Variation {i+1}</span>
                <span className={`text-xs px-2 py-1 rounded ${over?'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>
                  {chars} chars
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{copy}</pre>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>navigator.clipboard.writeText(copy)} className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg">Copy</button>
                <button onClick={()=>{const newCopies=[...copies]; newCopies[i]=copy+' 🚀'; setCopies(newCopies)}} className="text-sm border px-3 py-1.5 rounded-lg">Add Emoji</button>
              </div>
            </div>
          )
        })}
      </div>

      {copies.length > 0 &&!loading && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Generated from: "{title}" + {keywords.split(',').length} keywords • Platform: {platform}
        </div>
      )}
    </main>
  )
}
