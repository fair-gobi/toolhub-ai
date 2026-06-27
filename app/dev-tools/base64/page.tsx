'use client'
import { useState } from 'react'

export default function Base64Tool(){
  const [input,setInput]=useState('Hello World')
  const [output,setOutput]=useState('')
  const [mode,setMode]=useState<'encode'|'decode'>('encode')

  const process=()=>{
    try {
      if (mode==='encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch { setOutput('Error: Invalid input') }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Base64 Encoder/Decoder</h1>
      <div className="flex gap-2 mb-3">
        <button onClick={()=>setMode('encode')} className={`px-4 py-2 rounded ${mode==='encode'?'bg-blue-600 text-white':'bg-gray-200'}`}>Encode</button>
        <button onClick={()=>setMode('decode')} className={`px-4 py-2 rounded ${mode==='decode'?'bg-blue-600 text-white':'bg-gray-200'}`}>Decode</button>
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 font-mono border-2 rounded-lg p-3 mb-3" placeholder="Enter text"/>
      <button onClick={process} className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-3">Convert</button>
      <textarea value={output} readOnly className="w-full h-40 font-mono border-2 rounded-lg p-3 bg-gray-50"/>
      <button onClick={()=>navigator.clipboard.writeText(output)} className="mt-2 text-sm border px-3 py-1 rounded">Copy</button>
    </main>
  )
}
