'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function GrammarChecker() {
  const [text, setText] = useState('I has went to store yesterday. Their is many people.')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [changes, setChanges] = useState<string[]>([])

  const check = async () => {
    if (!text.trim()) return
    setLoading(true)
    setResult('')
    setChanges([])

    const prompt = `Correct the grammar, spelling, and punctuation of this text. Keep the original meaning and tone. Return ONLY the corrected text first, then on a new line "---", then list the changes made as bullet points.

Text: "${text}"`

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    const output = data.text || ''

    // Split corrected text and changes
    const parts = output.split('---')
    setResult(parts[0]?.trim() || output)
    if (parts[1]) {
     setChanges(parts[1].split('\n').filter((l: string) => l.trim()))
    }
    setLoading(false)
  }

  const copy = () => navigator.clipboard.writeText(result)

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <Link href="/text-tools" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-4">
        ← Back to Text Tools
      </Link>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">✍</span>
          <div>
            <h1 className="text-3xl font-bold">AI Grammar Checker</h1>
            <p className="opacity-90">Fix grammar, spelling & punctuation instantly</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-5">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Your Text</label>
            <span className="text-xs text-gray-500">{text.length} chars</span>
          </div>
          <textarea
            value={text}
            onChange={e=>setText(e.target.value)}
            className="w-full h-72 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Paste your text here..."
          />
          <button
            onClick={check}
            disabled={loading ||!text.trim()}
            className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading? 'Checking...' : 'Check Grammar'}
          </button>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Corrected</label>
            {result && <button onClick={copy} className="text-xs text-blue-600 hover:underline">Copy</button>}
          </div>
          <div className="h-72 border rounded-lg p-3 bg-gray-50 overflow-auto whitespace-pre-wrap">
            {result || 'Corrected text will appear here...'}
          </div>
          {changes.length > 0 && (
            <div className="mt-3 text-xs text-gray-600">
              <p className="font-medium mb-1">Changes made:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {changes.slice(0,5).map((c,i)=><li key={i}>{c.replace(/^[-•]\s*/,'')}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
