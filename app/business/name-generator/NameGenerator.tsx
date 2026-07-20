'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function NameGenerator() {
  const [keyword, setKeyword] = useState('')
  const [industry, setIndustry] = useState('tech')
  const [names, setNames] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!keyword.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'business-name',
          keyword,
          industry
        })
      })
      const data = await res.json()
      setNames(data.results || [])
    } catch (err) {
      setNames(['Error generating names'])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Business Name Generator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">AI-powered names for your Nepali business</p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., coffee, tech, momo"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded mb-3 dark:bg-gray-700 dark:text-white"
          />

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded mb-4 dark:bg-gray-700 dark:text-white"
          >
            <option value="tech">Tech / Startup</option>
            <option value="cafe">Cafe / Restaurant</option>
            <option value="clothing">Clothing / Fashion</option>
            <option value="education">Education</option>
            <option value="local">Local Nepali Business</option>
          </select>

          <button
            onClick={generate}
            disabled={loading ||!keyword.trim()}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {loading? 'Generating...' : '✨ Generate with Groq AI'}
          </button>
        </div>

        {names.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">Generated Names:</h2>
            {names.map((name, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">
                  {name.replace(/^\d+[\.\)]\s*/, '').replace(/^[-•]\s*/, '')}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(name)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
