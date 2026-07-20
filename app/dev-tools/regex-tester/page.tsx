'use client'
import { useState } from 'react'

export default function RegexTester(){
  const [pattern,setPattern]=useState('\\d+')
  const [flags,setFlags]=useState('g')
  const [text,setText]=useState('Order 123 and 456')
  const [matches,setMatches]=useState<string[]>([])

  const test=()=>{
    try {
      const re = new RegExp(pattern, flags)
      const results = [...text.matchAll(re)].map(m=>m[0])
      setMatches(results)
    } catch (e:any) {
      setMatches(['Error: '+e.message])
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Regex Tester</h1>
      <div className="flex gap-2 mb-3">
        <input value={pattern} onChange={e=>setPattern(e.target.value)} className="flex-1 font-mono border-2 rounded p-2" placeholder="Pattern"/>
        <input value={flags} onChange={e=>setFlags(e.target.value)} className="w-20 font-mono border-2 rounded p-2" placeholder="flags"/>
        <button onClick={test} className="bg-blue-600 text-white px-4 rounded">Test</button>
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-40 border-2 rounded p-3 mb-3" placeholder="Test text"/>
      <div className="border rounded p-3 bg-gray-50">
        <div className="text-sm font-semibold mb-2">Matches ({matches.length})</div>
        {matches.map((m,i)=><div key={i} className="font-mono text-sm bg-yellow-100 inline-block mr-2 mb-1 px-2 py-1 rounded">{m}</div>)}
      </div>
    </main>
  )
}
