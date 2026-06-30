'use client'

import { useState } from 'react'

const syllables = ['zo', 'ka', 'mi', 'lu', 'vi', 'nex', 'ora', 'pix', 'zen', 'flux']
const endings = ['ly', 'ify', 'io', 'ora', 'ix', 'us', 'in', 'ai']

export default function BrandName() {
  const [keyword, setKeyword] = useState('')
  const [names, setNames] = useState<string[]>([])

  const generate = () => {
    const results = []
    for (let i = 0; i < 12; i++) {
      const s1 = syllables[Math.floor(Math.random() * syllables.length)]
      const s2 = syllables[Math.floor(Math.random() * syllables.length)]
      const end = endings[Math.floor(Math.random() * endings.length)]
      const variants = [
        s1 + s2 + end,
        keyword + s1,
        s1 + keyword + end,
        s1.charAt(0).toUpperCase() + s1.slice(1) + s2
      ]
      results.push(variants[i % 4].toLowerCase())
    }
    setNames(Array.from(new Set(results)))}


  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎯</span>
          <div>
            <h1 className="text-3xl font-bold">Brand Name Generator</h1>
            <p className="opacity-90">Short, brandable names like Google & Spotify</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl p-6 mb-6">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword (optional)"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />
        <button onClick={generate} className="w-full bg-teal-600 text-white rounded-lg py-3 font-medium hover:bg-teal-700">
          Generate Brand Names
        </button>
      </div>

      {names.length > 0 && (
        <div className="grid md:grid-cols-3 gap-3">
          {names.map((name, i) => (
            <div key={i} className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
              <span className="font-bold text-teal-800 capitalize">{name}</span>
              <button onClick={() => navigator.clipboard.writeText(name)} className="block w-full mt-2 text-xs text-teal-600">Copy</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
