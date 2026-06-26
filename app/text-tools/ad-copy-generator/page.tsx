'use client'
import { useState } from 'react'

export default function AdCopy() {
  const [product, setProduct] = useState('free online tools')
  const [platform, setPlatform] = useState('facebook')

  const copies: any = {
    facebook: [
      `🚀 Stop paying for tools! Get ${product} FREE – no signup, no credit card. 10,000+ users already saving hours daily. Try now →`,
      `Tired of expensive subscriptions? ${product} are 100% free. Join the movement.`,
      `Last chance: ${product} that actually work. Free forever.`
    ],
    google: [
      `${product} - Free & Instant | No Signup Required`,
      `Best ${product} 2026 | Try Free Now`,
      `${product} Online | 100% Free Tools`
    ],
    linkedin: [
      `Professionals: Save 5 hours/week with ${product}. Used by teams at Google, Meta. Free access:`,
      `Boost productivity with ${product}. No learning curve. Start today.`
    ]
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📢 Ad Copy Generator</h1>

      <div className="flex gap-3 mb-6">
        <input value={product} onChange={e=>setProduct(e.target.value)} className="flex-1 border rounded-lg p-3" placeholder="Product/service..." />
        <select value={platform} onChange={e=>setPlatform(e.target.value)} className="border rounded-lg px-4">
          <option>facebook</option>
          <option>google</option>
          <option>linkedin</option>
        </select>
      </div>

      <div className="space-y-3">
        {copies[platform].map((copy: string, i: number) => (
          <div key={i} className="border rounded-lg p-4 bg-gradient-to-r from-pink-50 to-orange-50">
            <div className="flex justify-between items-start gap-3">
              <p className="flex-1">{copy}</p>
              <button onClick={()=>navigator.clipboard.writeText(copy)} className="text-xs bg-gray-900 text-white px-3 py-1 rounded whitespace-nowrap">Copy</button>
            </div>
            <div className="text-xs text-gray-500 mt-2">{copy.length} characters</div>
          </div>
        ))}
      </div>
    </main>
  )
}
