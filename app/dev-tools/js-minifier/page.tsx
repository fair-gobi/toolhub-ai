'use client'
import { useState } from 'react'

export default function JSMinifier(){
  const [input,setInput]=useState('function hello() {\n  console.log("Hello World");\n}')
  const [out,setOut]=useState('')
  
  const minify=()=>{
    const minified = input
      .replace(/\/\/.*$/gm, '') // remove // comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove /* */
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,:=+\-*/<>])\s*/g, '$1')
      .trim()
    setOut(minified)
  }
  
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">⚡ JS Minifier</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">JavaScript</label>
            <span className="text-xs text-gray-500">{input.length} chars</span>
          </div>
          <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3"/>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">Minified</label>
            <span className="text-xs text-green-600">{out.length} chars</span>
          </div>
          <textarea value={out} readOnly className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50"/>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={minify} className="bg-yellow-600 text-white px-6 py-2 rounded-lg">Minify JS</button>
        <button onClick={()=>navigator.clipboard.writeText(out)} className="border px-4 py-2 rounded-lg">Copy</button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Note: Basic minification (removes comments & whitespace). For production, use Terser.</p>
    </main>
  )
}
