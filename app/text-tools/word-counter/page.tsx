'use client'
import { useState } from 'react'

export default function WordCounter() {
  const [text, setText] = useState('Paste your text here to count words, sentences, and paragraphs.')

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Word Counter</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-64 border rounded-lg p-4 text-base" placeholder="Start typing or paste text..." />
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
        {[
          { label: 'Words', value: words, color: 'bg-blue-100 text-blue-800' },
          { label: 'Characters', value: chars, color: 'bg-green-100 text-green-800' },
          { label: 'No spaces', value: charsNoSpace, color: 'bg-purple-100 text-purple-800' },
          { label: 'Sentences', value: sentences, color: 'bg-orange-100 text-orange-800' },
          { label: 'Paragraphs', value: paragraphs, color: 'bg-pink-100 text-pink-800' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} p-4 rounded-lg text-center`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
