'use client'
import { useState } from 'react'

export default function Paraphraser(){
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.')
  const [mode, setMode] = useState('simple')
  
  const paraphrase = () => {
    const synonyms: any = { quick:'fast', brown:'dark', jumps:'leaps', lazy:'sleepy', over:'above' }
    return text.split(' ').map(w => synonyms[w.toLowerCase()] || w).join(' ')
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">🔄 Paraphrasing Tool</h1>
      </div>
      <select value={mode} onChange={e=>setMode(e.target.value)} className="border rounded px-3 py-2 mb-3">
        <option value="simple">Simple</option>
        <option value="formal">Formal</option>
        <option value="creative">Creative</option>
      </select>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-40 border rounded-lg p-3 mb-3" />
      <div className="bg-purple-50 border rounded-lg p-4 min-h-40">{paraphrase()}</div>
    </main>
  )
}
