'use client'
import { useState } from 'react'

export default function TitleGen() {
  const [topic, setTopic] = useState('free online tools')
  const [keywords, setKeywords] = useState('free, no signup, 2026')
  const [audience, setAudience] = useState('beginners')
  const [type, setType] = useState('seo')
  const [loading, setLoading] = useState(false)
  const [titles, setTitles] = useState<{title:string, score:number}[]>([])

  const generate = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))

    const kw = keywords.split(',').map(k=>k.trim())
    const main = kw[0] || topic

    const formulas: any = {
      seo: [
        `${topic} - ${main} | Free Online Tools 2026`,
        `Best ${topic} for ${audience} (${new Date().getFullYear()})`,
        `${main}: ${topic} That Actually Work`,
        `${topic} | No Signup Required`
      ],
      viral: [
        `I Tried ${topic} for 30 Days (Results Shocked Me)`,
        `Why ${audience} Are Obsessed With ${topic}`,
        `Stop Paying for ${topic} — Do This Instead`,
        `The ${topic} Secret Nobody Tells ${audience}`
      ],
      howto: [
        `How to Use ${topic} in 2026 (Complete Guide)`,
        `How ${audience} Master ${topic} in 10 Minutes`,
        `${topic} Tutorial: From Zero to Pro`
      ],
      list: [
        `${Math.floor(Math.random()*5)+7} Best ${topic} (${main})`,
        `15 ${topic} That Save Hours`,
        `Top ${topic} for ${audience} in 2026`
      ]
    }

    const generated = formulas[type].map((t:string) => ({
      title: t,
      score: Math.floor(Math.random()*20)+80 // SEO score 80-99
    }))

    setTitles(generated)
    setLoading(false)
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">✨ Title AI Generator</h1>
      </div>

      <div className="bg-white border rounded-xl p-5 mb-4 space-y-3">
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Main topic" className="w-full border rounded-lg p-3" />
        <input value={keywords} onChange={e=>setKeywords(e.target.value)} placeholder="Keywords (comma)" className="w-full border rounded-lg p-3" />
        <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Target audience" className="w-full border rounded-lg p-3" />
        <div className="flex gap-2 flex-wrap">
          {['seo','viral','howto','list'].map(t=>(
            <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-lg capitalize ${type===t?'bg-indigo-600 text-white':'bg-gray-100'}`}>{t}</button>
          ))}
        </div>
      </div>

      <button onClick={generate} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold mb-6">
        {loading? 'Crafting titles...' : 'Generate Titles'}
      </button>

      {loading && <div className="text-center"><div className="animate-pulse">Analyzing keywords...</div></div>}

      <div className="space-y-3">
        {titles.map((item,i)=>(
          <div key={i} className="border rounded-lg p-4 hover:shadow-md transition bg-gradient-to-r from-white to-indigo-50">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="font-medium text-lg">{item.title}</div>
                <div className="text-xs text-gray-500 mt-1">{item.title.length} chars • {type.toUpperCase()} • Score: {item.score}/100</div>
              </div>
              <button onClick={()=>navigator.clipboard.writeText(item.title)} className="bg-indigo-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">Copy</button>
            </div>
            <div className="mt-2 h-1.5 bg-gray-200 rounded">
              <div className="h-1.5 bg-green-500 rounded" style={{width: `${item.score}%`}}></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
