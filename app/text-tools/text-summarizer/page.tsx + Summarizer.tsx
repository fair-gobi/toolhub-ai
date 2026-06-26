'use client'
import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')
  const sentences = text.split('.').filter(s => s.trim())
  const summary = sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '.' : '')

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Text Summarizer</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste long article..." className="w-full h-48 border rounded p-3" />
      <div className="mt-4 bg-green-50 border rounded p-4">
        <strong>Summary ({sentences.length} → {summary.split('.').filter(s=>s.trim()).length} sentences):</strong>
        <p className="mt-2">{summary || 'Paste text above'}</p>
      </div>
    </main>
  )
}
