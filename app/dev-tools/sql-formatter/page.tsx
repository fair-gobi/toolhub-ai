'use client'
import { useState } from 'react'

export default function SQLFormatter(){
  const [input,setInput]=useState('SELECT id,name FROM users WHERE active=1 ORDER BY name')
  const [out,setOut]=useState('')
  
  const format=()=>{
    let formatted = input
    const keywords = ['SELECT','FROM','WHERE','AND','OR','ORDER BY','GROUP BY','JOIN','LEFT JOIN','INSERT INTO','VALUES','UPDATE','SET']
    keywords.forEach(kw=>{
      const re = new RegExp('\\b'+kw+'\\b','gi')
      formatted = formatted.replace(re, '\n'+kw)
    })
    setOut(formatted.trim())
  }
  
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">SQL Formatter</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-72 font-mono text-sm border-2 rounded-lg p-3"/>
        <textarea value={out} readOnly className="w-full h-72 font-mono text-sm border-2 rounded-lg p-3 bg-gray-50"/>
      </div>
      <button onClick={format} className="mt-3 bg-blue-700 text-white px-6 py-2 rounded-lg">Format</button>
    </main>
  )
}
