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
  console.log('Full env:', process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN? 'EXISTS' : 'MISSING')

  setImg(URL.createObjectURL(file))
  setOut(null)
  setLoading(true)


  try {
    console.log('Sending to HF...')
    const res = await fetch('https://router.huggingface.co/hf-inference/models/briaai/RMBG-1.4'
, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN || ''}`,
        'Content-Type': file.type
      },
      body: file
    })

    console.log('Status:', res.status)
    if(!res.ok) {
      const text = await res.text()
      console.log('Error:', text)
      throw new Error(`API ${res.status}`)
    }

    const blob = await res.blob()
    console.log('Blob size:', blob.size)
    setOut(URL.createObjectURL(blob))
  } catch (err) {
    console.error(err)
    alert('Failed. Check console (F12) or try again in 10s')
  }
  setLoading(false)

  // Reset file input so same file can be re-uploaded
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

