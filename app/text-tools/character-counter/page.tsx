'use client'
import { useState } from 'react'

export default function CharCounter() {
  const [text, setText] = useState('')

  const limits = [
    { name: 'Tweet', max: 280 },
    { name: 'Meta Title', max: 60 },
    { name: 'Meta Desc', max: 155 },
    { name: 'SMS', max: 160 },
  ]

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔤 Character Counter</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-40 border rounded-lg p-3 mb-4" placeholder="Type here..." />
      
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-indigo-600">{text.length}</div>
        <div className="text-gray-600">characters</div>
      </div>

      <div className="space-y-2">
        {limits.map(l => {
          const pct = Math.min(100, (text.length / l.max) * 100)
          const over = text.length > l.max
          return (
            <div key={l.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{l.name} ({l.max})</span>
                <span className={over ? 'text-red-600' : 'text-green-600'}>{text.length}/{l.max}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className={`h-2 rounded ${over ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${pct}%`}} />
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
