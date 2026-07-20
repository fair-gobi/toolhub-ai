'use client'
import { useState } from 'react'

export default function CaseConverter() {
  const [text, setText] = useState('hello world from promptoolhub')

  const cases = {
    'UPPERCASE': text.toUpperCase(),
    'lowercase': text.toLowerCase(),
    'Title Case': text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
    'Sentence case': text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    'camelCase': text.replace(/(?:^\w|[A-Z]|\b\w)/g, (w,i) => i===0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''),
    'snake_case': text.toLowerCase().replace(/\s+/g, '_'),
    'kebab-case': text.toLowerCase().replace(/\s+/g, '-'),
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔄 Case Converter</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-24 border rounded-lg p-3 mb-4" placeholder="Enter text..." />

      <div className="grid md:grid-cols-2 gap-3">
        {Object.entries(cases).map(([name, value]) => (
          <div key={name} className="border rounded-lg p-3 bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-500 uppercase">{name}</span>
              <button onClick={()=>navigator.clipboard.writeText(value)} className="text-xs text-blue-600">Copy</button>
            </div>
            <div className="font-mono text-sm break-all">{value}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
