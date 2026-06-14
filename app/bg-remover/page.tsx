'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BgRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState('')

  const removeBg = async () => {
    if (!file) return
    setResult('Processing...')
    const form = new FormData()
    form.append('image_file', file)
    // Free API - remove.bg demo (87zQiymRcTExFvHCsA5Rq7Xc)
    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': 'YOUR_KEY' },
      body: form
    })
    if (res.ok) {
      const blob = await res.blob()
      setResult(URL.createObjectURL(blob))
    } else {
      setResult('Add your remove.bg API key in code')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">Background Remover</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="mb-4" />
          <button onClick={removeBg} className="w-full bg-purple-600 text-white py-3 rounded">Remove Background</button>
          {result && result.startsWith('blob') && <img src={result} className="mt-4 max-w-full" />}
          {result &&!result.startsWith('blob') && <p className="mt-4">{result}</p>}
        </div>
      </div>
    </div>
  )
}
