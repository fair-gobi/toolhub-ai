'use client'
import { useState } from 'react'

export default function CodeOptimizer(){
  const [input,setInput]=useState('const x = 1 ;\nconst y = 2 ;\nconsole.log( x + y ) ;')
  const [output,setOutput]=useState('')

  const optimize=()=>{
    let optimized = input
     .replace(/\/\/.*$/gm, '') // remove comments
     .replace(/\/\*[\s\S]*?\*\//g, '')
     .replace(/\s+/g, ' ') // collapse spaces
     .replace(/\s*([=+\-*/;{},()])\s*/g, '$1')
     .replace(/;}/g, '}')
     .trim()

    const saved = Math.round((1 - optimized.length/input.length)*100)
    setOutput(optimized + `\n\n// Saved ${saved}% (${input.length} → ${optimized.length} chars)`)
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Code Optimizer</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium mb-1">Original</div>
          <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3"/>
        </div>
        <div>
          <div className="text-sm font-medium mb-1">Optimized</div>
          <textarea value={output} readOnly className="w-full h-80 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50"/>
        </div>
      </div>
      <button onClick={optimize} className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg">Optimize</button>
    </main>
  )
}
