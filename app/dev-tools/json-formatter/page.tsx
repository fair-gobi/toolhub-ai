'use client'
import { useState } from 'react'

export default function JSONFormatter() {
  const [input, setInput] = useState('{"name":"Promptoolhub","tools":16,"free":true}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj, null, indent))
      setError('')
    } catch (e:any) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj))
      setError('')
    } catch (e:any) { setError(e.message) }
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{} JSON Formatter</h1>
      <p className="text-gray-600 mb-6">Pretty-print and minify JSON instantly</p>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium">Input</label>
            <select value={indent} onChange={e=>setIndent(Number(e.target.value))} className="text-sm border rounded px-2 py-1">
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>Tab</option>
            </select>
          </div>
          <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3" />
          <div className="flex gap-2 mt-2">
            <button onClick={format} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Format</button>
            <button onClick={minify} className="border px-4 py-2 rounded-lg">Minify</button>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium">Output</label>
            <button onClick={()=>navigator.clipboard.writeText(output)} className="text-sm bg-gray-900 text-white px-3 py-1 rounded">Copy</button>
          </div>
          <textarea value={error || output} readOnly className={`w-full h-96 font-mono text-sm border-2 rounded-lg p-3 ${error?'bg-red-50 text-red-700':'bg-gray-50'}`} />
          {error && <p className="text-red-600 text-sm mt-1">Error: {error}</p>}
        </div>
      </div>
    </main>
  )
}
