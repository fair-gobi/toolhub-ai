'use client'
import { useState } from 'react'
import Link from 'next/link'

const templates = [
  '{brand} — {verb} your {noun}',
  'Think {adjective}. Think {brand}.',
  '{brand}: {benefit} made simple',
  'The {adjective} way to {verb}',
  '{verb} smarter with {brand}',
  '{brand} — where {noun} meets {noun2}',
]

const verbs = ['Elevate', 'Simplify', 'Power', 'Transform', 'Unlock', 'Build']
const nouns = ['business', 'ideas', 'future', 'growth', 'success', 'dreams']
const adjectives = ['smart', 'bold', 'simple', 'fast', 'modern', 'clear']
const benefits = ['Innovation', 'Results', 'Freedom', 'Clarity']

export default function SloganGenerator() {
  const [brand, setBrand] = useState('')
  const [slogans, setSlogans] = useState<string[]>([])

  const generate = () => {
    const b = brand || 'YourBrand'
    const results = templates.map(t => 
      t.replace('{brand}', b)
       .replace('{verb}', verbs[Math.floor(Math.random()*verbs.length)])
       .replace('{noun}', nouns[Math.floor(Math.random()*nouns.length)])
       .replace('{noun2}', nouns[Math.floor(Math.random()*nouns.length)])
       .replace('{adjective}', adjectives[Math.floor(Math.random()*adjectives.length)])
       .replace('{benefit}', benefits[Math.floor(Math.random()*benefits.length)])
    )
    setSlogans(results)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      {/* Back button like startup-ideas */}
      <Link href="/business" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-4">
        ← Back to Business Tools
      </Link>

      <div className="bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">✨</span>
          <div>
            <h1 className="text-3xl font-bold">Slogan Generator</h1>
            <p className="opacity-90">Create memorable taglines in seconds</p>
          </div>
        </div>
      </div>

      {/* rest of your code unchanged */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <label className="block text-sm font-medium mb-1">Brand Name</label>
        <input 
          type="text" 
          value={brand} 
          onChange={(e) => setBrand(e.target.value)} 
          placeholder="Enter your brand" 
          className="w-full border rounded-lg px-3 py-2 mb-4" 
        />
        <button onClick={generate} className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700">
          Generate Slogans
        </button>
      </div>

      {slogans.length > 0 && (
        <div className="grid gap-3">
          {slogans.map((s, i) => (
            <div key={i} className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">"{s}"</span>
              <button onClick={() => navigator.clipboard.writeText(s)} className="text-sm text-purple-600 hover:underline">Copy</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
