'use client'
import { useState } from 'react'

export default function SQLFormatter(){
  const [input,setInput]=useState('SELECT id,name FROM users WHERE active=1 ORDER BY name')
  const [out,setOut]=useState('')
  
  const format=()=>{
    const keywords = ['SELECT','FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','ON','AND','OR','ORDER BY','GROUP BY','HAVING','LIMIT','INSERT INTO','VALUES','UPDATE','SET','DELETE FROM']
    let formatted = input
    keywords.forEach(kw=>{
      const regex = new RegExp(`\\b${kw.replace(' ', '\\s+')}\\b`, 'gi')
      formatted = formatted.replace(regex, `\n${kw}`)
    })
    formatted = formatted
      .replace(/,/g, ',\n  ')
      .replace(/\n+/g, '\n')
      .trim()
    setOut(formatted)
  }
  
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🗄️ SQL Formatter</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">SQL Query</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-72 font-mono text-sm border-2 rounded-lg p-3 mt-1" placeholder="SELECT * FROM..."/>
        </div>
        <div>
          <label className="text-sm font-medium">Formatted</label>
          <textarea value={out} readOnly className="w-full h-72 font-mono text-sm border-2 rounded-lg p-3 mt-1 bg-gray-50"/>
        </div>
      </div>
      <button onClick={format} className="mt-3 bg-blue-700 text-white px-6 py-2 rounded-lg">Format SQL</button>
    </main>
  )
}
