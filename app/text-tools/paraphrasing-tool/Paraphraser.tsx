'use client'
import { useState } from 'react'

export default function Paraphraser() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog')
  
  const para = text
    .replace(/quick/gi, 'fast')
    .replace(/jumps/gi, 'leaps')
    .replace(/lazy/gi, 'sleepy')
    .replace(/big/gi, 'large')
    .replace(/small/gi, 'tiny')

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔄 Paraphrasing Tool</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-40 border rounded p-3 mb-4" />
      <div className="bg-purple-50 border rounded p-4 min-h-40">{para}</div>
    </main>
  )
}

