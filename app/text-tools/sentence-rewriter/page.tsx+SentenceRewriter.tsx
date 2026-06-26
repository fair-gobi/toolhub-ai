'use client'
import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('This is very good')
  const versions = [
    text.replace('very good', 'excellent'),
    text.replace('very good', 'outstanding'),
    text.replace('very good', 'impressive'),
    text.replace('very', 'extremely'),
  ]

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">✂️ Sentence Rewriter</h1>
      <input value={text} onChange={e=>setText(e.target.value)} className="w-full border rounded p-3 mb-4" />
      <div className="space-y-2">
        {versions.map((v,i) => (
          <div key={i} className="p-3 bg-orange-50 border rounded flex justify-between">
            <span>{v}</span>
            <button onClick={()=>navigator.clipboard.writeText(v)} className="text-xs text-orange-600">Copy</button>
          </div>
        ))}
      </div>
    </main>
  )
}
