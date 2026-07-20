'use client'
import { useState } from 'react'

export default function MetaDesc() {
  const [text, setText] = useState('Learn how to build free online tools with Next.js and deploy to Vercel')
  const [keyword, setKeyword] = useState('free tools')

  const generate = () => {
    const base = text.slice(0, 120)
    return `${base} ${keyword? `| ${keyword}` : ''}`.slice(0, 155)
  }

  const desc = generate()
  const len = desc.length
  const color = len > 155? 'text-red-600' : len > 120? 'text-green-600' : 'text-orange-600'

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📄 Meta Description Generator</h1>
      <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Target keyword (optional)" className="w-full border rounded p-3 mb-3" />
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-32 border rounded p-3" placeholder="Paste page content or topic..." />
      <div className="mt-4 bg-gray-50 border rounded p-4">
        <div className="flex justify-between mb-2">
          <strong>Meta Description:</strong>
          <span className={color}>{len}/155</span>
        </div>
        <p className="text-gray-800">{desc}</p>
        <button onClick={()=>navigator.clipboard.writeText(desc)} className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded">Copy</button>
      </div>
    </main>
  )
}
