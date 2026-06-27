'use client'
import { useState } from 'react'

export default function HTMLFormatter(){
  const [input,setInput]=useState('<div><p>Hello</p></div>')
  const [out,setOut]=useState('')
  
  const format=()=>{
    try {
      let xml = input.replace(/>\s*</g, '>\n<')
      let pad = 0
      const formatted = xml.split('\n').map(line=>{
        const trimmed = line.trim()
        if(trimmed.startsWith('</')) pad = Math.max(0, pad-1)
        const result = '  '.repeat(pad) + trimmed
        if(trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.includes('</')) {
          pad++
        }
        return result
      }).join('\n')
      setOut(formatted)
    } catch { setOut('Error formatting') }
  }
  
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">HTML Formatter</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3"/>
        <textarea value={out} readOnly className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50"/>
      </div>
      <button onClick={format} className="mt-3 bg-orange-600 text-white px-6 py-2 rounded-lg">Format</button>
    </main>
  )
}
