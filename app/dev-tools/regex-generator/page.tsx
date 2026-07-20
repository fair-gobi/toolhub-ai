'use client'
import { useState } from 'react'

export default function RegexGenerator(){
  const [type,setType]=useState('email')
  const [custom,setCustom]=useState('')
  const [regex,setRegex]=useState('')

  const patterns:any = {
    email: {pattern:'^[\\w.-]+@[\\w.-]+\\.\\w{2,}$', desc:'Email address'},
    phone: {pattern:'^\\+?[1-9]\\d{1,14}$', desc:'Phone number'},
    url: {pattern:'^https?:\\/\\/.+', desc:'URL'},
    ip: {pattern:'^(\\d{1,3}\\.){3}\\d{1,3}$', desc:'IPv4 address'},
    date: {pattern:'^\\d{4}-\\d{2}-\\d{2}$', desc:'YYYY-MM-DD'},
    hex: {pattern:'^#[0-9A-Fa-f]{6}$', desc:'Hex color'},
    number: {pattern:'^\\d+$', desc:'Numbers only'},
    alphanumeric: {pattern:'^[a-zA-Z0-9]+$', desc:'Letters and numbers'},
  }

  const generate=()=>{
    if (type==='custom') {
      setRegex(custom)
    } else {
      setRegex(patterns[type].pattern)
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Regex Generator</h1>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.keys(patterns).map(k=>(
          <button key={k} onClick={()=>{setType(k); setRegex(patterns[k].pattern)}} className={`p-3 border rounded text-left hover:bg-gray-50 ${type===k?'border-blue-500 bg-blue-50':''}`}>
            <div className="font-medium capitalize">{k}</div>
            <div className="text-xs text-gray-600">{patterns[k].desc}</div>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="text-sm">Or custom pattern:</label>
        <div className="flex gap-2">
          <input value={custom} onChange={e=>setCustom(e.target.value)} className="flex-1 border rounded p-2 font-mono" placeholder="Enter regex"/>
          <button onClick={()=>{setType('custom'); generate()}} className="bg-gray-800 text-white px-4 rounded">Use</button>
        </div>
      </div>

      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
        <div className="text-xs text-gray-500 mb-1">Regex:</div>
        <div className="text-lg">/{regex}/</div>
        <button onClick={()=>navigator.clipboard.writeText(regex)} className="mt-2 text-xs bg-gray-700 px-2 py-1 rounded">Copy</button>
      </div>
    </main>
  )
}
