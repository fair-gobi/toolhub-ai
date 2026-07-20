'use client'
import { useState } from 'react'

export default function HeaderChecker(){
  const [url,setUrl]=useState('https://example.com')
  const [headers,setHeaders]=useState<any>(null)

  const check=async()=>{
    try {
      const res = await fetch(url, {method:'HEAD'})
      const h:any = {}
      res.headers.forEach((v,k)=>h[k]=v)
      setHeaders({status:res.status, headers:h})
    } catch (e:any) {
      setHeaders({error:e.message})
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">HTTP Header Checker</h1>
      <div className="flex gap-2 mb-4">
        <input value={url} onChange={e=>setUrl(e.target.value)} className="flex-1 border rounded p-2" placeholder="https://..."/>
        <button onClick={check} className="bg-purple-600 text-white px-6 rounded">Check</button>
      </div>
      {headers && (
        <div className="border rounded p-4 bg-gray-50 font-mono text-sm">
          <pre>{JSON.stringify(headers, null, 2)}</pre>
        </div>
      )}
    </main>
  )
}
