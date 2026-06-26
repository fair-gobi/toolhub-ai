'use client'
import { useState } from 'react'
export default function Summarizer(){
  const [text, setText] = useState('')
  const summary = text.split('.').slice(0,2).join('.') + (text.split('.').length>2?'.':'')

  return (<main className="container mx-auto p-6 max-w-4xl">
    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-6 mb-6"><h1 className="text-3xl font-bold">📝 Text Summarizer</h1></div>
    <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-48 border rounded-lg p-3" placeholder="Paste long article..." />
    <div className="mt-4 bg-green-50 border rounded-lg p-4"><strong>Summary:</strong><p className="mt-2">{summary || 'Summary appears here'}</p></div>
  </main>)
}
