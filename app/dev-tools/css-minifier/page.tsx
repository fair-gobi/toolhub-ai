'use client'
import { useState } from 'react'

export default function CSSMinifier(){
  const [input,setInput]=useState('body {\n  color: red;\n  margin: 0;\n}')
  const [out,setOut]=useState('')
  
  const minify=()=>{
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*,\s*/g, ',')
      .trim()
    setOut(minified)
  }
  
  const saved = input.length - out.length
  
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🎨 CSS Minifier</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Original ({input.length} bytes)</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3 mt-1"/>
        </div>
        <div>
          <label className="text-sm font-medium">Minified ({out.length} bytes {saved>0 && `- saved ${Math.round(saved/input.length*100)}%`})</label>
          <textarea value={out} readOnly className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3 mt-1 bg-gray-50"/>
        </div>
      </div>
      <button onClick={minify} className="mt-3 bg-pink-600 text-white px-6 py-2 rounded-lg">Minify CSS</button>
    </main>
  )
}
