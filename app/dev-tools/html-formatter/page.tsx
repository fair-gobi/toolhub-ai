'use client'
import { useState } from 'react'

export default function HTMLFormatter(){
  const [input,setInput]=useState('<div><p>Hello</p></div>')
  const [out,setOut]=useState('')
  
  const format=()=>{
    let formatted = input.replace(/>\s*</g, '>\n<')
    let pad = 0
    formatted = formatted.split('\n').map(line=>{
      if(line.match(/^<\//)) pad = Math.max(0,pad-1)
      const indent = '  '.repeat(pad)
      if(line.match(/^<[^!\/][^>]*[^\/]>$/) && !line.includes('</')) pad++
      return indent + line.trim()
    }).join('\n')
    setOut(formatted)
  }
  
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{} HTML Formatter</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3" placeholder="Paste minified HTML"/>
        <textarea value={out} readOnly className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50" placeholder="Formatted output"/>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={format} className="bg-orange-600 text-white px-6 py-2 rounded-lg">Format</button>
        <button onClick={()=>navigator.clipboard.writeText(out)} className="border px-4 py-2 rounded-lg">Copy</button>
      </div>
    </main>
  )
}
