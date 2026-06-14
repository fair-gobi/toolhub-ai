'use client'
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import Link from 'next/link'

export default function Extract() {
  const [file, setFile] = useState<File|null>(null)
  const [pages, setPages] = useState('1-3')

  const extract = async () => {
    if (!file) return
    const pdf = await PDFDocument.load(await file.arrayBuffer())
    const newPdf = await PDFDocument.create()
    const nums = pages.split(',').flatMap(p => p.includes('-')? Array.from({length:+p.split('-')[1]-+p.split('-')[0]+1},(_,i)=>+p.split('-')[0]+i-1) : [+p-1])
    const copied = await newPdf.copyPages(pdf, nums)
    copied.forEach(p=>newPdf.addPage(p))
    const blob = new Blob([await newPdf.save()], {type:'application/pdf'})
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='extracted.pdf'; a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">Extract PDF Pages</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4 space-y-3">
          <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0]||null)} />
          <input value={pages} onChange={e=>setPages(e.target.value)} placeholder="1-3,5,7-9" className="w-full border p-3 rounded" />
          <button onClick={extract} className="w-full bg-green-600 text-white py-3 rounded">Extract</button>
        </div>
      </div>
    </div>
  )
}
