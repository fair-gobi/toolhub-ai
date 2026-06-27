'use client'
import { useState } from 'react'

export default function HashGenerator(){
  const [input,setInput]=useState('hello')
  const [hashes,setHashes]=useState<any>({})

  const generate=async()=>{
    if (typeof window === 'undefined' ||!window.crypto?.subtle) return

    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    const results:any = {}
    for (const algo of ['SHA-1','SHA-256','SHA-384','SHA-512']) {
      const hash = await crypto.subtle.digest(algo, data)
      results[algo] = Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')
    }
    setHashes(results)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Hash Generator</h1>
      <input value={input} onChange={e=>setInput(e.target.value)} className="w-full border-2 rounded-lg p-3 mb-3 font-mono" placeholder="Enter text"/>
      <button onClick={generate} className="bg-gray-800 text-white px-6 py-2 rounded-lg mb-4">Generate Hashes</button>

      {Object.keys(hashes).length>0 && (
        <div className="space-y-2">
          {Object.entries(hashes).map(([algo,hash])=>(
            <div key={algo} className="border rounded p-3">
              <div className="text-xs font-semibold text-gray-600">{algo}</div>
              <div className="font-mono text-xs break-all">{hash as string}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
