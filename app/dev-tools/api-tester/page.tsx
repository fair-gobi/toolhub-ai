'use client'
import { useState } from 'react'

export default function APITester(){
  const [url,setUrl]=useState('https://jsonplaceholder.typicode.com/posts/1')
  const [method,setMethod]=useState('GET')
  const [response,setResponse]=useState('')
  const [loading,setLoading]=useState(false)

  const test=async()=>{
    setLoading(true)
    try {
      const res = await fetch(url, {method})
      const text = await res.text()
      setResponse(`Status: ${res.status}\n\n${text.substring(0,2000)}`)
    } catch (e:any) {
      setResponse('Error: '+e.message)
    }
    setLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">API Tester</h1>
      <div className="flex gap-2 mb-3">
        <select value={method} onChange={e=>setMethod(e.target.value)} className="border rounded p-2">
          <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
        </select>
        <input value={url} onChange={e=>setUrl(e.target.value)} className="flex-1 border rounded p-2 font-mono text-sm" placeholder="https://api.example.com"/>
        <button onClick={test} disabled={loading} className="bg-green-600 text-white px-6 rounded">{loading?'...':'Send'}</button>
      </div>
      <textarea value={response} readOnly className="w-full h-96 border-2 rounded p-3 font-mono text-xs bg-gray-50" placeholder="Response appears here"/>
    </main>
  )
}
