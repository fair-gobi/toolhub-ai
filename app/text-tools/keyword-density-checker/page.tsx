'use client'
import { useState } from 'react'

export default function Density() {
  const [text, setText] = useState('free tools are the best free tools for everyone. Use free tools daily.')

  const words = text.toLowerCase().match(/\b\w+\b/g) || []
  const total = words.length
  const freq: any = {}
  words.forEach(w => { if(w.length>3) freq[w] = (freq[w]||0)+1 })

  const data = Object.entries(freq).map(([w,c]:any) => ({
    word: w,
    count: c,
    density: ((c/total)*100).toFixed(1)
  })).sort((a,b) => b.count - a.count).slice(0, 10)

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔍 Keyword Density Checker</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-40 border rounded p-3 mb-4" placeholder="Paste your article..." />
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-100 p-3 font-semibold text-sm">
          <div>Keyword</div><div>Count</div><div>Density</div>
        </div>
        {data.map((d,i) => (
          <div key={i} className="grid grid-cols-3 p-3 border-t text-sm">
            <div className="font-medium">{d.word}</div>
            <div>{d.count}</div>
            <div className={Number(d.density) > 3? 'text-red-600' : 'text-green-600'}>{d.density}%</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Total words: {total} | Ideal density: 1-2%</p>
    </main>
  )
}
