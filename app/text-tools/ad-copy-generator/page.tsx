'use client'
import { useState } from 'react'

export default function AdCopy() {
  const [product, setProduct] = useState('Promptoolhub')
  const [benefit, setBenefit] = useState('free online tools')
  const [audience, setAudience] = useState('small business owners')
  const [platform, setPlatform] = useState('facebook')
  const [sender, setSender] = useState('Gobinda')
  const [cta, setCta] = useState('Try Free')

  const generate = () => {
    const copies: any = {
      facebook: [
        `🚀 ${audience} – stop paying for ${product}!\n\nGet ${benefit} in 30 seconds. No signup, no credit card.\n\n👉 ${cta} today\n– ${sender}`,
        `Tired of complicated tools?\n${product} gives you ${benefit} — free forever.\n\nJoin 1,000+ ${audience} already using it.\n${cta} →`,
      ],
      google: [
        `${product} – ${benefit} | Free & Instant\nNo signup required. Start now.`,
        `Best ${benefit} for ${audience}. ${cta} in one click.`,
      ],
      linkedin: [
        `As ${audience}, time is money.\n\n${product} helps you get ${benefit} without the learning curve.\n\n${cta} – ${sender}`,
      ]
    }
    return copies[platform] || copies.facebook
  }

  const ads = generate()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📢 Ad Copy Generator</h1>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <input value={product} onChange={e=>setProduct(e.target.value)} placeholder="Product/Service" className="border rounded p-2" />
        <input value={benefit} onChange={e=>setBenefit(e.target.value)} placeholder="Main benefit" className="border rounded p-2" />
        <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Target audience" className="border rounded p-2" />
        <input value={sender} onChange={e=>setSender(e.target.value)} placeholder="Sender name" className="border rounded p-2" />
        <select value={platform} onChange={e=>setPlatform(e.target.value)} className="border rounded p-2">
          <option value="facebook">Facebook</option>
          <option value="google">Google Ads</option>
          <option value="linkedin">LinkedIn</option>
        </select>
        <input value={cta} onChange={e=>setCta(e.target.value)} placeholder="CTA (Try Free)" className="border rounded p-2" />
      </div>

      <div className="space-y-4">
        {ads.map((ad:string, i:number) => (
          <div key={i} className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <pre className="whitespace-pre-wrap font-sans text-sm">{ad}</pre>
            <button onClick={()=>navigator.clipboard.writeText(ad)} className="mt-2 text-xs bg-yellow-600 text-white px-2 py-1 rounded">Copy</button>
          </div>
        ))}
      </div>
    </main>
  )
}
