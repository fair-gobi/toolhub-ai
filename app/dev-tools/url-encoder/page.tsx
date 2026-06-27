'use client'
import { useState } from 'react'

export default function URLEncoder(){
  const [input,setInput]=useState('https://example.com?query=hello world')
  const [output,setOutput]=useState('')

  const encode=()=>setOutput(encodeURIComponent(input))
  const decode=()=>{try{setOutput(decodeURIComponent(input))}catch{setOutput('Invalid URL encoding')}}

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">URL Encoder/Decoder</h1>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-32 border-2 rounded-lg p-3 mb-3 font-mono"/>
      <div className="flex gap-2 mb-3">
        <button onClick={encode} className="bg-green-600 text-white px-6 py-2 rounded-lg">Encode</button>
        <button onClick={decode} className="bg-purple-600 text-white px-6 py-2 rounded-lg">Decode</button>
      </div>
      <textarea value={output} readOnly className="w-full h-32 border-2 rounded-lg p-3 bg-gray-50 font-mono"/>
    </main>
  )
}
