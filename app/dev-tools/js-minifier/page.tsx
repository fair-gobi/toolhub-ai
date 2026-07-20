'use client'
import { useState } from 'react'

export default function JSMinifier(){
  const [input,setInput]=useState('function hello() {\n  console.log("Hello");\n}')
  const [out,setOut]=useState('')
  
  const minify=()=>{
    const minified = input
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,:=])\s*/g, '$1')
      .trim()
    setOut(minified)
  }
  
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">JS Minifier</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3"/>
        <textarea value={out} readOnly className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50"/>
      </div>
      <button onClick={minify} className="mt-3 bg-yellow-600 text-white px-6 py-2 rounded-lg">Minify</button>
    </main>
  )
}
