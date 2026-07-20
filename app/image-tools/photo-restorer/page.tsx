'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Restorer(){
  const [img,setImg]=useState<string|null>(null)
  const [out,setOut]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)

  async function restore(e:any){
    const file = e.target.files[0]
    if(!file) return
    setImg(URL.createObjectURL(file))
    setLoading(true)
    try {
      const res = await fetch('/api/restore', { method: 'POST', body: file })
      const blob = await res.blob()
      setOut(URL.createObjectURL(blob))
    } catch { alert('Try again') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">Photo Restorer</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input type="file" accept="image/*" onChange={restore} />
          {loading && <p>Restoring...</p>}
          {img && <img src={img} className="mt-4 max-w-xs" />}
          {out && <><img src={out} className="mt-4" /><a href={out} download="restored.png" className="block mt-2 bg-blue-600 text-white py-2 text-center rounded">Download</a></>}
        </div>
      </div>
    </div>
  )
}
