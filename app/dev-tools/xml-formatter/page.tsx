'use client'
import { useState } from 'react'

export default function XMLFormatter(){
  const [input,setInput]=useState('<root><item>test</item></root>')
  const [out,setOut]=useState('')

  const format=()=>{
    try {
      // Client-side only check
      if (typeof window === 'undefined') return
      
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(input, 'text/xml')
      const error = xmlDoc.querySelector('parsererror')
      
      if (error) {
        setOut('Error: Invalid XML')
        return
      }

      // Manual formatting (no DOMParser needed for output)
      let formatted = input.replace(/>\s*</g, '>\n<')
      let pad = 0
      formatted = formatted.split('\n').map(node=>{
        const trimmed = node.trim()
        let indent = 0
        if (trimmed.match(/^<\/\w/)) pad = Math.max(0, pad-1)
        const result = '  '.repeat(pad) + trimmed
        if (trimmed.match(/^<\w[^>]*[^\/]>$/) && !trimmed.includes('</')) indent = 1
        pad += indent
        return result
      }).join('\n')
      
      setOut(formatted)
    } catch (e) {
      setOut('Invalid XML')
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">XML Formatter</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea 
          value={input} 
          onChange={e=>setInput(e.target.value)} 
          className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3"
          placeholder="<root><item>value</item></root>"
        />
        <textarea 
          value={out} 
          readOnly 
          className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50"
          placeholder="Formatted XML appears here"
        />
      </div>
      <button onClick={format} className="mt-3 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
        Format XML
      </button>
    </main>
  )
}
