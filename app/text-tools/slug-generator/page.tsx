'use client'
import { useState } from 'react'

export default function SlugGen() {
  const [text, setText] = useState('Best Free Online Tools 2026!')

  const slug = text
   .toLowerCase()
   .replace(/[^\w\s-]/g, '')
   .replace(/\s+/g, '-')
   .replace(/-+/g, '-')
   .trim()

  const variants = [
    slug,
    slug.replace(/-/g, '_'),
    `${slug}-${new Date().getFullYear()}`,
    slug.slice(0, 50)
  ]

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔗 Slug Generator</h1>
      <input value={text} onChange={e=>setText(e.target.value)} className="w-full border rounded-lg p-4 text-lg mb-4" placeholder="Enter title..." />

      <div className="space-y-2">
        {variants.map((v,i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 border rounded">
            <code className="text-blue-600">{v}</code>
            <button onClick={()=>navigator.clipboard.writeText(v)} className="text-xs bg-gray-800 text-white px-2 py-1 rounded">Copy</button>
          </div>
        ))}
      </div>
    </main>
  )
}
