'use client'
import { useState } from 'react'

export default function JWTDecoder(){
  const [token,setToken]=useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  const [decoded,setDecoded]=useState<any>(null)

  const decode=()=>{
    try {
      const parts = token.split('.')
      if (parts.length!== 3) throw new Error('Invalid JWT')

      const header = JSON.parse(atob(parts[0].replace(/-/g,'+').replace(/_/g,'/')))
      const payload = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')))

      setDecoded({header, payload, signature: parts[2]})
    } catch (e:any) {
      setDecoded({error: e.message})
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">JWT Decoder</h1>
      <textarea value={token} onChange={e=>setToken(e.target.value)} className="w-full h-24 font-mono text-xs border-2 rounded-lg p-3 mb-3"/>
      <button onClick={decode} className="bg-indigo-600 text-white px-6 py-2 rounded-lg mb-4">Decode</button>

      {decoded &&!decoded.error && (
        <div className="space-y-3">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-red-600">Header</h3>
            <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(decoded.header, null, 2)}</pre>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-green-600">Payload</h3>
            <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(decoded.payload, null, 2)}</pre>
          </div>
        </div>
      )}
      {decoded?.error && <div className="text-red-600">{decoded.error}</div>}
    </main>
  )
}
