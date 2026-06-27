'use client'
import { useState } from 'react'

export default function JSONValidator() {
  const [input, setInput] = useState('{"valid": true}')
  const [result, setResult] = useState<{valid:boolean, error?:string, line?:number}>({valid:true})

  const validate = () => {
    try {
      JSON.parse(input)
      setResult({valid:true})
    } catch (e:any) {
      const match = e.message.match(/position (\d+)/)
      const pos = match? Number(match[1]) : 0
      const line = input.substring(0, pos).split('\n').length
      setResult({valid:false, error:e.message, line})
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">✓ JSON Validator</h1>
      <p className="text-gray-600 mb-6">Validate JSON syntax with error location</p>

      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-64 font-mono text-sm border-2 rounded-lg p-3 mb-3" />
      <button onClick={validate} className="bg-green-600 text-white px-6 py-2 rounded-lg mb-4">Validate</button>

      {result.valid? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          ✓ Valid JSON — {input.length} characters, {Object.keys(JSON.parse(input||'{}')).length} keys
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="font-bold text-red-800 mb-1">✗ Invalid JSON</div>
          <div className="text-sm text-red-700">Line {result.line}: {result.error}</div>
        </div>
      )}
    </main>
  )
}
