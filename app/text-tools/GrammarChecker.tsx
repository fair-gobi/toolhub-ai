'use client'
import { useState } from 'react'

export default function GrammarChecker(){
  const [text, setText] = useState('I has went to the store yesterday.')
  const [fixed, setFixed] = useState('')

  const check = () => {
    // Simple demo rules - replace with API later
    let out = text
      .replace(/\bI has\b/gi, 'I have')
      .replace(/\bhas went\b/gi, 'have gone')
      .replace(/\btheir is\b/gi, 'there is')
      .replace(/\byour welcome\b/gi, "you're welcome")
    setFixed(out)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">✍️ Grammar Checker</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-64 border rounded-lg p-3" placeholder="Paste text here..." />
          <button onClick={check} className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg">Check Grammar</button>
        </div>
        <div className="bg-gray-50 border rounded-lg p-3 h-64 overflow-auto whitespace-pre-wrap">{fixed || 'Corrected text appears here...'}</div>
      </div>
    </main>
  )
}
