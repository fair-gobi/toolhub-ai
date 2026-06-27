'use client'
import { useState } from 'react'

export default function XMLValidator() {
  const [input, setInput] = useState('<note><to>User</to></note>')
  const [result, setResult] = useState('')

  const validate = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(input, 'text/xml')
    const error = doc.querySelector('parsererror')
    if (error) {
      setResult('✗ Invalid: ' + error.textContent?.split('\n')[0])
    } else {
      const elements = doc.getElementsByTagName('*').length
      setResult(`✓ Valid XML — ${elements} elements, well-formed`)
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">✓ XML Validator</h1>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-64 font-mono text-sm border-2 rounded-lg p-3 mb-3" />
      <button onClick={validate} className="bg-purple-600 text-white px-6 py-2 rounded-lg mb-4">Validate</button>
      {result && (
        <div className={`p-4 rounded-lg border ${result.startsWith('✓')?'bg-green-50 border-green-200 text-green-800':'bg-red-50 border-red-200 text-red-800'}`}>
          {result}
        </div>
      )}
    </main>
  )
}
