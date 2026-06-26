'use client'
import { useState } from 'react'

export default function GrammarChecker() {
  const [text, setText] = useState('I has went to store yesterday. Their is many people.')
  const [result, setResult] = useState('')

  const check = () => {
    let fixed = text
      .replace(/\bI has\b/gi, 'I have')
      .replace(/\bhas went\b/gi, 'have gone')
      .replace(/\bTheir is\b/gi, 'There is')
      .replace(/\btheir is\b/gi, 'there is')
      .replace(/\byour welcome\b/gi, "you're welcome")
      .replace(/\bcould of\b/gi, 'could have')
    setResult(fixed)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">✍️ Grammar Checker</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-64 border rounded p-3" />
          <button onClick={check} className="mt-3 w-full bg-blue-600 text-white py-2 rounded">Check</button>
        </div>
        <div className="bg-gray-50 border rounded p-3 h-64 overflow-auto">{result || 'Fixed text appears here'}</div>
      </div>
    </main>
  )
}
