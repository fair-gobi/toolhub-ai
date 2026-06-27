'use client'
import { useState } from 'react'

export default function UUIDGenerator(){
  const [uuids,setUuids]=useState<string[]>([])

  const generate=()=>{
    const newUuids = Array(5).fill(0).map(()=>crypto.randomUUID())
    setUuids(newUuids)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">UUID Generator</h1>
      <button onClick={generate} className="bg-teal-600 text-white px-6 py-2 rounded-lg mb-4">Generate 5 UUIDs</button>

      <div className="space-y-2">
        {uuids.map((uuid,i)=>(
          <div key={i} className="flex items-center gap-2 border rounded-lg p-3">
            <code className="flex-1 font-mono text-sm">{uuid}</code>
            <button onClick={()=>navigator.clipboard.writeText(uuid)} className="text-xs bg-gray-100 px-2 py-1 rounded">Copy</button>
          </div>
        ))}
      </div>

      {uuids.length===0 && (
        <p className="text-gray-500">Click generate to create UUID v4</p>
      )}
    </main>
  )
}
