'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BgRemover(){
  const [img,setImg]=useState<string|null>(null)
  const [out,setOut]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)
async function removeBg(e:any){
  const file = e.target.files?.[0]
  if(!file) return

  console.log('TOKEN CHECK:', process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN?.slice(0,5))
  setImg(URL.createObjectURL(file))
  setOut(null)
  setLoading(true)

  try {
    const res = await fetch('/api/removebg', {
      method: 'POST',
      body: file
    })

    console.log('API Status:', res.status)
    if(!res.ok) throw new Error('API failed')

    const blob = await res.blob()
    setOut(URL.createObjectURL(blob))
  } catch (err) {
    console.error(err)
    alert('Failed - check console')
  }
  setLoading(false)
  e.target.value = ''
}

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">AI Background Remover</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input type="file" accept="image/*" onChange={removeBg} className="mb-4" />
{loading && (
  <div className="text-center py-4">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <p className="text-blue-600 mt-2">Processing... (check console for status)</p>
  </div>
)}

          {loading && <p className="text-blue-600">Removing... (3-5 sec with key)</p>}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {img && <div><p className="text-sm mb-2">Original</p><img src={img} className="rounded border" /></div>}
            {out && <div><p className="text-sm mb-2">Removed</p><img src={out} className="rounded border" /><a href={out} download="no-bg.png" className="block mt-2 text-center bg-green-600 text-white py-2 rounded">Download</a></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

