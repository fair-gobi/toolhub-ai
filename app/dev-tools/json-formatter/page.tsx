'use client'
import { useState } from 'react'

export default function JSONFormatter(){
  const [input,setInput]=useState('{"name":"test"}')
  const [out,setOut]=useState('')
  const [err,setErr]=useState('')

  const format = () => {
    try {
      const obj = JSON.parse(input)
      setOut(JSON.stringify(obj, null, 2))
      setErr('')
    } catch (e:any) {
      setErr(e.message)
      setOut('')
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">JSON Formatter</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-96 font-mono text-sm border-2 rounded-lg p-3"/>
        <textarea value={err || out} readOnly className={`w-full h-96 font-mono text-sm border-2 rounded-lg p-3 ${err ? 'bg-red-50 text-red-700' : 'bg-gray-50'}`}/>
      </div>
      <button onClick={format} className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg">Format</button>
    </main>
  )
}
