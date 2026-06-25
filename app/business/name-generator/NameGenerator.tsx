'use client'

import { useState } from 'react'

const industries = ['Tech', 'Fashion', 'Food', 'Health', 'Finance', 'Education']
const styles = ['Modern', 'Classic', 'Playful', 'Professional']

export default function NameGenerator() {
  const [industry, setIndustry] = useState('Tech')
  const [style, setStyle] = useState('Modern')
  const [keyword, setKeyword] = useState('')
  const [names, setNames] = useState<string[]>([])

  const generate = () => {
    const prefixes = ['Neo', 'Apex', 'Zen', 'Nova', 'Core', 'Flux']
    const suffixes = ['ify', 'ly', 'io', 'hub', 'lab', 'works']
    const results = []
    
    for (let i = 0; i < 12; i++) {
      const pre = prefixes[Math.floor(Math.random() * prefixes.length)]
      const suf = suffixes[Math.floor(Math.random() * suffixes.length)]
      const base = keyword || industry
      results.push(`${pre}${base}${suf}`)
    }
    setNames(results)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🏷️</span>
          <div>
            <h1 className="text-3xl font-bold">Business Name Generator</h1>
            <p className="opacity-90">Generate catchy, brandable business names instantly</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {industries.map(ind => <option key={ind}>{ind}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {styles.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword (optional)" className="w-full border rounded-lg px-3 py-2 mb-4" />
        <button onClick={generate} className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700">
          Generate Names
        </button>
      </div>

      {names.length > 0 && (
        <div className="grid md:grid-cols-2 gap-3">
          {names.map((name, i) => (
            <div key={i} className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">{name}</span>
              <button onClick={() => navigator.clipboard.writeText(name)} className="text-sm text-blue-600 hover:underline">
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
