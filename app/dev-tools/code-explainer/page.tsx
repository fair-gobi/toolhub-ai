'use client'
import { useState } from 'react'

export default function CodeExplainer(){
  const [code,setCode]=useState('function add(a,b){ return a+b }')
  const [explanation,setExplanation]=useState('')

  const explain=()=>{
    const lines = code.split('\n')
    let exp = ''

    if (code.includes('function')) exp += '• Defines a function\n'
    if (code.includes('=>')) exp += '• Uses arrow function syntax\n'
    if (code.includes('return')) exp += '• Returns a value\n'
    if (code.includes('const')||code.includes('let')) exp += '• Declares variables\n'
    if (code.includes('for')||code.includes('while')) exp += '• Contains a loop\n'
    if (code.includes('if')) exp += '• Has conditional logic\n'
    if (code.includes('async')) exp += '• Asynchronous function\n'
    if (code.includes('.map')||code.includes('.filter')) exp += '• Uses array methods\n'

    exp += `\n• ${lines.length} lines of code\n• ~${code.length} characters`

    setExplanation(exp || 'Paste JavaScript/TypeScript code to analyze')
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Code Explainer</h1>
      <textarea value={code} onChange={e=>setCode(e.target.value)} className="w-full h-48 font-mono text-sm border-2 rounded-lg p-3 mb-3" placeholder="Paste code here..."/>
      <button onClick={explain} className="bg-indigo-600 text-white px-6 py-2 rounded-lg mb-4">Explain Code</button>
      <div className="border-2 rounded-lg p-4 bg-gray-50 whitespace-pre-line font-mono text-sm">{explanation}</div>
    </main>
  )
}
